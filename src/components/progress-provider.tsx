"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { levels, totalXp } from "@/content";

export type ProgressState = {
  /** مرحله‌هایی که کوییزشان پاس شده */
  passedLevels: number[];
  /** مرحله‌هایی که پروژه‌شان هم تمام شده */
  builtLevels: number[];
  xp: number;
  /** کد ذخیره‌شده‌ی پلی‌گراند: کلید = `${levelId}:${fileName}` */
  code: Record<string, string>;
  nickname: string | null;
};

const STORAGE_KEY = "vuekade-progress-v1";
const CLIENT_KEY = "vuekade-client-id";

const EMPTY: ProgressState = {
  passedLevels: [],
  builtLevels: [],
  xp: 0,
  code: {},
  nickname: null,
};

type Ctx = {
  ready: boolean;
  state: ProgressState;
  totalXp: number;
  percent: number;
  isUnlocked: (levelId: number) => boolean;
  isPassed: (levelId: number) => boolean;
  isBuilt: (levelId: number) => boolean;
  passLevel: (levelId: number, xp: number) => void;
  markBuilt: (levelId: number) => void;
  saveCode: (levelId: number, file: string, code: string) => void;
  getCode: (levelId: number, file: string) => string | undefined;
  clearCode: (levelId: number) => void;
  setNickname: (name: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

function readLocal(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      passedLevels: parsed.passedLevels ?? [],
      builtLevels: parsed.builtLevels ?? [],
      xp: parsed.xp ?? 0,
      code: parsed.code ?? {},
      nickname: parsed.nickname ?? null,
    };
  } catch {
    return EMPTY;
  }
}

function getClientId(): string {
  if (typeof window === "undefined") return "server";
  let id = window.localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = "vk_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [ready, setReady] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(readLocal());
    setReady(true);
  }, []);

  // ذخیره در localStorage + همگام‌سازی نرم با سرور (آماده برای لاگین در آینده)
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* حافظه پر است، بی‌خیال */
    }

    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      const clientId = getClientId();
      void fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          xp: state.xp,
          nickname: state.nickname,
          state: {
            passedLevels: state.passedLevels,
            builtLevels: state.builtLevels,
          },
        }),
      }).catch(() => undefined);
    }, 1200);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [state, ready]);

  const isPassed = useCallback(
    (levelId: number) => state.passedLevels.includes(levelId),
    [state.passedLevels],
  );

  const isBuilt = useCallback(
    (levelId: number) => state.builtLevels.includes(levelId),
    [state.builtLevels],
  );

  const isUnlocked = useCallback(
    (levelId: number) => levelId === 1 || state.passedLevels.includes(levelId - 1),
    [state.passedLevels],
  );

  const passLevel = useCallback((levelId: number, xp: number) => {
    setState((prev) => {
      if (prev.passedLevels.includes(levelId)) return prev;
      return {
        ...prev,
        passedLevels: [...prev.passedLevels, levelId].sort((a, b) => a - b),
        xp: prev.xp + xp,
      };
    });
  }, []);

  const markBuilt = useCallback((levelId: number) => {
    setState((prev) =>
      prev.builtLevels.includes(levelId)
        ? prev
        : { ...prev, builtLevels: [...prev.builtLevels, levelId] },
    );
  }, []);

  const saveCode = useCallback((levelId: number, file: string, code: string) => {
    setState((prev) => ({
      ...prev,
      code: { ...prev.code, [`${levelId}:${file}`]: code },
    }));
  }, []);

  const getCode = useCallback(
    (levelId: number, file: string) => state.code[`${levelId}:${file}`],
    [state.code],
  );

  const clearCode = useCallback((levelId: number) => {
    setState((prev) => {
      const code = { ...prev.code };
      Object.keys(code).forEach((key) => {
        if (key.startsWith(`${levelId}:`)) delete code[key];
      });
      return { ...prev, code };
    });
  }, []);

  const setNickname = useCallback((name: string) => {
    setState((prev) => ({ ...prev, nickname: name }));
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo<Ctx>(
    () => ({
      ready,
      state,
      totalXp,
      percent: Math.round((state.passedLevels.length / levels.length) * 100),
      isUnlocked,
      isPassed,
      isBuilt,
      passLevel,
      markBuilt,
      saveCode,
      getCode,
      clearCode,
      setNickname,
      reset,
    }),
    [
      ready,
      state,
      isUnlocked,
      isPassed,
      isBuilt,
      passLevel,
      markBuilt,
      saveCode,
      getCode,
      clearCode,
      setNickname,
      reset,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}

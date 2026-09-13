import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * دیتابیس لوکالِ پروژه — یه فایل JSON داخل خود دایرکتوری برنامه.
 * هیچ Postgres یا سرویس خارجی در کار نیست؛ همه‌چیز همین‌جا ذخیره می‌شه.
 *
 * ساختار فایل:
 * {
 *   "learners": {
 *     "<clientId>": { nickname, xp, state, updatedAt }
 *   }
 * }
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

export type LearnerRecord = {
  clientId: string;
  nickname: string | null;
  xp: number;
  /** { passedLevels, builtLevels, code, ... } */
  state: Record<string, unknown>;
  updatedAt: string;
};

type DbShape = { learners: Record<string, LearnerRecord> };

const EMPTY_DB: DbShape = { learners: {} };

async function readDb(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<DbShape>;
    return { learners: parsed.learners ?? {} };
  } catch {
    return EMPTY_DB;
  }
}

async function writeDb(db: DbShape): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_FILE);
}

export async function getLearner(clientId: string): Promise<LearnerRecord | null> {
  const db = await readDb();
  return db.learners[clientId] ?? null;
}

// صف نوشتن: جلوی race condition بین درخواست‌های هم‌زمان رو می‌گیره
let writeQueue: Promise<void> = Promise.resolve();

export async function upsertLearner(record: LearnerRecord): Promise<LearnerRecord> {
  const task = writeQueue.then(async () => {
    const db = await readDb();
    db.learners[record.clientId] = record;
    await writeDb(db);
  });
  writeQueue = task.catch(() => undefined);
  await task;
  return record;
}

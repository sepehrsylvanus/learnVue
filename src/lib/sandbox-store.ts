/**
 * استور ساده‌ی module-level برای کدِ زنده‌ی sandbox ها.
 * Playground هر بار که کد تغییر می‌کند اینجا ثبتش می‌کند تا
 * دستیار AI بتواند کد فعلی کاربر را ببیند.
 */

export type SandboxSnapshot = {
  /** کلید = `${levelId}:${scope}` */
  [key: string]: Record<string, string>;
};

const store: SandboxSnapshot = {};

export function setSandboxFiles(levelId: number, scope: string, files: Record<string, string>) {
  store[`${levelId}:${scope}`] = files;
}

export function removeSandbox(levelId: number, scope: string) {
  delete store[`${levelId}:${scope}`];
}

export function getSandboxSnapshot(): SandboxSnapshot {
  return { ...store };
}

/** متن ساده از کل snapshot برای فرستادن به مدل */
export function sandboxToText(snapshot: SandboxSnapshot): string {
  const parts: string[] = [];
  for (const [key, files] of Object.entries(snapshot)) {
    for (const [name, code] of Object.entries(files)) {
      parts.push(`### sandbox «${key}» — فایل ${name}:\n\`\`\`\n${code}\n\`\`\``);
    }
  }
  return parts.join("\n\n");
}

import { getLearner } from "@/lib/local-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // دیتابیس لوکال رو صدا بزن تا مطمئن شیم قابل خوندنه
    await getLearner("__healthcheck__");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

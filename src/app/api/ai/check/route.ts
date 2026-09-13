import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckBody = {
  levelId?: number;
  stepIndex?: number;
  step: string;
  steps?: string[];
  code?: string;
  lessonContext?: string;
};

function buildPrompt(b: CheckBody): string {
  const total = b.steps?.length ?? 0;
  return [
    "تو داورِ قدم‌به‌قدمِ یک پروژه‌ی آموزشی Vue 3 در پلتفرم «ویوکده» هستی.",
    "کاربر تازه یک قدم از پروژه را نوشته و باید تشخیص بدهی آیا آن قدم درست انجام شده یا نه.",
    "",
    `قدم شماره ${b.stepIndex} از ${total}:`,
    `«${b.step}»`,
    b.steps ? `\nهمه‌ی قدم‌های پروژه (برای context):\n${b.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}` : "",
    "",
    b.lessonContext ? `محتوای درس (برای ارجاع):\n${b.lessonContext}` : "",
    "",
    "## کد فعلی کاربر:",
    "```",
    b.code ?? "(کدی پیدا نشد)",
    "```",
    "",
    "قوانین داوری:",
    "- سختگیر نباش؛ تا وقتی هسته‌ی قدم (چیزی که قدم خواسته) انجام شده، قبولش کن. مثلاً اسم متغیر یا متن فارسی فرقی ندارد.",
    "- اگر قدم قبلی‌ها هم لازم بوده و درست مانده‌اند، اشکالی ندارد؛ فقط همین قدم مهم است.",
    "- اگر رد شدی، دقیق بگو چی کم است یا اشتباه است و یک راهنمای کوتاه بده (بدون نوشتن کل جواب).",
    "",
    "فقط و فقط یک JSON خالص برگردان، بدون هیچ متن اضافه و بدون بلاک کد، با این شکل:",
    '{"passed": true|false, "feedback": "پیام فارسی کوتاه و خودمونی (حدود ۱ تا ۳ جمله)"}',
  ]
    .filter(Boolean)
    .join("\n");
}

function parseVerdict(text: string): { passed: boolean; feedback: string } {
  // مدل ممکن است JSON را داخل بلاک کد یا همراه متن برگرداند
  const cleaned = text.replace(/```(?:json)?/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]) as { passed?: boolean; feedback?: string };
      return {
        passed: Boolean(parsed.passed),
        feedback: parsed.feedback?.trim() || (parsed.passed ? "آفرین! قدم درست بود. 🎉" : "این قدم هنوز کامل نیست."),
      };
    } catch {
      /* fallthrough */
    }
  }
  return { passed: false, feedback: cleaned.slice(0, 400) || "نتوانستم کد را بررسی کنم؛ دوباره تلاش کن." };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckBody;
    if (!body.step) {
      return NextResponse.json({ error: "قدمی برای بررسی پیدا نشد." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = (process.env.OPENAI_BASE_URL ?? "https://api.z.ai/api/paas/v4").replace(/\/+$/, "");
    const model = process.env.OPENAI_MODEL ?? "glm-4.5-flash";

    if (!apiKey) {
      return NextResponse.json({ error: "کلید API تنظیم نشده است." }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 400,
        messages: [
          { role: "system", content: "تو یک داور دقیق و دوست‌داشتنی کد Vue هستی که فقط JSON خالص جواب می‌دهد." },
          { role: "user", content: buildPrompt(body) },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("AI check error:", response.status, detail);
      return NextResponse.json(
        { error: "داور الان در دسترس نیست 🥲 یه بار دیگه امتحان کن." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "جواب خالی برگشت؛ دوباره امتحان کن." }, { status: 502 });
    }

    return NextResponse.json(parseVerdict(reply));
  } catch (error) {
    console.error("AI check route error:", error);
    return NextResponse.json(
      { error: "یه چیزی خراب شد 🫠 دوباره تلاش کن." },
      { status: 500 },
    );
  }
}

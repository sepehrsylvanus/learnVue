import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

/** حداکثر پیام‌هایی که به مدل می‌فرستیم (اول مکالمه کوتاه می‌شود) */
const MAX_HISTORY = 12;

function buildSystemPrompt(context: string): string {
  return [
    "تو دستیار هوشمند دوره‌ی «ویوکده» هستی — یک پلتفرم فارسی و بامزه برای یادگیری Vue 3.",
    "لحن تو خیلی دوستانه، صمیمی و خودمونی‌ئه؛ مثل یه رفیق باحال که برنامه‌نویسی بلده. از ایموجی به مقدار کم و بجا استفاده کن 👋",
    "همیشه به زبان فارسی روان و خودمونی جواب بده (اصطلاحات تکنیکی رو می‌تونی انگلیسی نگه داری).",
    "جواب‌ها رو کوتاه و مفید بده؛ اگه سوالی ساده بود، با یه مثال کوتاه Vue توضیح بده.",
    "اگه سوال کاربر ربطی به درس فعلی داره، از «محتوای درس» که برات فرستاده شده کمک بگیر و همون مفاهیم رو پوشش بده.",
    "اگه سوالی کلی درباره‌ی Vue، جاوااسکریپت یا وب پرسید، خوشحال جواب بده.",
    "کدها رو داخل بلاک ``` قرار بده و همیشه از Vue 3 با Composition API استفاده کن.",
    "",
    context ? `محتوای درس فعلی کاربر:\n${context}` : "کاربر الان داخل هیچ مرحله‌ی خاصی نیست؛ سوال‌های کلی Vue رو جواب بده.",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: ChatMessage[];
      context?: string;
    };

    const history = Array.isArray(body.messages) ? body.messages.slice(-MAX_HISTORY) : [];
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ error: "پیامی برای ارسال پیدا نشد." }, { status: 400 });
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
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          { role: "system", content: buildSystemPrompt(body.context ?? "") },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("AI provider error:", response.status, detail);
      return NextResponse.json(
        { error: "دستیار الان یه‌کم خسته‌ئه 🥲 یه بار دیگه امتحان کن." },
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

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat route error:", error);
    return NextResponse.json(
      { error: "یه چیزی خراب شد 🫠 دوباره تلاش کن." },
      { status: 500 },
    );
  }
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ProgressProvider } from "@/components/progress-provider";
import SiteHeader from "@/components/site-header";
import AiAssistant from "@/components/ai-assistant";
import ReviewModal from "@/components/review-modal";

export const metadata: Metadata = {
  title: "ویوکده | آموزش تعاملی Vue.js به زبان فارسی",
  description:
    "یک دوره‌ی پروژه‌محور و بامزه برای یادگیری Vue 3 — با پلی‌گراند زنده، کوییز و سیستم مرحله‌ای.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('vuekade-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased dark:bg-[#070b14] dark:text-slate-100">
        <ProgressProvider>
          <SiteHeader />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <ReviewModal />
          <AiAssistant />
        </ProgressProvider>
      </body>
    </html>
  );
}

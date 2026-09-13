import type { Metadata } from "next";
import Certificate from "@/components/certificate";

export const metadata: Metadata = {
  title: "پایان دوره | ویوکده",
  description: "گواهی پایان دوره‌ی تعاملی Vue.js",
};

export default function FinishPage() {
  return <Certificate />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLevel, levels } from "@/content";
import LevelView from "@/components/level-view";

export function generateStaticParams() {
  return levels.map((level) => ({ slug: level.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const level = getLevel(slug);
  return {
    title: level ? `مرحله ${level.id}: ${level.title} | ویوکده` : "ویوکده",
    description: level?.tagline,
  };
}

export default async function LevelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const level = getLevel(slug);
  if (!level) notFound();

  return <LevelView level={level} />;
}

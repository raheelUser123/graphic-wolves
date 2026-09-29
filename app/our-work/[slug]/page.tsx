import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import CaseStudyDetail from "@/components/case-studies/CaseStudyDetail/CaseStudyDetail";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/components/case-studies/data";
import FooterSection from "@/components/layout/Footer/FooterSection";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case Study Not Found" };

  return {
    title: study.title,
    description: study.caption,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();
  const nextStudy = getNextCaseStudy(slug);

  return (
    <main>
      <Header />
      <CaseStudyDetail study={study} nextStudy={nextStudy} />
      <FooterSection />
    </main>
  );
}

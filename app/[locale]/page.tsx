import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { Stats } from '@/components/stats';
import { About } from '@/components/about';
import { Principles } from '@/components/principles';
import { GitHubActivity } from '@/components/github-activity';
import { Charts } from '@/components/charts';
import { Experience } from '@/components/experience';
import { TechStack } from '@/components/tech-stack';
import { Products } from '@/components/products';
import { Education } from '@/components/education';
import { RateCard } from '@/components/rate-card';
import { Contact } from '@/components/contact';
import { Marquee } from '@/components/marquee';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <Principles />
      <GitHubActivity />
      <Charts />
      <Experience />
      <TechStack />
      <Products />
      <Education />
      <RateCard />
      <Contact />
    </>
  );
}

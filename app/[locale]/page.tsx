import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { Stats } from '@/components/stats';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { TechStack } from '@/components/tech-stack';
import { Products } from '@/components/products';
import { Education } from '@/components/education';
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
      <Experience />
      <TechStack />
      <Products />
      <Education />
      <Contact />
    </>
  );
}

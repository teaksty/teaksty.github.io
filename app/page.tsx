import { About } from '@/components/about';
import { Archive } from '@/components/archive';
import { Capabilities } from '@/components/capabilities';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { SelectedWork } from '@/components/selected-work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Capabilities />
      <Archive />
      <Contact />
    </>
  );
}

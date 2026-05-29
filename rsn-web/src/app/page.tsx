
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Equipment } from "@/components/sections/Equipment";

import { Portfolio } from "@/components/sections/Portfolio";
import { Coverage } from "@/components/sections/Coverage";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Equipment />
      <Portfolio />
      <Coverage />
      <Contact />
    </>
  );
}

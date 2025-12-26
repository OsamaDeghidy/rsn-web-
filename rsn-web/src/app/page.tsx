"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";

import { Portfolio } from "@/components/sections/Portfolio";
import { Coverage } from "@/components/sections/Coverage";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Coverage />
      <Contact />
    </>
  );
}

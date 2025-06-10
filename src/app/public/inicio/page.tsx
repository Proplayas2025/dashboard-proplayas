import React from "react";

import Hero from "@/components/Inicio-ui/Hero"
import About from "@/components/Inicio-ui/About"
import Structure from "@/components/Inicio-ui/Structure"
import Activities from "@/components/Inicio-ui/Activities"
export default function Page() {
  return (
    <>
    <Hero/>
    <About/>
    <Structure/>
    <Activities/>
    </>
  );
}
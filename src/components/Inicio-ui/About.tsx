"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section className="w-full py-12 md:py-20 bg-white dark:bg-zinc-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Columna izquierda: imagen fija */}
        <div className="flex-1 max-w-md flex flex-col items-center">
          <Image
            src="/home_img/about1.JPG"
            alt="Quiénes Somos"
            width={320}
            height={320}
            className="w-full h-80 md:h-96 object-cover rounded-lg shadow"
            priority
          />
        </div>
        {/* Columna derecha: texto y botones */}
        <div className="flex-1 max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 dark:text-white mb-4">
            ¿Quiénes Somos?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
            La mayor comunidad de profesionales, ciudadanos, empresarios,
            funcionarios y científicos que trabajan en y con las playas en
            América Latina y Europa del Sur. Desde 2007, nos hemos consolidado
            como la comunidad de playeros más grande y diversa del continente,
            promoviendo la gestión integrada de las zonas costeras.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Button asChild  className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Link href="/quienes-somos">Conócenos</Link>
            </Button>
            <Button
              asChild
              
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-md shadow transition"
            >
              <a
                href="/docs/proplayas-info.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                ABC Proplayas
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
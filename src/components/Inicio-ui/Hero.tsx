"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-20 bg-blue-100 dark:bg-zinc-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Texto a la izquierda */}
        <div className="flex-1 max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-800 dark:text-white mb-4">
            Red Proplayas
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-6">
            La mayor red de gestión y certificación de playas en Iberoamérica,
            uniendo esfuerzos para el desarrollo sostenible de nuestros espacios
            costeros.
          </p>
          <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>• La comunidad de playeros más grande.</li>
            <li>• Presencia internacional</li>
          </ul>
          <Button asChild variant="outline">
            <Link href="/public/quienes-somos">Conócenos</Link>
          </Button>
        </div>
        {/* Logo a la derecha */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src="/proplayas_logo.svg"
              alt="Logo Proplayas"
              width={260}
              height={260}
              className="w-52 h-52 md:w-72 md:h-72 object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

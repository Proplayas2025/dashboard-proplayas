"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Donation() {
  return (
    <section className="w-full py-12 md:py-20 bg-gray-100 dark:bg-zinc-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Columna izquierda: imagen */}
        <div className="flex-1 max-w-md flex flex-col items-center">
          <Image
            src="/home_img/about.webp"
            alt="Apoya a Proplayas"
            width={320}
            height={320}
            className="w-full h-80 md:h-96 object-cover rounded-lg shadow"
            priority
          />
        </div>
        {/* Columna derecha: texto y botón */}
        <div className="flex-1 max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 dark:text-white mb-4">
            Apoya la Red Proplayas
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
            Tu contribución voluntaria nos ayuda a mantener este sitio en
            funcionamiento y a organizar actividades que promuevan el bienestar
            costero.
          </p>
          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-md shadow transition"
          >
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=XXXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donar con PayPal
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

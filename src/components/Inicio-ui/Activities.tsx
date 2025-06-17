"use client";

import Link from "next/link";
import Image from "next/image";

const activities = [
  {
    title: "Proyectos Colaborativos De Bajo Costo",
    desc: "Participa y colabora en proyectos y obten recompensas.",
    href: "/public/actividades/proyectos",
    color: "bg-cyan-200 dark:bg-zinc-800",
    image: "/home_img/proyect.jpeg"
  },
  {
    title: "Eventos",
    desc: "Talleres impartidos por profesionales.",
    href: "/public/actividades/eventos",
    color: "bg-cyan-100 dark:bg-zinc-700",
    image: "/home_img/event.jpg"
  },
  {
    title: "Libros",
    desc: "Accede a libros de la comunidad.",
    href: "/public/actividades/libros",
    color: "bg-cyan-300 dark:bg-zinc-900",
    image: "/home_img/books.jpg"
  },
  {
    title: "Publicaciones",
    desc: "Información de investigadores",
    href: "/public/actividades/publicaciones",
    color: "bg-cyan-50 dark:bg-zinc-800",
    image: "/home_img/publication.jpg"
  },
  {
    title: "Series",
    desc: "Contenido digital de la comunidad.",
    href: "/public/content#series",
    color: "bg-cyan-400 dark:bg-zinc-700",
    image: "/home_img/series.jpg"
  },
];

export default function Activities() {
  return (
    <section className="w-full py-12 md:py-20 bg-white dark:bg-zinc-900">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 dark:text-white mb-10 text-center">
          Conocimientos y experiencias para fortalecer la gestión sostenible de
          las playas.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px]">
          {/* Primer elemento grande */}
          <Link
            href={activities[0].href}
            className="col-span-1 md:col-span-2 row-span-2 rounded-xl p-0 flex flex-col justify-center shadow transition hover:scale-[1.02] hover:shadow-lg cursor-pointer relative overflow-hidden"
          >
            <Image
              src={activities[0].image}
              alt={activities[0].title}
              fill
              className="object-cover w-full h-full absolute inset-0 z-0 filter blur-sm brightness-85"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            <div className="relative z-10 p-8">
              <span className="text-xl md:text-2xl font-bold mb-2 text-white  drop-shadow">
                {activities[0].title}
              </span>
              <span className="text-white md:text-xl block drop-shadow">
                {activities[0].desc}
              </span>
            </div>
          </Link>
          {/* Los otros 4 elementos */}
          {activities.slice(1).map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl p-0 flex flex-col justify-center shadow transition hover:scale-[1.03] hover:shadow-lg cursor-pointer relative overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover w-full h-full absolute inset-0 z-0 filter blur-sm brightness-85"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative z-10 p-8">
                <span className="text-lg md:text-2xl font-bold mb-2 text-white drop-shadow">
                  {item.title}
                </span>
                <span className="text-white md:text-xl block drop-shadow">
                  {item.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

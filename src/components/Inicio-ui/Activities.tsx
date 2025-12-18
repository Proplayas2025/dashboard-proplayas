"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, FileText, Lightbulb, Video } from "lucide-react";

const activities = [
  {
    title: "Proyectos Colaborativos De Bajo Costo",
    desc: "Participa y colabora en proyectos con impacto real en la conservación de playas.",
    href: "/actividades/proyectos",
    image: "/home_img/proyect.jpeg",
    icon: Lightbulb,
    gradient: "from-blue-600/90 to-cyan-600/90"
  },
  {
    title: "Eventos",
    desc: "Talleres, conferencias y seminarios impartidos por expertos en gestión costera.",
    href: "/actividades/eventos",
    image: "/home_img/event.jpg",
    icon: Calendar,
    gradient: "from-purple-600/90 to-pink-600/90"
  },
  {
    title: "Libros",
    desc: "Biblioteca digital con publicaciones especializadas de la comunidad.",
    href: "/actividades/libros",
    image: "/home_img/books.jpg",
    icon: BookOpen,
    gradient: "from-green-600/90 to-emerald-600/90"
  },
  {
    title: "Publicaciones",
    desc: "Investigaciones científicas y artículos de nuestros colaboradores.",
    href: "/actividades/publicaciones",
    image: "/home_img/about1.JPG",
    icon: FileText,
    gradient: "from-orange-600/90 to-red-600/90"
  },
  // {
  //   title: "Series",
  //   desc: "Contenido multimedia educativo y documental sobre gestión de playas.",
  //   href: "/content#series",
  //   image: "/home_img/series.jpg",
  //   icon: Video,
  //   gradient: "from-indigo-600/90 to-purple-600/90"
  // },
];

export default function Activities() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-800 dark:text-white mb-6">
            Nuestras Actividades
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Conocimientos y experiencias para fortalecer la gestión sostenible de las playas
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Link
                key={activity.title}
                href={activity.href}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-zinc-800"
                style={{ minHeight: index === 0 ? '400px' : '320px' }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white z-10">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">
                      {activity.desc}
                    </p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explorar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Border glow effect on hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            ¿Quieres participar en alguna de nuestras actividades?
          </p>
          <Link
            href="/nodos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Únete a un Nodo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

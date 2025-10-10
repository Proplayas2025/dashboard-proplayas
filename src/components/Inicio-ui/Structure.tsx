"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Flower, Workflow, Users } from "lucide-react";

export default function Structure() {
  return (
    <section className="w-full py-12 md:py-20 bg-gray-100 dark:bg-zinc-700">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-800 dark:text-white mb-4 text-center">
          Estructura Organizativa (Nodos)
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-2xl text-center">
          Nuestra red se construye sobre nodos dinámicos que integran diversos
          sectores: científico, empresarial, público y sociedad civil.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
          <Card className="bg-white dark:bg-zinc-800 border-white dark:border-zinc-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
            Sistema de nodos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
            Explicación del sistema de nodos dinámicos que integran diversos
            sectores.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-800 border-white dark:border-zinc-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
            <Flower className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
            Requisitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-200">
            Grupos mínimo de 3 personas para formar parte de un nodo.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-800 border-white dark:border-zinc-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
            Tipos de Nodos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 space-y-1">
            <li>Científicos</li>
            <li>Empresarial</li>
            <li>Función Pública</li>
            <li>Activista/Sociedad Civil</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Button
          asChild
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-md shadow transition"
        >
          <Link href="/public/nodos">Nodos</Link>
        </Button>
      </div>
    </section>
  );
}

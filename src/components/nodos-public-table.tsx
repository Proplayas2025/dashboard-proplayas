"use client";

import * as React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

// Schema basado en la interfaz Nodes
export const nodeSchema = z.object({
  id: z.number(),
  code: z.string(),
  type: z.string(),
  name: z.string(),
  country: z.string(),
  city: z.string(),
  joined_in: z.number(),
  members_count: z.number(),
  status: z.string(),
});

type Node = z.infer<typeof nodeSchema>;

type NodesTableProps = {
  data: Node[];
  onAdd?: () => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
};

export function NodesTable({
  data,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}: NodesTableProps) {
  // Paginación simple
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-2">
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto ">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Año de ingreso</TableHead>
                <TableHead>Miembros</TableHead>
                {/* <TableHead>Status</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <NodeCellViewer item={item} />
                    </TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.joined_in}</TableCell>
                    <TableCell>{item.members_count}</TableCell>
                    {/* <TableCell>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground px-1.5"
                      >
                        {item.status === "activo" ? (
                          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                        ) : (
                          <IconLoader />
                        )}
                        {item.status}
                      </Badge>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No hay nodos registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={page <= 1}
              onClick={() => onPageChange && onPageChange(page - 1)}
            >
              Anterior
            </Button>
            <span>
              Página {page} de {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => onPageChange && onPageChange(page + 1)}
            >
              Siguiente
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function NodeCellViewer({ item }: { item: Node }) {
  return (
    <Link
      href={`/public/nodo/${item.code}`}
      className="font-medium text-cyan-700 hover:underline dark:text-cyan-300"
    >
      {item.name}
    </Link>
  );
}
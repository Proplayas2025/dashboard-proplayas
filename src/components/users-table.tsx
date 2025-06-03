"use client";

import * as React from "react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconCircleCheckFilled, IconLoader, IconTrash, IconPower } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";

// Schema basado en la interfaz Users
export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  node_id: z.number(),
  node_code: z.string(),
  status: z.string(),
});

type User = z.infer<typeof userSchema>;

type UsersTableProps = {
  data: User[];
  onToggleStatus: (email: string) => void;
  onDelete: (email: string) => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
};

export function UsersTable({
  data,
  onToggleStatus,
  onDelete,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}: UsersTableProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center gap-2">
          {/* No agregar botón de agregar usuario */}
        </div>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Nodo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.email}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {item.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono">{item.node_code}</span>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant={item.status === "activo" ? "secondary" : "outline"}
                          title={
                            item.status === "activo"
                              ? "Desactivar usuario"
                              : "Activar usuario"
                          }
                          onClick={() => onToggleStatus(item.email)}
                        >
                          {item.status === "activo" ? (
                            <IconPower className="text-red-500" />
                          ) : (
                            <IconPower className="text-green-500" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          title="Eliminar usuario"
                          onClick={() => onDelete(item.email)}
                        >
                          <IconTrash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No hay usuarios registrados.
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
      </div>
    </div>
  );
}
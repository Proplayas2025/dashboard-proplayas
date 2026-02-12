"use client";

import * as React from "react";
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
import {
  IconCircleCheckFilled,
  IconX,
  IconClock,
} from "@tabler/icons-react";
import { formatDate } from "@/lib/date-utils";

export interface Invitation {
  id: number;
  name: string;
  email: string;
  role: string;
  node_type?: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

type InvitationsTableProps = {
  data: Invitation[];
  onCancel: (id: number) => void;
  loading?: boolean;
};

export function InvitationsTable({
  data,
  onCancel,
  loading = false,
}: InvitationsTableProps) {
  const getRoleBadge = (role: string) => {
    if (role === "node_leader") {
      return <Badge variant="default">Líder de Nodo</Badge>;
    }
    return <Badge variant="secondary">Miembro</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge variant="outline" className="text-yellow-600">
          <IconClock className="h-4 w-4 mr-1" />
          Pendiente
        </Badge>
      );
    }
    if (status === "accepted") {
      return (
        <Badge variant="outline" className="text-green-600">
          <IconCircleCheckFilled className="h-4 w-4 mr-1" />
          Aceptada
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-red-600">
        <IconX className="h-4 w-4 mr-1" />
        Expirada
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="text-gray-500">Cargando invitaciones...</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Tipo de Nodo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha de Envío</TableHead>
            <TableHead>Expira</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{getRoleBadge(item.role)}</TableCell>
                <TableCell>
                  {item.node_type ? (
                    <span className="capitalize">{item.node_type.replace(/_/g, " ")}</span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>{formatDate(item.expires_at)}</TableCell>
                <TableCell>
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      title="Cancelar invitación"
                      onClick={() => onCancel(item.id)}
                    >
                      <IconX className="h-4 w-4" />
                      Cancelar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No hay invitaciones pendientes.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

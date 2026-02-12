"use client";

import * as React from "react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconCircleCheckFilled, IconLoader, IconPower, IconSearch, IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";

// Schema basado en la interfaz Users
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  node_id: z.number().nullable(),
  node_code: z.string().nullable(),
  status: z.string(),
});

type User = z.infer<typeof userSchema>;

type UsersTableProps = {
  data: User[];
  onToggleStatus: (id: number) => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (search: string) => void;
};

export function UsersTable({
  data,
  onToggleStatus,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  onSearch,
}: UsersTableProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSearch = () => {
    onSearch?.(searchValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal, "es")
          : bVal.localeCompare(aVal, "es");
      }
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [data, sortBy, sortDirection]);

  const getSortIcon = (column: keyof User) => {
    if (sortBy !== column) {
      return <IconSelector className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <IconChevronUp className="h-4 w-4" />
    ) : (
      <IconChevronDown className="h-4 w-4" />
    );
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full flex-col justify-start">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2 max-w-md w-full mb-2">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o username..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Nombre
                    {getSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1">
                    Email
                    {getSortIcon("email")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center gap-1">
                    Rol
                    {getSortIcon("role")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("node_code")}
                >
                  <div className="flex items-center gap-1">
                    Nodo
                    {getSortIcon("node_code")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData && sortedData.length > 0 ? (
                sortedData.map((item) => (
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
                        {item.status === "active" ? (
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
                          variant={item.status === "active" ? "secondary" : "outline"}
                          title={
                            item.status === "active"
                              ? "Desactivar usuario"
                              : "Activar usuario"
                          }
                          onClick={() => onToggleStatus(item.id)}
                        >
                          {item.status === "active" ? (
                            <IconPower className="text-red-500" />
                          ) : (
                            <IconPower className="text-green-500" />
                          )}
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
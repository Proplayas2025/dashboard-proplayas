"use client";

import * as React from "react";
import { z } from "zod";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { IconSearch, IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons-react";
import Link from "next/link";

// Schema basado en la interfaz Nodes
export const nodeSchema = z.object({
  id: z.number(),
  code: z.string(),
  type: z.string(),
  name: z.string(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  joined_in: z.number().nullable(),
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
  onSearch?: (search: string) => void;
};

export function NodesTable({
  data,
  page = 1,
  pageSize = 50,
  total = 0,
  onPageChange,
  onSearch,
}: NodesTableProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof Node | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSearch = () => {
    onSearch?.(searchValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSort = (column: keyof Node) => {
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

  const getSortIcon = (column: keyof Node) => {
    if (sortBy !== column) {
      return <IconSelector className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <IconChevronUp className="h-4 w-4" />
    ) : (
      <IconChevronDown className="h-4 w-4" />
    );
  };

  // Paginación simple
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-2">
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto ">
        <div className="flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, código, país o ciudad..."
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
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("code")}
                >
                  <div className="flex items-center gap-1">
                    Código
                    {getSortIcon("code")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center gap-1">
                    Tipo
                    {getSortIcon("type")}
                  </div>
                </TableHead>
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
                  onClick={() => handleSort("country")}
                >
                  <div className="flex items-center gap-1">
                    País
                    {getSortIcon("country")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("city")}
                >
                  <div className="flex items-center gap-1">
                    Ciudad
                    {getSortIcon("city")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("joined_in")}
                >
                  <div className="flex items-center gap-1">
                    Año de ingreso
                    {getSortIcon("joined_in")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("members_count")}
                >
                  <div className="flex items-center gap-1">
                    Miembros
                    {getSortIcon("members_count")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData && sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <NodeCellViewer item={item} />
                    </TableCell>
                    <TableCell>{item.country || "-"}</TableCell>
                    <TableCell>{item.city || "-"}</TableCell>
                    <TableCell>{item.joined_in || "-"}</TableCell>
                    <TableCell>{item.members_count}</TableCell> 
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
      href={`/nodo/${item.code}`}
      className="font-medium text-cyan-700 hover:underline dark:text-cyan-300"
    >
      {item.name}
    </Link>
  );
}
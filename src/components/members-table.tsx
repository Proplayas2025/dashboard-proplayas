"use client";

import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconPower,
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconSelector,
} from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const schema = z.object({
  id: z.number(),
  user_id: z.number(),
  node_id: z.number(),
  member_code: z.string(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
  research_line: z.string().nullable(),
  work_area: z.string().nullable(),
  status: z.string(),
});

type Member = z.infer<typeof schema>;

type DataTableProps = {
  data: Member[];
  onToggleStatus: (id: number) => void;
};

export function DataTable({
  data,
  onToggleStatus,
}: DataTableProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [appliedSearch, setAppliedSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof Member | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSearch = () => {
    setAppliedSearch(searchValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSort = (column: keyof Member) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const filteredData = React.useMemo(() => {
    if (!appliedSearch) return data;
    const term = appliedSearch.toLowerCase();
    return data.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.username.toLowerCase().includes(term) ||
        m.member_code.toLowerCase().includes(term)
    );
  }, [data, appliedSearch]);

  const sortedData = React.useMemo(() => {
    if (!sortBy) return filteredData;
    
    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortBy, sortDirection]);

  const getSortIcon = (column: keyof Member) => {
    if (sortBy !== column) {
      return <IconSelector className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <IconChevronUp className="h-4 w-4" />
    ) : (
      <IconChevronDown className="h-4 w-4" />
    );
  };

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2 max-w-md w-full">
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
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
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
                  onClick={() => handleSort("username")}
                >
                  <div className="flex items-center gap-1">
                    Username
                    {getSortIcon("username")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("member_code")}
                >
                  <div className="flex items-center gap-1">
                    Member Code
                    {getSortIcon("member_code")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("research_line")}
                >
                  <div className="flex items-center gap-1">
                    Research Line
                    {getSortIcon("research_line")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted-foreground/10"
                  onClick={() => handleSort("work_area")}
                >
                  <div className="flex items-center gap-1">
                    Work Area
                    {getSortIcon("work_area")}
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
                  <TableRow key={item.id}>
                    <TableCell>
                      <TableCellViewer item={item} />
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.member_code}</TableCell>
                    <TableCell>{item.research_line || "-"}</TableCell>
                    <TableCell>{item.work_area || "-"}</TableCell>
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
                              ? "Desactivar miembro"
                              : "Activar miembro"
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function TableCellViewer({ item }: { item: Member }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Información del usuario seleccionada
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" value={item.name} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={item.email} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={item.username} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="member_code">Member Code</Label>
              <Input id="member_code" value={item.member_code} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="research_line">Research Line</Label>
              <Input id="research_line" value={item.research_line ?? ""} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="work_area">Work Area</Label>
              <Input id="work_area" value={item.work_area ?? ""} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={item.status} readOnly />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

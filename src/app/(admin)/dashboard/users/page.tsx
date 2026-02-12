"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { UsersTable } from "@/components/users-table";
import { UserService } from "@/lib/UserController";
import { SiteHeader } from "@/components/site-header";
import { Users, PaginationMeta } from "@/interfaces/Profile";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const userService = useMemo(() => new UserService(), []);
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    per_page: 25,
    total: 0,
    last_page: 1,
  });
  const pageSize = 25;

  const fetchUsers = useCallback(
    async (page = 1, pageSize = 25, searchTerm?: string) => {
      setLoading(true);
      try {
        const res = await userService.fetchUsers(page, pageSize, searchTerm ?? search);
        setUsers(res?.data || []);
        setMeta(
          res?.meta ?? {
            current_page: 1,
            per_page: 25,
            total: 0,
            last_page: 1,
          }
        );
      } catch {
        setUsers([]);
        setMeta({
          current_page: 1,
          per_page: 25,
          total: 0,
          last_page: 1,
        });
      }
      setLoading(false);
    },
    [userService, search]
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
    fetchUsers(1, pageSize, value);
  }, [fetchUsers, pageSize]);

  const handleToggleStatus = async (id: number) => {
    try {
      await userService.toggleUserStatus(id);
      toast.success("Estado del usuario actualizado");
      fetchUsers(page, pageSize);
    } catch {
      toast.error("Error al cambiar el estado del usuario");
    }
  };

  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [fetchUsers, page, pageSize]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">
                Cargando usuarios...
              </span>
            </div>
          ) : (
            <UsersTable
              data={users}
              onToggleStatus={handleToggleStatus}
              page={meta.current_page}
              pageSize={meta.per_page}
              total={meta.total}
              onPageChange={setPage}
              onSearch={handleSearch}
            />
          )}
        </div>
      </div>
    </>
  );
}

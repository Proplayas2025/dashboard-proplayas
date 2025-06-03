"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { UsersTable } from "@/components/users-table";
import { UserService } from "@/lib/UserController";
import { SiteHeader } from "@/components/site-header";
import { Users } from "@/interfaces/Profile";
import { Loader2 } from "lucide-react";

export default function Page() {
  const userService = useMemo(() => new UserService(), []);
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  });
  const pageSize = 10;

  const fetchUsers = useCallback(
    async (page = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const res = await userService.fetchUsers(page, pageSize);
        setUsers(res?.data || []);
        setMeta(res?.meta || {});
      } catch (e) {
        setUsers([]);
        setMeta({});
      }
      setLoading(false);
    },
    [userService]
  );

  const handleDelete = async (email: string) => {
    const user = users.find((u) => u.email === email);
    if (!user) return;
    await userService.deleteUser(String(user.id));
    fetchUsers(page, pageSize);
  };

  const handleToggleStatus = async (email: string) => {
    // Aquí podrías implementar la lógica para activar/desactivar usuario si tu API lo permite
    fetchUsers(page, pageSize);
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
              onDelete={handleDelete}
              page={meta.current_page}
              pageSize={meta.per_page}
              total={meta.total}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

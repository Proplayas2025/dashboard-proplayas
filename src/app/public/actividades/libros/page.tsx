"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/Act-ui/Books";
import { Books } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";

export default function LibrosPage() {
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const content = new ContentController();
        const res = await content.getContent("books");
        setBooks(res || []);
      } catch {
        setBooks([]);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))" }}
      >
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">Cargando libros...</span>
          </div>
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay libros registrados.
          </div>
        )}
      </div>
    </div>
  );
}
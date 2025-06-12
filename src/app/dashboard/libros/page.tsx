"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ContentController } from "@/lib/ContentController";
import { Books } from "@/interfaces/Content";
import { BookCard } from "@/components/Cards/Books";
import { EditBookModal } from "@/components/Forms/libros/EditBook";
import { CreateBookModal } from "@/components/Forms/libros/CreateBook";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  EditCoverImageModal,
  EditAttachmentFileModal,
} from "@/components/Forms/Acomposables/EditFiles";
import { toast } from "sonner";

export default function Page() {
  const content = useMemo(() => new ContentController(), []);
  const [books, setBooks] = useState<Books[]>([]);
  const [editBook, setEditBook] = useState<Books | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para los modales de imagen y archivo
  const [showImageModal, setShowImageModal] = useState<Books | null>(null);
  const [showFileModal, setShowFileModal] = useState<Books | null>(null);

  const handleEdit = (book: Books) => {
    setEditBook(book);
    setShowEdit(true);
  };

  const handleDelete = async (book: Books) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este libro?"))
      return;
    try {
      await content.deleteContent("book", book.id);
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
      toast.success("El libro se ha eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar el libro", err);
      toast.error("Ocurrió un error al eliminar el libro");
    }
  };

  const handleSave = async (updated: Books) => {
    const payload = {
      title: updated.title,
      book_author: updated.book_author,
      publication_date: updated.publication_date,
      isbn: updated.isbn,
      description: updated.description,
      link: updated.link,
      cover_image_url: updated.cover_image_url,
      file_url: updated.file_url,
    };
    try {
      const res = await content.updateContent("book", updated.id, payload);
      if (res?.data) {
        setBooks((prev) =>
          prev.map((b) => (b.id === updated.id ? res.data : b))
        );
        toast.success("El libro se ha actualizado con éxito");
      }
    } catch (err) {
      console.error("Error al actualizar el libro", err);
      toast.error("Ocurrió un error al actualizar el libro");
    }
    setShowEdit(false);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      const res = await content.createContent("book", formData);
      if (res?.data) {
        setBooks((prev) => [res.data, ...prev]);
        toast.success("El libro se ha creado con éxito");
      }
    } catch (err) {
      console.error("Error al crear el libro", err);
      toast.error("Ocurrió un error al crear el libro");
    }
    setShowCreate(false);
  };

  // Handler para subir imagen de portada
  const handleUploadImage = async (book: Books, file: File) => {
    try {
      await content.uploadImage("book", book.id, file);
      await fetchBooks();
      toast.success("La imagen de portada se ha actualizado con éxito");
    } catch (err) {
      console.error("Error al subir la imagen de portada", err);
      toast.error("Ocurrió un error al subir la imagen de portada");
    }
    setShowImageModal(null);
  };

  // Handler para subir archivo adjunto
  const handleUploadFile = async (book: Books, file: File) => {
    try {
      await content.uploadFile("book", book.id, file);
      await fetchBooks();
      toast.success("El archivo adjunto se ha actualizado con éxito");
    } catch (err) {
      console.error("Error al subir el archivo adjunto", err);
      toast.error("Ocurrió un error al subir el archivo adjunto");
    }
    setShowFileModal(null);
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await content.getContentAuthor("books");
      setBooks(res?.data || []);
    } catch {
      toast.error("Ocurrió un error al cargar los libros");
    }
    setLoading(false);
  }, [content]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <SiteHeader />
      <div className="flex justify-end px-4 mt-4">
        <Button onClick={() => setShowCreate(true)}>+ Crear libro</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 dark:text-gray-400">
              Cargando libros...
            </span>
          </div>
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onChangeImage={setShowImageModal}
              onChangeFile={setShowFileModal}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay libros registrados.
          </div>
        )}
      </div>
      <EditBookModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        book={editBook}
        onSave={handleSave}
      />
      <CreateBookModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSave={handleCreate}
      />
      <EditCoverImageModal
        isOpen={!!showImageModal}
        item={showImageModal}
        onClose={() => setShowImageModal(null)}
        onSave={handleUploadImage}
      />
      <EditAttachmentFileModal
        isOpen={!!showFileModal}
        item={showFileModal}
        onClose={() => setShowFileModal(null)}
        onSave={handleUploadFile}
      />
    </>
  );
}

import { render, screen, fireEvent } from "@testing-library/react";
import { CreateBookModal } from "@/components/Forms/libros/CreateBook";

describe("CreateBookModal", () => {
  it("rellena y envía el formulario correctamente", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <CreateBookModal isOpen={true} onClose={onClose} onSave={onSave} />
    );

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: "Mi Libro" } });
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: "Autor Prueba" } });
    fireEvent.change(screen.getByLabelText(/Fecha de publicación/i), { target: { value: "2024-06-01" } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "Descripción de prueba" } });
    fireEvent.change(screen.getByLabelText(/Enlace/i), { target: { value: "https://ejemplo.com" } });
    fireEvent.change(screen.getByLabelText(/URL de imagen de portada/i), { target: { value: "https://img.com/portada.jpg" } });
    fireEvent.change(screen.getByLabelText(/URL de archivo adjunto/i), { target: { value: "https://ejemplo.com/archivo.pdf" } });

    fireEvent.click(screen.getByRole("button", { name: /Crear/i }));

    expect(onSave).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
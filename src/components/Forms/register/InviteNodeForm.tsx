import React, { useState } from "react";
import type { InviteNodeLeader } from "@/interfaces/Invitations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NODE_TYPES: Record<string, string> = {
  A: "sociedad_civil",
  E: "empresarial",
  C: "cientifico",
  F: "funcion_publica",
  I: "individual",
};

const NODE_CODES: Record<string, string> = {
  sociedad_civil: "A",
  empresarial: "E",
  cientifico: "C",
  funcion_publica: "F",
  individual: "I",
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InviteNodeLeader) => void;
  loading?: boolean;
}

export default function InviteNodeForm({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: Props) {
  const [form, setForm] = useState<Omit<InviteNodeLeader, "code" | "role_type">>({
    name: "",
    email: "",
    node_type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.node_type) return;
    // Calcula el code a partir del node_type seleccionado
    const code = NODE_CODES[form.node_type as keyof typeof NODE_CODES] || "";
    const data: InviteNodeLeader = {
      ...form,
      code,
      role_type: "node_leader",
    };
    onSubmit(data);
    setForm({ name: "", email: "", node_type: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invitar líder de nodo</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="node_type">Tipo de nodo</Label>
            <select
              id="node_type"
              name="node_type"
              value={form.node_type}
              onChange={handleChange}
              required
              className="w-full border rounded h-10 px-2"
            >
              <option value="">Selecciona un tipo</option>
              {Object.entries(NODE_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                  {key} - {value.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Invitar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
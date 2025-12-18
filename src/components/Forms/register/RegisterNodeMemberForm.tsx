import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { RegisterNodeMemberRequest, SocialMediaItem } from "@/interfaces/Invitations";

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  initialValues?: Partial<RegisterNodeMemberRequest> & { email: string; name?: string; token: string };
}

const availableSocialPlatforms = () => [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "research_gate", label: "ResearchGate" },
  { value: "website", label: "Sitio Web" },
  { value: "phone", label: "Teléfono" },
];
const allowedPlatforms = [
  "linkedin",
  "github",
  "twitter",
  "website",
  "facebook",
  "instagram",
  "youtube",
  "research_gate",
  "phone",
] as const;

type Platform = (typeof allowedPlatforms)[number];

export default function RegisterNodeMemberForm({ onSubmit, loading, initialValues }: Props) {
  const [form, setForm] = useState<RegisterNodeMemberRequest>({
    token: initialValues?.token || "",
    name: initialValues?.name || "",
    username: "",
    email: initialValues?.email || "",
    password: "",
    confirm_password: "",
    expertise_area: "",
    research_work: "",
    social_media: [],
    about_user: "",
    country_user: "",
    city_user: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordInfo, setPasswordInfo] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "password" || name === "confirm_password") {
        const pwd = name === "password" ? value : updated.password;
        setPasswordInfo({
          length: pwd.length >= 8,
          upper: /[A-Z]/.test(pwd),
          lower: /[a-z]/.test(pwd),
          number: /\d/.test(pwd),
          special: /[^A-Za-z0-9]/.test(pwd),
        });
        setPasswordsMatch(updated.password === updated.confirm_password);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return; // Omitir campos vacíos
      }

      // Manejar archivos (File objects) - solo si tienen contenido
      if (value instanceof File) {
        if (value.size > 0) {
          data.append(key, value);
        }
      }
      // Manejar arrays (social_media)
      else if (Array.isArray(value)) {
        if (value.length > 0) {
          // Enviar arrays en formato que Laravel puede entender
          value.forEach((item, index) => {
            if (typeof item === 'object') {
              Object.entries(item).forEach(([itemKey, itemValue]) => {
                data.append(`${key}[${index}][${itemKey}]`, String(itemValue));
              });
            } else {
              data.append(`${key}[${index}]`, String(item));
            }
          });
        }
      }
      // Manejar otros valores
      else {
        data.append(key, String(value));
      }
    });

    onSubmit(data);
  };

  return (
    <form className="space-y-4 w-full max-w-xl mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-4">Registro de Miembro</h1>
      <div className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
        <Label htmlFor="email">Email*</Label>
        <Input id="email" name="email" value={form.email} readOnly required />

        <Label htmlFor="name">Nombre*</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} required />

        <Label htmlFor="username">Usuario</Label>
        <Input id="username" name="username" value={form.username} onChange={handleChange} autoComplete="username" />

        <Label htmlFor="password">Contraseña*</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          La contraseña debe tener al menos:
          <ul className="list-disc ml-5">
            <li className={passwordInfo.length ? "text-green-600 dark:text-green-400" : ""}>8 caracteres</li>
            <li className={passwordInfo.upper ? "text-green-600 dark:text-green-400" : ""}>Una letra mayúscula</li>
            <li className={passwordInfo.lower ? "text-green-600 dark:text-green-400" : ""}>Una letra minúscula</li>
            <li className={passwordInfo.number ? "text-green-600 dark:text-green-400" : ""}>Un número</li>
            <li className={passwordInfo.special ? "text-green-600 dark:text-green-400" : ""}>Un carácter especial</li>
          </ul>
        </div>

        <Label htmlFor="confirm_password">Confirmar Contraseña*</Label>
        <div className="relative">
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirm ? "text" : "password"}
            value={form.confirm_password}
            onChange={handleChange}
            required
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowConfirm((v) => !v)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!passwordsMatch && (
          <div className="text-xs text-red-600 mt-1">
            Las contraseñas no coinciden.
          </div>
        )}

        <Label htmlFor="expertise_area">Área de experiencia</Label>
        <Input id="expertise_area" name="expertise_area" value={form.expertise_area} onChange={handleChange} />

        <Label htmlFor="research_work">Trabajo de investigación</Label>
        <Input id="research_work" name="research_work" value={form.research_work} onChange={handleChange} />

        {/* Redes sociales del usuario */}
        <div className="space-y-2">
          <Label className="font-medium">Redes sociales</Label>
          {Array.isArray(form.social_media) && form.social_media.map((item: SocialMediaItem, index: number) => (
            <div key={index} className="flex gap-2 items-center">
              <Select
                value={item.platform}
                onValueChange={(value) => {
                  const updated = [...(form.social_media || [])];
                  if (allowedPlatforms.includes(value as Platform)) {
                    updated[index].platform = value as Platform;
                  }
                  setForm({ ...form, social_media: updated });
                }}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {availableSocialPlatforms().map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="URL"
                value={item.url}
                onChange={(e) => {
                  const updated = [...(form.social_media || [])];
                  updated[index].url = e.target.value;
                  setForm({ ...form, social_media: updated });
                }}
              />
              <Button
                variant="ghost"
                className="text-red-600"
                type="button"
                onClick={() => {
                  const updated =
                    form.social_media?.filter((_, i) => i !== index) || [];
                  setForm({ ...form, social_media: updated });
                }}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="link"
            onClick={() => {
              const updated = [
                ...(form.social_media || []),
                { platform: allowedPlatforms[0], url: "" },
              ];
              setForm({ ...form, social_media: updated });
            }}
          >
            + Agregar
          </Button>
        </div>

        <Label htmlFor="about_user">Sobre el usuario</Label>
        <Textarea id="about_user" name="about_user" value={form.about_user} onChange={handleChange} />

        <Label htmlFor="country_user">País</Label>
        <Input id="country_user" name="country_user" value={form.country_user} onChange={handleChange} />

        <Label htmlFor="city_user">Ciudad</Label>
        <Input id="city_user" name="city_user" value={form.city_user} onChange={handleChange} />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </Button>
      </div>
    </form>
  );
}

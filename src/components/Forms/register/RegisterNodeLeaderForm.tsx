import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import type { RegisterNodeLeaderRequest, SocialMediaItem } from "@/interfaces/Invitations";

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  initialValues?: Partial<RegisterNodeLeaderRequest> & { email: string; name?: string; node_type?: string };
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

export default function RegisterNodeLeaderForm({ onSubmit, loading, initialValues }: Props) {
  const [form, setForm] = useState<RegisterNodeLeaderRequest>({
    token: initialValues?.token || "",
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    password: "",
    confirm_password: "",
    about_user: "",
    degree: "",
    postgraduate: "",
    expertise_area: "",
    research_work: "",
    profile_picture_file: null,
    profile_picture: "",
    country_user: "",
    city_user: "",
    social_media: [],
    node_name: "",
    profile_picture_node_file: null,
    profile_picture_node: "",
    about_node: "",
    country_node: "",
    city_node: "",
    coordinates: "",
    alt_places: "",
    joined_in: undefined,
    social_media_node: [],
    memorandum: "",
    node_type: initialValues?.node_type || "",
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

  // Actualiza la verificación de la contraseña y si coinciden
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "password" || name === "confirm_password") {
        // Validación de formato de contraseña
        const pwd = name === "password" ? value : updated.password;
        setPasswordInfo({
          length: pwd.length >= 8,
          upper: /[A-Z]/.test(pwd),
          lower: /[a-z]/.test(pwd),
          number: /\d/.test(pwd),
          special: /[^A-Za-z0-9]/.test(pwd),
        });
        // Validación de coincidencia
        setPasswordsMatch(updated.password === updated.confirm_password);
      }
      return updated;
    });
  };

  // Manejo de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : null,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Usar FormData para enviar archivos
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => data.append(`${key}[]`, v));
        } else {
          data.append(key, value as string);
        }
      }
    });
    onSubmit(data);
  };

  return (
    <form className="space-y-4 w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-4">Registro de Líder de Nodo</h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Completa el formulario para registrarte como líder de nodo. Los campos marcados con * son obligatorios.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
        {/* Columna izquierda: Datos personales */}
        <div className="flex flex-col gap-4 rounded-lg p-4">
          <div className="mb-2">
            <Label className="text-base font-semibold text-blue-900">Datos personales</Label>
          </div>
          <Label htmlFor="email">Email*</Label>
          <Input id="email" name="email" value={form.email} readOnly required />

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
              autoComplete="new-password"
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
          <div className="text-xs text-gray-600 mt-1">
            La contraseña debe tener al menos:
            <ul className="list-disc ml-5">
              <li className={passwordInfo.length ? "text-green-600" : ""}>8 caracteres</li>
              <li className={passwordInfo.upper ? "text-green-600" : ""}>Una letra mayúscula</li>
              <li className={passwordInfo.lower ? "text-green-600" : ""}>Una letra minúscula</li>
              <li className={passwordInfo.number ? "text-green-600" : ""}>Un número</li>
              <li className={passwordInfo.special ? "text-green-600" : ""}>Un carácter especial</li>
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
              autoComplete="new-password"
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

          {/* <Label htmlFor="username">Usuario</Label>
          <Input id="username" name="username" value={form.username} onChange={handleChange} autoComplete="username"/> */}

          <Label htmlFor="degree">Grado académico</Label>
          <Input id="degree" name="degree" value={form.degree} onChange={handleChange} />

          <Label htmlFor="postgraduate">Posgrado</Label>
          <Input id="postgraduate" name="postgraduate" value={form.postgraduate} onChange={handleChange} />

          <Label htmlFor="expertise_area">Área de experiencia</Label>
          <Input id="expertise_area" name="expertise_area" value={form.expertise_area} onChange={handleChange} />

          <Label htmlFor="research_work">Trabajo de investigación</Label>
          <Input id="research_work" name="research_work" value={form.research_work} onChange={handleChange} />

          <Label htmlFor="profile_picture_file">Foto de perfil</Label>
          <Input id="profile_picture_file" name="profile_picture_file" type="file" accept="image/*" onChange={handleFileChange} />

          <Label htmlFor="profile_picture">URL foto de perfil</Label>
          <Input id="profile_picture" name="profile_picture" value={form.profile_picture} onChange={handleChange} />

          <Label htmlFor="country_user">País* (usuario)</Label>
          <Input id="country_user" name="country_user" value={form.country_user} onChange={handleChange} />

          <Label htmlFor="city_user">Ciudad* (usuario)</Label>
          <Input id="city_user" name="city_user" value={form.city_user} onChange={handleChange} />

          <Label htmlFor="about_user">Sobre el usuario</Label>
          <Textarea id="about_user" name="about_user" value={form.about_user} onChange={handleChange} />

          {/* Redes sociales del usuario */}
          <div className="space-y-2">
            <Label className="font-medium">Redes sociales (usuario)</Label>
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
              }}>+ Agregar
            </Button>
          </div>

        </div>
        {/* Columna derecha: Datos del nodo */}
        <div className="flex flex-col gap-4 rounded-lg p-4">
          <div className="mb-2">
            <Label className="text-base font-semibold text-green-900">Datos del nodo</Label>
          </div>
          <Label htmlFor="node_name">Nombre del nodo</Label>
          <Input id="node_name" name="node_name" value={form.node_name} onChange={handleChange} />

          <Label htmlFor="profile_picture_node_file">Foto de perfil nodo</Label>
          <Input id="profile_picture_node_file" name="profile_picture_node_file" type="file" accept="image/*" onChange={handleFileChange} />

          <Label htmlFor="profile_picture_node">URL foto nodo</Label>
          <Input id="profile_picture_node" name="profile_picture_node" value={form.profile_picture_node} onChange={handleChange} />

          <Label htmlFor="country_node">País* (nodo)</Label>
          <Input id="country_node" name="country_node" value={form.country_node} onChange={handleChange} />

          <Label htmlFor="city_node">Ciudad* (nodo)</Label>
          <Input id="city_node" name="city_node" value={form.city_node} onChange={handleChange} />

          <Label htmlFor="coordinates">Coordenadas</Label>
          <Input id="coordinates" name="coordinates" value={form.coordinates} onChange={handleChange} />

          <Label htmlFor="alt_places">Lugares alternos</Label>
          <Input id="alt_places" name="alt_places" value={form.alt_places} onChange={handleChange} />

          <Label htmlFor="joined_in">Año de ingreso*</Label>
          <Input id="joined_in" name="joined_in" type="number" min={2000} max={new Date().getFullYear()} value={form.joined_in || ""} onChange={handleChange} />


          <Label htmlFor="about_node">Sobre el nodo</Label>
          <Textarea id="about_node" name="about_node" value={form.about_node} onChange={handleChange} />

          {/* Redes sociales del nodo */}
          <div className="space-y-2">
            <Label className="font-medium">Redes sociales (nodo)</Label>
            {Array.isArray(form.social_media_node) && form.social_media_node.map((item: SocialMediaItem, index: number) => (
              <div key={index} className="flex gap-2 items-center">
                <Select
                  value={item.platform}
                  onValueChange={(value) => {
                    const updated = [...(form.social_media_node || [])];
                    if (allowedPlatforms.includes(value as Platform)) {
                      updated[index].platform = value as Platform;
                    }
                    setForm({ ...form, social_media_node: updated });
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
                    const updated = [...(form.social_media_node || [])];
                    updated[index].url = e.target.value;
                    setForm({ ...form, social_media_node: updated });
                  }}
                />
                <Button
                  variant="ghost"
                  className="text-red-600"
                  type="button"
                  onClick={() => {
                    const updated =
                      form.social_media_node?.filter((_, i) => i !== index) || [];
                    setForm({ ...form, social_media_node: updated });
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
                  ...(form.social_media_node || []),
                  { platform: allowedPlatforms[0], url: "" },
                ];
                setForm({ ...form, social_media_node: updated });
              }}
            >
              + Agregar
            </Button>
          </div>
          
          <Label htmlFor="memorandum">Memorándum</Label>
          <Input id="memorandum" name="memorandum" value={form.memorandum} onChange={handleChange} />

          <Label htmlFor="node_type">Tipo de nodo</Label>
          <Input id="node_type" name="node_type" value={form.node_type} readOnly />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </Button>
      </div>
    </form>
  );
}
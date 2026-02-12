"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { ProfileService } from "@/lib/ProfileController";
import type { User } from "@/interfaces/Profile";
import { getProfileUrl } from "@/lib/image-utils";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IconPencil, IconWorld, IconPin } from "@tabler/icons-react";
// Puedes crear estos componentes modales como en el nodo, o usar los mismos si son genéricos
import {
  EditProfileFormModal,
  EditProfileImageModal,
} from "@/components/Forms/perfil/EditProfile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const profileService = useMemo(() => new ProfileService(), []);
  const [user, setUser] = useState<User>();
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncateText = (text: string | undefined, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  
  const shouldShowButton = (text: string | undefined, wordLimit: number) => {
    if (!text) return false;
    return text.split(/\s+/).length > wordLimit;
  };

  // Para la edición de datos personales
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await profileService.fetchProfile();
      setUser(res?.data || undefined);
    } catch {
      toast.error("Error al cargar el perfil");
    }
    setLoading(false);
  }, [profileService]);

  // Actualizar datos personales
  const handleSaveInfo = async (updated: Partial<User>) => {
    try {
      const res = await profileService.updateProfile(updated);
      setUser(res.data);
      toast.success("Perfil actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el perfil");
    }
    setShowEditInfo(false);
  };

  // Actualizar imagen de perfil
  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await profileService.uploadProfilePicture(formData);
      setUser(res.data);
      toast.success("Imagen de perfil actualizada");
    } catch {
      toast.error("Error al actualizar la imagen de perfil");
    }
    setShowEditImage(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        {/* Esta es la card que muestra informacion */}
        <div className="@container/main flex flex-1 flex-col gap-2 mb-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">
                Cargando perfil...
              </span>
            </div>
          ) : user ? (
            <Card className="p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
              <CardContent className="flex flex-col items-center md:items-start p-0">
              <div className="relative w-32 h-32 md:w-48 md:h-48 group">
                <Image
                  width={192}
                  height={192}
                  src={
                    user.profile_picture && typeof user.profile_picture === "string"
                      ? getProfileUrl(user.profile_picture) || "/proplayas_img.jpg"
                      : "/proplayas_img.jpg"}
                  alt="Foto de perfil"
                  className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
                  unoptimized
                />
                <CardAction className="absolute top-2 right-2">
                  <button
                    onClick={() => setShowEditImage(true)}
                    className="bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-gray-100 p-1 rounded-full shadow"
                  >
                    <IconPencil size={18} />
                  </button>
                </CardAction>
              </div>
              <div className="my-3 text-center md:text-left">
                <CardTitle className="text-2xl font-semibold text-gray-500 dark:text-white">
                {user.name}
                </CardTitle>
                <CardDescription className="text-gray-400">@{user.username}</CardDescription>
              </div>
              <div className="flex gap-2 text-gray-500 dark:text-white">
                <p>{user.degree}</p>
                {user.postgraduate && <span>- {user.postgraduate}</span>}
              </div>
              <p className="text-gray-400 dark:text-white text-center md:text-left">
                {user.email}
              </p>
              <div className="flex flex-col gap-1 text-gray-500 dark:text-white mt-2">
                <span>
                <IconWorld size={16} className="inline mr-1" />
                <span className="font-semibold">País:</span> {user.country}
                </span>
                <span>
                <IconPin size={16} className="inline mr-1" />
                <span className="font-semibold">Ciudad:</span> {user.city}
                </span>
              </div>
              </CardContent>

              <CardContent className="flex flex-col justify-between relative p-0">
              <CardAction className="absolute top-4 right-4">
                <button
                onClick={() => setShowEditInfo(true)}
                className="bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-gray-100 p-1 rounded-full shadow"
                >
                <IconPencil size={18} />
                </button>
              </CardAction>
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-500 dark:text-white">
                Sobre mí
                </CardTitle>
                <div className="text-gray-600 dark:text-white mt-2">
                  <p className="whitespace-pre-wrap">
                    {isExpanded ? user.about : truncateText(user.about, 50)}
                  </p>
                  {shouldShowButton(user.about, 50) && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 text-sm mt-2 transition"
                    >
                      {isExpanded ? "Ver menos" : "Ver más"}
                    </button>
                  )}
                </div>
                <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                  Área de experiencia
                </h2>
                <p className="text-gray-600 dark:text-white">
                  {user.expertise_area}
                </p>
                </div>
                <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                  Trabajo de investigación
                </h2>
                <p className="text-gray-600 dark:text-white">
                  {user.research_work}
                </p>
                </div>
              </div>
              {user.social_media && user.social_media.length > 0 && (
                <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                  Redes Sociales:
                </h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  {user.social_media.map((link) => (
                  <a
                    key={link.platform + link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition"
                  >
                    {link.platform}
                  </a>
                  ))}
                </div>
                </div>
              )}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No se pudo cargar el perfil.
            </div>
          )}
        </div>
      </div>
      {/* Modales de edición */}

      {user && (
        <EditProfileFormModal
          isOpen={showEditInfo}
          onClose={() => setShowEditInfo(false)}
          defaultValues={user}
          onSave={handleSaveInfo}
        />
      )}
      {user && (
        <EditProfileImageModal
          isOpen={showEditImage}
          onClose={() => setShowEditImage(false)}
          onUpload={handleUploadImage}
        />
      )}
    </>
  );
}

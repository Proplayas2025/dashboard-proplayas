"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ProfileService } from "@/lib/ProfileController";
import type { User } from "@/interfaces/Profile";
import { getProfileUrl } from "@/lib/image-utils";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { IconWorld, IconPin } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const profileService = useMemo(() => new ProfileService(), []);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
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

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await profileService.getPublicProfile(username);
        if (res?.data) {
          setUser(res.data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    }
    if (username) fetchProfile();
  }, [username, profileService]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-gray-400 mb-2" />
        <span className="text-gray-500 dark:text-gray-400">
          Cargando perfil...
        </span>
      </div>
    );
  }

  if (notFound || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">
          Usuario no encontrado
        </h2>
        <p className="text-gray-400 dark:text-gray-500">
          El perfil que buscas no existe o no está disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(400px,_1fr)] gap-6">
        <CardContent className="flex flex-col items-center md:items-start p-0">
          <div className="w-32 h-32 md:w-48 md:h-48">
            <Image
              width={192}
              height={192}
              src={
                user.profile_picture &&
                typeof user.profile_picture === "string"
                  ? getProfileUrl(user.profile_picture) || "/proplayas_img.jpg"
                  : "/proplayas_img.jpg"
              }
              alt="Foto de perfil"
              className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
              unoptimized
            />
          </div>
          <div className="my-3 text-center md:text-left">
            <CardTitle className="text-2xl font-semibold text-gray-500 dark:text-white">
              {user.name}
            </CardTitle>
            <CardDescription className="text-gray-400">
              @{user.username}
            </CardDescription>
          </div>
          <div className="flex gap-2 text-gray-500 dark:text-white">
            <p>{user.degree}</p>
            {user.postgraduate && <span>- {user.postgraduate}</span>}
          </div>
          <p className="text-gray-400 dark:text-white text-center md:text-left">
            {user.email}
          </p>
          {(user.country || user.city) && (
            <div className="flex flex-col gap-1 text-gray-500 dark:text-white mt-2">
              {user.country && (
                <span>
                  <IconWorld size={16} className="inline mr-1" />
                  <span className="font-semibold">País:</span> {user.country}
                </span>
              )}
              {user.city && (
                <span>
                  <IconPin size={16} className="inline mr-1" />
                  <span className="font-semibold">Ciudad:</span> {user.city}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardContent className="flex flex-col justify-between p-0">
          {user.about && (
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
            </div>
          )}
          {user.expertise_area && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                Área de experiencia
              </h2>
              <p className="text-gray-600 dark:text-white">
                {user.expertise_area}
              </p>
            </div>
          )}
          {user.research_work && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-500 dark:text-white">
                Trabajo de investigación
              </h2>
              <p className="text-gray-600 dark:text-white">
                {user.research_work}
              </p>
            </div>
          )}
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
    </div>
  );
}

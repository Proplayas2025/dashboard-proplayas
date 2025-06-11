"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/Act-ui/Events";
import { Events } from "@/interfaces/Content";
import { ContentController } from "@/lib/ContentController";
import { Loader2 } from "lucide-react";

export default function EventosPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const content = new ContentController();
        const res = await content.getContent("events");
        setEvents(res || []);
      } catch {
        setEvents([]);
      }
      setLoading(false);
    };
    fetchEvents();
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
            <span className="text-gray-500 dark:text-gray-400">Cargando eventos...</span>
          </div>
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay eventos registrados.
          </div>
        )}
      </div>
    </div>
  );
}
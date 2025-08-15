import { DataService } from "@/lib/services/data.service";
import { EventsClient } from "./events-client";

interface EventsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  const dataService = DataService.getInstance();
  const events = await dataService.getEvents(locale);

  return <EventsClient events={events} />;
}

import RootLayout from "@/components/layout/RootLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionCard } from "@/components/custom/SessionCard";
import { useState, useEffect } from "react";
import logoOP from "@/assets/images/ordem-paranormal-logo.svg";
import logoDnd from "@/assets/images/d&d-logo.svg";

export interface Session {
  id: string;
  title: string;
  system: string;
  period: "manha" | "tarde" | "noite";
  date?: Date | null;
  possibledate: Date[];
  description: string;
  master: string;
  room: string;
  slots: number;
  requirements: string;
  iconUrl?: string;
}

const mockAvailableSessions: Session[] = [
  {
    id: "1",
    title: "Guardiões do Hiato",
    system: "D&D",
    period: "noite",
    possibledate: [new Date("2024-07-01T19:00:00")],
    description: "Aventura épica em mundos desconhecidos. Os jogadores serão transportados para terras misteriosas onde precisarão desvendar enigmas antigos, enfrentar criaturas lendárias e tomar decisões que podem mudar o destino de todo o reino.",
    master: "Ana Mestre",
    room: "A01",
    slots: 3,
    requirements: "Trazer ficha pronta.",
    iconUrl: logoDnd,
  },
  {
    id: "2", 
    title: "Combos Paranormais",
    system: "Ordem Paranormal", 
    period: "tarde",
    possibledate: [new Date("2024-07-02T14:00:00")],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    master: "Carlos GM",
    room: "B02",
    slots: 0,
    requirements: "Nenhum.",
    iconUrl: logoOP,
  },
];

function SessionSkeleton() {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}

const Sessions = () => {
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessions(mockAvailableSessions);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (sessionId: string) => {
    setExpandedSessions(prev => 
      prev[0] === sessionId ? [] : [sessionId]
    );
  };

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Sessões Disponíveis</h1>
        
        {loading && (
          <div>
            {[1, 2].map((n) => (
              <SessionSkeleton key={n} />
            ))}
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Não há sessões disponíveis no momento.
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && sessions.length > 0 && (
          <div>
            {sessions.map((session) => (
              <SessionCard 
                key={session.id}
                session={session}
                isExpanded={expandedSessions.includes(session.id)}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default Sessions;
import RootLayout from "@/components/layout/RootLayout";
import { SessionCard, SessionSkeleton } from "@/components/custom/SessionCard";
import { useState, useEffect } from "react";
import type { Session } from "@/services/sessionServices/session.types";
import { getSessions } from "@/services/sessionServices/session.services";

const Sessions = () => {
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (sessionId: string) => {
    setExpandedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchSessions = async () => {
      try {
        const response = await getSessions(); // TODO: Alterar para getAprovedSessions

        if (isMounted) {
          const sessionsData = response.sessions || response.data || response;
          setSessions(sessionsData || []);
        }
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);

        if (isMounted) {
          setSessions([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RootLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sessões Disponíveis
        </h1>

        {loading && <SessionSkeleton />}

        {!loading && sessions.length === 0 && (
          <>
            <p className="text-muted-foreground text-center">
              Não há sessões disponíveis no momento.
            </p>
          </>
        )}

        {!loading && sessions.length > 0 && (
          <div>
            {sessions.map((session) => (
              <SessionCard
                key={session.id || `session-${Math.random()}`}
                session={session}
                isExpanded={
                  session.id ? expandedSessions.includes(session.id) : false
                }
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

import RootLayout from "@/components/layout/RootLayout";
import { SessionCard, SessionSkeleton } from "@/components/custom/SessionCard";
import { useState, useEffect } from "react";
import type { Session } from "@/services/sessionServices/session.types";
import { getAprovedSessions } from "@/services/sessionServices/session.services";

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
        const response = await getAprovedSessions();
        console.log("Response completa:", response);

        if (isMounted) {
          // Trata diferentes formatos de resposta da API
          let sessionsData = [];
          if (Array.isArray(response)) {
            sessionsData = response;
          } else if (response.sessions && Array.isArray(response.sessions)) {
            sessionsData = response.sessions;
          } else if (response.data && Array.isArray(response.data)) {
            sessionsData = response.data;
          }
          
          // Calcula as vagas disponíveis para cada sessão
          const sessionsWithSlots = sessionsData.map((session: Session) => {
            const enrolledCount = session.enrollments?.length || 0;
            const slots = session.maxPlayers - enrolledCount;
            console.log(`Sessão ${session.title}:`, {
              approvedDate: session.approvedDate,
              createdAt: session.createdAt,
              maxPlayers: session.maxPlayers,
              enrollments: session.enrollments,
              enrolledCount,
              slots
            });
            return {
              ...session,
              slots: slots >= 0 ? slots : 0
            };
          });
          
          console.log("Sessões processadas com slots:", sessionsWithSlots);
          console.log("Primeira sessão completa:", JSON.stringify(sessionsWithSlots[0], null, 2));
          
          setSessions(sessionsWithSlots);
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

  const handleEnrollSuccess = async () => {
    // Recarrega as sessões após inscrição bem-sucedida
    console.log("🔄 Recarregando sessões após inscrição...");
    setLoading(true);
    try {
      const response = await getAprovedSessions();
      console.log("📥 Response após inscrição:", response);
      
      let sessionsData = [];
      if (Array.isArray(response)) {
        sessionsData = response;
      } else if (response.sessions && Array.isArray(response.sessions)) {
        sessionsData = response.sessions;
      } else if (response.data && Array.isArray(response.data)) {
        sessionsData = response.data;
      }
      
      const sessionsWithSlots = sessionsData.map((session: Session) => {
        const enrolledCount = session.enrollments?.length || 0;
        const slots = session.maxPlayers - enrolledCount;
        console.log(`🎲 Recalculando: ${session.title} - enrollments:`, session.enrollments?.length, "slots:", slots);
        return {
          ...session,
          slots: slots >= 0 ? slots : 0
        };
      });
      
      setSessions(sessionsWithSlots);
      console.log("✅ Sessões atualizadas:", sessionsWithSlots);
    } catch (error) {
      console.error("Erro ao recarregar sessões:", error);
    } finally {
      setLoading(false);
    }
  };

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
                onEnrollSuccess={handleEnrollSuccess}
              />
            ))}     
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default Sessions;

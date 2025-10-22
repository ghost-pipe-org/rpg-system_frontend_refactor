import RootLayout from "@/components/layout/RootLayout";
import { SessionCard, SessionSkeleton } from "@/components/custom/SessionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import type { Session } from "@/services/sessionServices/session.types";
import { getMyEmittedSessions, getMyEnrolledSessions } from "@/services/sessionServices/session.services";

const Profile = () => {
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [emittedSessions, setEmittedSessions] = useState<Session[]>([]);
  const [enrolledSessions, setEnrolledSessions] = useState<Session[]>([]);
  const [loadingEmitted, setLoadingEmitted] = useState(true);
  const [loadingEnrolled, setLoadingEnrolled] = useState(true);

  const toggleExpand = (sessionId: string) => {
    setExpandedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchEmittedSessions = async () => {
      try {
        const response = await getMyEmittedSessions();
        console.log("Emitted Sessions - Full Response:", response);
        
        if (isMounted) {
          // Tenta diferentes formatos de resposta
          let sessionsData = [];
          if (Array.isArray(response)) {
            sessionsData = response;
          } else if (response.emittedSessions && Array.isArray(response.emittedSessions)) {
            sessionsData = response.emittedSessions;
          } else if (response.sessions && Array.isArray(response.sessions)) {
            sessionsData = response.sessions;
          } else if (response.data && Array.isArray(response.data)) {
            sessionsData = response.data;
          } else if (response.data?.sessions && Array.isArray(response.data.sessions)) {
            sessionsData = response.data.sessions;
          }
          
          console.log("Emitted Sessions - Processed Data:", sessionsData);
          setEmittedSessions(sessionsData);
        }
      } catch (error) {
        console.error("Erro ao buscar sessões emitidas:", error);
        
        if (isMounted) {
          setEmittedSessions([]);
        }
      } finally {
        if (isMounted) {
          setLoadingEmitted(false);
        }
      }
    };

    const fetchEnrolledSessions = async () => {
      try {
        const response = await getMyEnrolledSessions();
        console.log("Enrolled Sessions - Full Response:", response);
        
        if (isMounted) {
          // Tenta diferentes formatos de resposta
          let sessionsData = [];
          if (Array.isArray(response)) {
            sessionsData = response;
          } else if (response.enrolledSessions && Array.isArray(response.enrolledSessions)) {
            sessionsData = response.enrolledSessions;
          } else if (response.sessions && Array.isArray(response.sessions)) {
            sessionsData = response.sessions;
          } else if (response.data && Array.isArray(response.data)) {
            sessionsData = response.data;
          } else if (response.data?.sessions && Array.isArray(response.data.sessions)) {
            sessionsData = response.data.sessions;
          }
          
          console.log("Enrolled Sessions - Processed Data:", sessionsData);
          setEnrolledSessions(sessionsData);
        }
      } catch (error) {
        console.error("Erro ao buscar sessões inscritas:", error);
        
        if (isMounted) {
          setEnrolledSessions([]);
        }
      } finally {
        if (isMounted) {
          setLoadingEnrolled(false);
        }
      }
    };

    fetchEmittedSessions();
    fetchEnrolledSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RootLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Minhas Mesas
        </h1>

        <Tabs defaultValue="emitted" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emitted">Mesas Emitidas</TabsTrigger>
            <TabsTrigger value="enrolled">Mesas Inscritas</TabsTrigger>
          </TabsList>

          <TabsContent value="emitted" className="mt-6">
            {loadingEmitted && <SessionSkeleton />}

            {!loadingEmitted && emittedSessions.length === 0 && (
              <p className="text-muted-foreground text-center">
                Você ainda não criou nenhuma mesa.
              </p>
            )}

            {!loadingEmitted && emittedSessions.length > 0 && (
              <div>
                {emittedSessions.map((session) => (
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
          </TabsContent>

          <TabsContent value="enrolled" className="mt-6">
            {loadingEnrolled && <SessionSkeleton />}

            {!loadingEnrolled && enrolledSessions.length === 0 && (
              <p className="text-muted-foreground text-center">
                Você ainda não está inscrito em nenhuma mesa.
              </p>
            )}

            {!loadingEnrolled && enrolledSessions.length > 0 && (
              <div>
                {enrolledSessions.map((session) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </RootLayout>
  );
};

export default Profile;

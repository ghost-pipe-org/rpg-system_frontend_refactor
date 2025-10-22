import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Session } from "@/services/sessionServices/session.types";

export function SessionSkeleton() {
  return (
    <Card className="mb-6 bg-background border-1 border-accent">
      <CardHeader className="flex flex-row items-start gap-4 pb-3 font-pixelsans">
        <Skeleton className="w-16 h-16 rounded animate-pulse" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-8 w-3/4 animate-pulse" />
          <Skeleton className="h-4 w-1/2 animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full animate-pulse" />
          <Skeleton className="h-4 w-full animate-pulse" />
          <Skeleton className="h-4 w-2/3 animate-pulse" />
        </div>
        <Skeleton className="h-10 w-full animate-pulse" />
      </CardContent>
    </Card>
  );
}

interface SessionCardProps {
  session: Session;
  isExpanded: boolean;
  onToggleExpand: (sessionId: string) => void;
}

export function SessionCard({
  session,
  isExpanded,
  onToggleExpand,
}: SessionCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="mb-6 bg-background border-1 border-accent">
      <CardHeader className="flex flex-row items-start gap-4 pb-3 font-pixelsans text-foreground">
        {session.iconUrl && (
          <img
            src={session.iconUrl}
            alt={session.system}
            className="w-16 h-16"
          />
        )}

        <div className="space-y-1">
          <CardTitle className="text-2xl">{session.title}</CardTitle>
          <p className="text-sm text-muted-foreground font-prompt">
            {session.system} | {formatDate(session.possibledate[0])} |{" "}
            {session.period}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="leading-relaxed text-foreground">{session.description}</p>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => session.id && onToggleExpand(session.id)}
            className="text text-accent-foreground font-semibold cursor-pointer py-2 uppercase w-full"
          >
            <span className="text-sm">Saiba</span>
            <span>{isExpanded ? "−" : "+"}</span>
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Separator />

            <div className="space-y-3 text-foreground">
              <p>
                <strong className="font-mono">Mestre:</strong> {session.master}
              </p>
              <p>
                <strong className="font-mono">Sala:</strong> {session.room}
              </p>
              <p>
                <strong className="font-mono">Vagas disponíveis:</strong>
                <Badge
                  variant={session.slots > 0 ? "secondary" : "destructive"}
                  className="ml-2"
                >
                  {session.slots}
                </Badge>
              </p>
              <div className="space-y-1">
                <p>
                  <strong className="font-mono">
                    Requisitos de participação:
                  </strong>{" "}
                  {session.requirements}
                </p>
              </div>
            </div>

            <Button
              className="w-full mt-2 uppercase"
              disabled={session.slots === 0}
            >
              {session.slots > 0 ? "Inscreva-se" : "Sem Vagas Disponíveis"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Session } from "@/services/sessionServices/session.types";
import { enrollInSession } from "@/services/sessionServices/session.services";
import { toast } from "sonner";
import { useState } from "react";


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
  onEnrollSuccess?: () => void;
}

const systemLogos: Record<string, string> = {
  'D&D 5e': '/src/assets/icons/d&d-logo.svg',
  'Vampiro: A Máscara': '/src/assets/icons/vampiro-logo.png',
  'Kaos em Nova Patos': '/logos/kaos.png',
  'Ordem Paranormal': '/src/assets/icons/ordem-paranormal-logo.svg',
  'Tormenta20': '/src/assets/icons/t20-logo.png',
  'Pathfinder 2e': '/src/assets/icons/pathfinder-logo.png',
  'Call of Cthulhu': '/src/assets/icons/coc-logo.png',
  'Outros': '/src/assets/icons/logo.png'
};

export function SessionCard({
  session,
  isExpanded,
  onToggleExpand,
  onEnrollSuccess,
}: SessionCardProps) {
  const [enrolling, setEnrolling] = useState(false);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEnroll = async () => {
    if (!session.id) {
      toast.error("ID da sessão não encontrado");
      return;
    }

    try {
      setEnrolling(true);
      await enrollInSession(session.id);
      toast.success("Inscrição realizada com sucesso!");
      
      // Chama callback para atualizar a lista
      if (onEnrollSuccess) {
        onEnrollSuccess();
      }
    } catch (error: unknown) {
      console.error("Erro ao se inscrever:", error);
      
      let errorMessage = "Erro ao realizar inscrição";
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      
      toast.error(errorMessage);
    } finally {
      setEnrolling(false);
    }
  };

  const systemLogo = systemLogos[session.system] || systemLogos['Outros'];

  return (
    <Card className="mb-6 bg-background border-1 border-accent">
      <CardHeader className="flex flex-row items-start gap-4 pb-3 font-pixelsans text-foreground">
      <img
        src={systemLogo}
        alt={session.system}
        className="w-16 h-16 object-contain"
        onError={(e) => {
          e.currentTarget.src = systemLogos['Outros'];
        }}
      />

        <div className="space-y-1">
          <CardTitle className="text-2xl">{session.title}</CardTitle>
          <p className="text-sm text-muted-foreground font-prompt">
            {session.system} | {session.createdAt && formatDate(session.createdAt)} |{" "}
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
                <strong className="font-mono">Mestre:</strong> {session.master?.name || 'Não informado'}
              </p>
              <p>
                <strong className="font-mono">Sala:</strong> {session.room || 'Não informado'}
              </p>
              <p>
                <strong className="font-mono">Vagas disponíveis:</strong>
                <Badge
                  variant={(session.slots || 0) > 0 ? "secondary" : "destructive"}
                  className="ml-2"
                >
                  {session.slots || 0}
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
              disabled={(session.slots || 0) === 0 || enrolling}
              onClick={handleEnroll}
            >
              {enrolling 
                ? "Inscrevendo..." 
                : (session.slots || 0) > 0 
                  ? "Inscreva-se" 
                  : "Sem Vagas Disponíveis"
              }
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

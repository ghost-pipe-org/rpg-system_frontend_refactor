import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Session } from "@/pages/Sessions";

interface SessionCardProps {
  session: Session;
  isExpanded: boolean;
  onToggleExpand: (sessionId: string) => void;
}

export function SessionCard({ session, isExpanded, onToggleExpand }: SessionCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        {session.iconUrl && (
          <img 
            src={session.iconUrl} 
            alt={session.system}
            className="w-16 h-16" 
          />
        )}
        
        <div className="space-y-1">
          <CardTitle className="text-xl">{session.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {session.system} | {formatDate(session.possibledate[0])} | {session.period}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">
          {session.description}
        </p>

        <Separator />

        <div className="flex justify-between items-center">
          <button
            onClick={() => onToggleExpand(session.id)}
            className="text-lg font-semibold hover:underline cursor-pointer py-2"
          >
            Saiba mais {isExpanded ? "−" : "+"}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Separator />
            
            <div className="space-y-3 text-sm">
              <p><strong>Mestre:</strong> {session.master}</p>
              <p><strong>Sala:</strong> {session.room}</p>
              <p>
                <strong>Vagas disponíveis:</strong> 
                <Badge 
                  variant={session.slots > 0 ? "default" : "secondary"} 
                  className="ml-2"
                >
                  {session.slots}
                </Badge>
              </p>
              <div className="space-y-1">
                <p><strong>Requisitos de participação:</strong> {session.requirements}</p>
              </div>
            </div>

            <Button 
              className="w-full mt-2" 
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
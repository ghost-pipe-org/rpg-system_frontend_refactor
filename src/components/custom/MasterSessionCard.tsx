import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Session } from "@/services/sessionServices/session.types";
import { formatDateBR } from "@/utils/formatDate";
import { Users, Mail, Phone } from "lucide-react";

interface MasterSessionCardProps {
  session: Session;
  isExpanded: boolean;
  onToggleExpand: (sessionId: string) => void;
}

const systemLogos: Record<string, string> = {
  'D&D 5e': '/icons/d&d-logo.svg',
  'Vampiro: A Máscara': '/icons/vampiro-logo.png',
  'Kaos em Nova Patos': '/logos/kaos.png',
  'Ordem Paranormal': '/icons/ordem-paranormal-logo.svg',
  'Tormenta20': '/icons/t20-logo.png',
  'Pathfinder 2e': '/icons/pathfinder-logo.png',
  'Call of Cthulhu': '/icons/coc-logo.png',
  'Outros': '/icons/logo.png'
};

export function MasterSessionCard({
  session,
  isExpanded,
  onToggleExpand,
}: MasterSessionCardProps) {
  const systemLogo = systemLogos[session.system] || systemLogos['Outros'];
  const enrolledPlayers = session.enrollments?.filter(e => e.user) || [];
  const enrolledCount = enrolledPlayers.length;
  const availableSlots = session.maxPlayers - enrolledCount;

  return (
    <Card className="mb-6 bg-background border-2 border-primary/20 shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 pb-3 font-pixelsans text-foreground">
        <img
          src={systemLogo}
          alt={session.system}
          className="w-16 h-16 object-contain"
          onError={(e) => {
            e.currentTarget.src = systemLogos['Outros'];
          }}
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{session.title}</CardTitle>
            <Badge 
              variant={availableSlots > 0 ? "secondary" : "destructive"}
              className="ml-2"
            >
              {enrolledCount}/{session.maxPlayers} jogadores
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground font-prompt">
            {session.system} | {session.approvedDate ? formatDateBR(session.approvedDate) : (session.createdAt && formatDateBR(session.createdAt))} |{" "}
            {session.period}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="leading-relaxed text-foreground">{session.description}</p>

        {/* Resumo de inscrições */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>
            {enrolledCount === 0 && "Nenhum jogador inscrito ainda"}
            {enrolledCount === 1 && "1 jogador inscrito"}
            {enrolledCount > 1 && `${enrolledCount} jogadores inscritos`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => session.id && onToggleExpand(session.id)}
            className="text text-accent-foreground font-semibold cursor-pointer py-2 uppercase w-full"
          >
            <span className="text-sm">{isExpanded ? "Ocultar Detalhes" : "Ver Detalhes"}</span>
            <span>{isExpanded ? "−" : "+"}</span>
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Separator />

            <div className="space-y-3 text-foreground">
              <p>
                <strong className="font-mono">Sala:</strong> {session.room || 'Não informado'}
              </p>
              <p>
                <strong className="font-mono">Local:</strong> {session.location || 'Não informado'}
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

            <Separator />

            {/* Lista de jogadores inscritos */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Jogadores Inscritos
              </h3>

              {enrolledPlayers.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  Nenhum jogador inscrito ainda.
                </p>
              ) : (
                <div className="space-y-3">
                  {enrolledPlayers.map((enrollment) => (
                    <Card key={enrollment.id} className="bg-muted/50 border-muted">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-base">
                            {enrollment.user?.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {enrollment.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a 
                              href={`mailto:${enrollment.user?.email}`}
                              className="hover:text-primary hover:underline"
                            >
                              {enrollment.user?.email}
                            </a>
                          </div>

                          {enrollment.user?.phoneNumber && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              <a 
                                href={`tel:${enrollment.user.phoneNumber}`}
                                className="hover:text-primary hover:underline"
                              >
                                {enrollment.user.phoneNumber}
                              </a>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Inscrito em: {formatDateBR(enrollment.createdAt)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

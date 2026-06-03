import { RootLayout } from "../components/layout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { EventBanner } from "@/components/custom/EventBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ROUTES } from "@/routes/routes";
import { ChevronRight, ExternalLink } from "lucide-react";

const Home = () => {
  useDocumentTitle();

  return (
    <RootLayout>
      <div className="w-full max-w-4xl mx-auto px-4 pb-12 flex flex-col items-center">

        {/* Banner do Evento Arraiá */}
        <EventBanner />

        {/* Sinopse do Evento */}
        <div className="w-full max-w-3xl mt-4 mb-10">
          <div className="relative p-6 sm:p-8 rounded-2xl overflow-hidden bg-[#0a1128]/50 border border-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.05)] backdrop-blur-sm">
            {/* Elemento decorativo */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent" />

            <p className="text-white/80 text-lg leading-relaxed mb-6 font-medium">
              Vem aí a edição especial do <strong className="text-cyan-400">Tópicos Especiais em Aventuras - Arraiá</strong>, onde o clima junino ganha uma nova dimensão.
              Em uma celebração que mistura a energia das festas de São João com a criatividade da ficção científica, convidamos
              você para uma experiência única entre tradição e tecnologia.
            </p>

            <div className="bg-cyan-950/30 p-4 rounded-xl border border-cyan-800/30 mb-6">
              <p className="text-cyan-100/90 text-md leading-relaxed italic text-center">
                "Prepare-se para atravessar portais, lançar os dados e criar novas histórias em um universo onde fogueiras
                iluminam e estrelas dançam ao som do forró."
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-cyan-500/60 font-mono text-sm tracking-widest uppercase">
              <span>Mais informações em breve</span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
          <Link to={ROUTES.SESSIONS} className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto uppercase font-bold px-8 py-6 text-sm rounded-xl gap-2 transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                boxShadow: "0 4px 20px rgba(6, 182, 212, 0.3)",
                border: "none",
                color: "white",
              }}
            >
              Mesas de RPG <ChevronRight size={18} />
            </Button>
          </Link>

          {/* Placeholder para Competição de Desenho */}
          <Button
            variant="outline"
            className="w-full sm:w-auto uppercase font-bold px-8 py-6 text-sm rounded-xl gap-2 border-cyan-700 text-cyan-500 hover:bg-cyan-950/30 hover:text-cyan-400"
            disabled
            title="Link em breve!"
          >
            Competição de Desenho (Em breve...) <ExternalLink size={18} />
          </Button>
        </div>

      </div>
    </RootLayout>
  );
};

export default Home;

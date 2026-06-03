import { Calendar, MapPin, Clock, Dice6, PenTool, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random(),
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.o += s.speed * 0.02;
        if (s.o > 1) s.o = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Ciano/Azul claro para combinar com a identidade
        ctx.fillStyle = `rgba(135,206,235,${0.2 + Math.abs(Math.sin(s.o)) * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function CyberGrid() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-10" 
      style={{
        backgroundImage: "linear-gradient(to right, rgba(0,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)"
      }}
    />
  );
}

export function EventBanner() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-2xl"
      style={{
        background: "linear-gradient(180deg, #050a15 0%, #0a1128 100%)",
        border: "1px solid rgba(0, 255, 255, 0.2)",
        boxShadow: "0 0 40px rgba(0, 200, 255, 0.15), inset 0 0 20px rgba(0, 200, 255, 0.05)",
      }}
    >
      <StarField />
      <CyberGrid />

      {/* Brilho Central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,180,255,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 flex flex-col items-center text-center gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
            <Terminal size={14} />
            <span>Tópicos Especiais em Aventuras</span>
            <Terminal size={14} />
          </div>
        </div>

        {/* Main Title Group */}
        <div className="flex flex-col items-center relative">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50 -ml-4 -mt-2" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-50 -mr-4 -mt-2" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-50 -ml-4 -mb-2" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-50 -mr-4 -mb-2" />

          <h1 
            className="text-6xl sm:text-8xl font-black tracking-wider uppercase mb-2 text-white"
            style={{ 
              textShadow: "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
              fontFamily: "var(--font-heading, system-ui, sans-serif)"
            }}
          >
            ARRAIÁ
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-cyan-300 font-bold tracking-[0.2em] text-sm sm:text-base uppercase">
              O Sertão Também é Futuro
            </p>
            <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>

        {/* Date & Info Block */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-2">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-black text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>13</span>
            <div className="flex flex-col items-start text-left">
              <span className="text-cyan-400 font-bold tracking-widest text-lg leading-tight uppercase">Junho</span>
              <div className="flex items-center gap-1.5 text-white/80 text-xs font-mono">
                <Clock size={12} className="text-cyan-500" /> DAS 13H ÀS 18H
              </div>
              <div className="flex items-center gap-1.5 text-white/80 text-xs font-mono mt-0.5">
                <MapPin size={12} className="text-cyan-500" /> UEPB - CAMPUS VII
              </div>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-2 relative">
           {/* Center connecting line */}
           <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-cyan-900/50 -z-10" />

           <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#0a1931] border border-cyan-800/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
             <Dice6 className="text-cyan-400" size={20} />
             <span className="text-white font-bold tracking-wider text-sm">MESAS DE RPG</span>
           </div>

           <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#0a1931] border border-cyan-800/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
             <PenTool className="text-cyan-400" size={20} />
             <span className="text-white font-bold tracking-wider text-sm">COMPETIÇÃO DE DESENHO</span>
           </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center gap-2 text-white/40 text-xs font-mono mt-4">
          <Sparkles size={12} className="text-cyan-500/50" />
          <span>ABERTO AO PÚBLICO GERAL | EVENTO GRATUITO | @rpg.uepbpatos</span>
          <Sparkles size={12} className="text-cyan-500/50" />
        </div>

      </div>
    </div>
  );
}

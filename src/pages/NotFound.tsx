import { useLocation } from "react-router";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link as RouterLink } from "react-router";
import { Home } from "lucide-react";
import { ROUTES } from "../routes/routes.constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erro 404 - Usuário tentou acessar uma rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
<div
      className="flex flex-col w-full min-h-screen max-w-screen bg-gradient-to-b from-background to-primary bg-fixed bg-cover bg-center items-center justify-center"
      style={{
        backgroundImage:
          "radial-gradient(var(--chart-3), var(--chart-4)), url('src/assets/images/bg_art.png')",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl mb-4">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-2">
            Página não encontrada...
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-prompt mb-8">
            Oops! Parece que a página que você está procurando não existe ou foi
            movida.
          </p>
        </div>

        <RouterLink to={ROUTES.HOME}>
          <Button variant="secondary" className="hover:cursor-pointer">
            <Home className="w-4 h-4" />
            Página inicial
          </Button>
        </RouterLink>
      </div>
    </div>
  );
};

export default NotFound;
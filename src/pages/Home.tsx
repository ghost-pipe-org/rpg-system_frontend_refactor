import { RootLayout } from "../components/layout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {
  // Exemplo de uso do hook com título personalizado
  // Se não passar parâmetro, usará o título da configuração da rota
  useDocumentTitle();

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Bem-vindo ao Ghost Pipe RPG
        </h1>
        <p className="text-muted-foreground">
          Sistema de gerenciamento de sessões de RPG
        </p>
      </div>
    </RootLayout>
  );
};

export default Home;

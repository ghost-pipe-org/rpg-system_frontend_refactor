import { RootLayout } from "../components/layout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle();

  return (
    <RootLayout>
        <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
          Bem-vindo ao Interfaces Narrativas
        </h1>
        <p className="text-muted-foreground text-center">
          Sistema de gerenciamento de sessões de RPG
        </p>
    </RootLayout>
  );
};

export default Home;

import RootLayout from "@/components/layout/RootLayout";
import { Button } from "@/components/ui/button";

const Sessions = () => {
  return (
    <div>
      <RootLayout>
      <h1>Sessões</h1>
      <Button onClick={() => console.log("Teste")}>Teste</Button>
      </RootLayout>
    </div>
  );
};

export default Sessions;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import RootLayout from "../components/layout/RootLayout";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schemas/auth.schemas";
import { useAppNavigation } from "../hooks/useAuth";
import { ROUTES } from "../routes/routes";

export default function LogIn() {
  const { goToHome } = useAppNavigation();
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormData) {
    try {
      await login(values);
      toast.success("Login realizado com sucesso!");
      goToHome();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
      toast.error(errorMessage);
    }
  }

  return (
    <RootLayout>
      <div className="mx-auto max-w-md w-full">
        <h1 className="w-full text-center text-3xl text-foreground mb-4">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:px-0 px-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Insira seu email"
                      className="font-prompt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Insira sua senha"
                      className="font-prompt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormDescription className="flex justify-center gap-1 font-prompt">
              Não possuí uma conta?
              <Link to={ROUTES.REGISTER} className="text-accent hover:text-primary no-underline hover:cursor-pointer">
                Criar uma conta.
              </Link>
            </FormDescription>

            <Button type="submit" className="w-full font-prompt">
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </RootLayout>
  );
}

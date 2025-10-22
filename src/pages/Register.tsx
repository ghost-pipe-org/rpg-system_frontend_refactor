import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Link } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import { createUser } from "../services";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schemas";
import { useAppNavigation } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes/routes";
import { formatPhoneNumber } from "../lib/utils";

export default function SingUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { goToLogin, goToHome } = useAppNavigation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      toast.info("Você já está logado! Redirecionando...");
      goToHome();
    }
  }, [isAuthenticated, goToHome]);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      masterConfirm: false,
      registrationNumber: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (isAuthenticated) {
    return (
      <RootLayout>
        <div className="mx-auto max-w-md w-full text-center">
          <h1 className="text-2xl text-foreground mb-4">Redirecionando...</h1>
          <p className="text-muted-foreground">
            Você já está logado. Redirecionando para a página inicial.
          </p>
        </div>
      </RootLayout>
    );
  }

  async function onSubmit(values: RegisterFormData) {
    setIsLoading(true);
    try {
      const userData = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        enrollment: values.registrationNumber || undefined,
        phoneNumber: values.phone,
        masterConfirm: values.masterConfirm,
      };

      await createUser(userData);
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      goToLogin();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar conta";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RootLayout>
      <div className="mx-auto max-w-md w-full">
        <h1 className="w-full text-center text-3xl text-foreground mb-4 font-pixelsans">
          Crie sua conta
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:px-0 px-6"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome completo"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
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
              name="masterConfirm"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md p-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1">
                    <Label className="font-prompt">Desejo mestrar</Label>
                    <p className="text-muted-foreground text-sm font-prompt">
                      Ao selecionar esta opção, você confirma que{" "}
                      <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                        deseja emitir mesas de RPG.
                      </span>
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">
                    Número de Matrícula (Obrigatório para mestres)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sua matrícula"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 99999-9999"
                      className="font-prompt"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
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
                      placeholder="Digite sua senha"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-prompt">Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha novamente"
                      className="font-prompt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormDescription className="flex justify-center gap-1 font-prompt">
              Já tem uma conta?
              <Link
                to={ROUTES.LOGIN}
                className="text-accent hover:text-primary no-underline hover:cursor-pointer"
              >
                Faça login
              </Link>
            </FormDescription>

            <Button
              type="submit"
              className="w-full font-prompt uppercase"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </Form>
      </div>
    </RootLayout>
  );
}

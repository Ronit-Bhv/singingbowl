import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-background/40 border border-border/50 rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Log in to your account to continue.
            </p>
          </div>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

export type AuthModalView = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  view: AuthModalView;
  onOpenChange: (open: boolean) => void;
  onViewChange: (view: AuthModalView) => void;
};

export default function AuthModal({
  open,
  view,
  onOpenChange,
  onViewChange,
}: AuthModalProps) {
  const router = useRouter();
  const [formKey, setFormKey] = React.useState(0);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFormKey((k) => k + 1);
      setFormError(null);
    }
    onOpenChange(nextOpen);
  };

  React.useEffect(() => {
    if (open) setFormError(null);
  }, [view, open]);

  const afterSuccess = React.useCallback(() => {
    setFormKey((k) => k + 1);
    setFormError(null);
    onOpenChange(false);
    router.push("/studio");
  }, [onOpenChange, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    setIsSubmitting(true);
    setFormError(null);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setFormError(error.message ?? "Could not log in. Try again.");
      return;
    }

    afterSuccess();
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    setIsSubmitting(true);
    setFormError(null);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setFormError(error.message ?? "Could not create account. Try again.");
      return;
    }

    afterSuccess();
  };

  const title = view === "login" ? "Log in" : "Create your account";
  const subtitle =
    view === "login"
      ? "Welcome back. Enter your details to continue."
      : "Sign up to save styles and access Studio.";

  const switchHint =
    view === "login" ? "Have no account?" : "Already have an account?";
  const switchAction = view === "login" ? "Sign up" : "Log in";
  const nextView: AuthModalView = view === "login" ? "signup" : "login";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="bg-black/40 supports-backdrop-filter:backdrop-blur-sm"
        className="gap-0 p-0 sm:max-w-md"
      >
        <div className="p-5 sm:p-6">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {formError ? (
              <p
                className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                role="alert"
              >
                {formError}
              </p>
            ) : null}

            <div key={formKey}>
              {view === "signup" ? (
                <SignupForm
                  disabled={isSubmitting}
                  onSubmit={handleSignup}
                />
              ) : (
                <LoginForm disabled={isSubmitting} onSubmit={handleLogin} />
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{switchHint}</span>
            <button
              type="button"
              className="font-medium text-foreground underline underline-offset-4"
              disabled={isSubmitting}
              onClick={() => onViewChange(nextView)}
            >
              {switchAction}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldLabel({
  label,
  htmlFor,
}: {
  label: string;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {label}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-60",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function LoginForm({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <FieldLabel htmlFor="login-email" label="Email" />
        <TextInput
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="login-password" label="Password" />
        <TextInput
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          disabled={disabled}
        />
      </div>

      <Button type="submit" className="w-full" disabled={disabled}>
        {disabled ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}

function SignupForm({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <FieldLabel htmlFor="signup-name" label="Name" />
        <TextInput
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="signup-email" label="Email" />
        <TextInput
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="signup-password" label="Password" />
        <TextInput
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          required
          disabled={disabled}
        />
      </div>

      <Button type="submit" className="w-full" disabled={disabled}>
        {disabled ? "Creating account…" : "Sign up"}
      </Button>
    </form>
  );
}

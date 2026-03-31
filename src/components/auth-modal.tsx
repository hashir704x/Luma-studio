"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type AuthModalView = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  view: AuthModalView;
  onOpenChange: (open: boolean) => void;
  onViewChange: (view: AuthModalView) => void;
};

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.653 32.657 29.194 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.88 19.51C14.66 15.108 19.0 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.151 26.716 36 24 36c-5.173 0-9.62-3.321-11.284-7.946l-6.525 5.026C9.505 39.556 16.227 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.06 12.06 0 0 1-4.084 5.57l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
      />
    </svg>
  );
}

export default function AuthModal({
  open,
  view,
  onOpenChange,
  onViewChange,
}: AuthModalProps) {
  const [formKey, setFormKey] = React.useState(0);

  const closeAndReset = React.useCallback(() => {
    setFormKey((k) => k + 1);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      // Clear typed input when the dialog closes (X, overlay click, or Esc).
      setFormKey((k) => k + 1);
    }
    onOpenChange(nextOpen);
  };

  const title = view === "login" ? "Log in" : "Create your account";
  const subtitle =
    view === "login"
      ? "Welcome back. Enter your details to continue."
      : "Sign up to save styles and access Studio.";

  const switchHint =
    view === "login" ? "Don’t have an account?" : "Already have an account?";
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
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center gap-2"
              onClick={() => {
                // UI-only for now; wire OAuth later.
              }}
            >
              <GoogleIcon className="h-4 w-4" />
              Continue with Google
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <div key={formKey}>
              {view === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{switchHint}</span>
            <button
              type="button"
              className="font-medium text-foreground underline underline-offset-4"
              onClick={() => onViewChange(nextView)}
            >
              {switchAction}
            </button>
          </div>

          {/* Optional: when you later add "submit success", call this to close+reset */}
          <button type="button" className="sr-only" onClick={closeAndReset}>
            Close
          </button>
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
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function LoginForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // UI-only for now; wire login later.
      }}
    >
      <div className="space-y-2">
        <FieldLabel htmlFor="login-email" label="Email" />
        <TextInput
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
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
        />
      </div>

      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  );
}

function SignupForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // UI-only for now; wire signup later.
      }}
    >
      <div className="space-y-2">
        <FieldLabel htmlFor="signup-name" label="Name" />
        <TextInput
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
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
        />
      </div>

      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  );
}

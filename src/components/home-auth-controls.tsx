"use client";

import * as React from "react";
import Link from "next/link";

import AuthModal, { type AuthModalView } from "@/components/auth-modal";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type HomeAuthControlsProps = {
  variant: "nav" | "cta";
};

export default function HomeAuthControls({ variant }: HomeAuthControlsProps) {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<AuthModalView>("login");

  const isSignedIn = Boolean(session);

  const openLogin = () => {
    setView("login");
    setOpen(true);
  };

  const openSignup = () => {
    setView("signup");
    setOpen(true);
  };

  if (isPending) {
    // Keep layout stable while session is being resolved.
    return (
      <div className={variant === "nav" ? "flex items-center gap-2" : ""}>
        <div className="h-9 w-20 rounded-md bg-muted/40" />
        <div className="h-9 w-24 rounded-md bg-muted/40" />
      </div>
    );
  }

  return (
    <>
      {isSignedIn ? (
        <Button
          asChild
          variant={variant === "nav" ? "outline" : "default"}
          size={variant === "nav" ? "sm" : "default"}
          className={
            variant === "nav"
              ? "home-btn-studio-outline"
              : "home-btn-hero-primary"
          }
        >
          <Link href="/studio">
            Open Studio
          </Link>
        </Button>
      ) : (
        <div
          className={
            variant === "nav"
              ? "flex flex-wrap items-center justify-end gap-1.5 sm:gap-2"
              : "flex flex-wrap items-center gap-2"
          }
        >
          <Button
            type="button"
            variant={variant === "nav" ? "outline" : "outline"}
            size={variant === "nav" ? "sm" : "default"}
            className={variant === "nav" ? "home-btn-signin" : ""}
            onClick={openLogin}
          >
            Login
          </Button>

          <Button
            type="button"
            size={variant === "nav" ? "sm" : "default"}
            className={
              variant === "nav"
                ? "home-btn-nav-primary"
                : "home-btn-hero-primary"
            }
            onClick={openSignup}
          >
            Signup
          </Button>
        </div>
      )}

      <AuthModal
        open={open}
        view={view}
        onOpenChange={setOpen}
        onViewChange={setView}
      />
    </>
  );
}

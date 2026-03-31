"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import AuthModal, { type AuthModalView } from "@/components/auth-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { CENTER_NAV_LINKS } from "@/lib/constants";

export default function HomeMobileNav() {
  const { data: session, isPending } = authClient.useSession();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authView, setAuthView] = React.useState<AuthModalView>("login");

  const isSignedIn = Boolean(session);

  const openAuth = (view: AuthModalView) => {
    setAuthView(view);
    setAuthOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-border/55 bg-background/25 backdrop-blur-sm hover:bg-background/40 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="h-4 w-4" aria-hidden />
        </Button>

        <DialogContent
          overlayClassName="bg-black/40 supports-backdrop-filter:backdrop-blur-sm"
          className="top-4 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 translate-y-0 rounded-2xl p-0"
        >
          <div className="p-5">
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
              <DialogDescription>Quick navigation and account actions.</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-1">
              {CENTER_NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {isPending ? (
                <>
                  <div className="h-10 rounded-md bg-muted/40" />
                  <div className="h-10 rounded-md bg-muted/40" />
                </>
              ) : isSignedIn ? (
                <Button asChild className="col-span-2" onClick={() => setMenuOpen(false)}>
                  <Link href="/studio" prefetch={false}>
                    Open Studio
                  </Link>
                </Button>
              ) : (
                <>
                  <Button type="button" variant="outline" onClick={() => openAuth("login")}>
                    Login
                  </Button>
                  <Button type="button" onClick={() => openAuth("signup")}>
                    Signup
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        open={authOpen}
        view={authView}
        onOpenChange={setAuthOpen}
        onViewChange={setAuthView}
      />
    </>
  );
}


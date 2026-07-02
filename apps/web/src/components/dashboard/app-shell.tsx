"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Upload,
  Video,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Videos", href: "/videos", icon: Video },
  { label: "Upload CSV", href: "#", icon: Upload },
  { label: "Campaigns", href: "#", icon: BarChart3 },
  { label: "Reports", href: "#", icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-200 bg-white/90 px-4 py-5 backdrop-blur lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
            <Video className="size-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-5">TikTok Ads Co-Pilot</div>
            <div className="text-xs text-zinc-500">Creator ads decisions</div>
          </div>
        </Link>

        <Separator className="my-5" />

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = item.href !== "#" && pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                  active && "bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white"
                )}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <Video className="size-4" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-semibold">TikTok Ads Co-Pilot</div>
              <div className="text-xs text-zinc-500">Dashboard</div>
            </div>
          </Link>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const active = item.href !== "#" && pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-600",
                    active && "border-zinc-950 bg-zinc-950 text-white"
                  )}
                >
                  <item.icon className="size-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

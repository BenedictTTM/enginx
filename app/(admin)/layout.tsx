"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, LayoutDashboard, Users, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Attendees", href: "/dashboard/attendees", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#071a35] text-white flex font-varela-round">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c2546] border-r border-[#163b6b]/50 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#163b6b]/50 bg-[#071a35]/20">
          <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Admin Portal
          </span>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/15 text-[#8dbef8] border border-blue-500/25 shadow-[0_0_12px_rgba(141,190,248,0.06)]"
                    : "text-neutral-300 hover:bg-[#163b6b]/40 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#163b6b]/50">
          <button
            onClick={() => {
              document.cookie = "enginx_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              router.push("/login");
            }}
            className="flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-[#0c2546] border-b border-[#163b6b]/50 flex items-center px-4 md:hidden">
          <span className="text-lg font-bold tracking-wide text-white">Admin Portal</span>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#071a35]">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { LayoutDashboard, Users2, LineChart, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { logout } from "@/utils/services/logoutService";

export function Sidebar() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = async () => {
    try {
      if (!token) {
        throw new Error("User not authenticated.");
      }

      await logout(token)
      router.push("/login");
    } catch (error:any) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#12151c] p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ProfitX</h1>
      </div>
      <nav className="space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/community"
          className="flex items-center space-x-3 rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800"
        >
          <Users2 className="h-5 w-5" />
          <span>Community</span>
        </Link>
        <Link
          href="/transactions"
          className="flex items-center space-x-3 rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800"
        >
          <LineChart className="h-5 w-5" />
          <span>Transactions</span>
        </Link>
      </nav>
      <div className="mt-auto space-y-1">
        <Link
          href="/settings"
          className="flex items-center space-x-3 rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 px-4 py-2 text-gray-400 hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

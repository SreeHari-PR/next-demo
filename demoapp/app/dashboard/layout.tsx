"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "@/utils/redux/authslice";
import { selectUser } from "@/utils/redux/authslice";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar, MobileSidebar } from "@/components/overview/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/utils/redux/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector(selectUser);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated=useSelector(selectIsAuthenticated)
  if (!isAuthenticated) {
    router.push("/login");
    return null; 
  }


  const handleLogout = async () => {
    try {
      if (!token) {
        throw new Error("User not authenticated.");
      }

      await logout(token)
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d24]">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 lg:block">
        <Sidebar />
      </aside>
      <main className="bg-gray-800 lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#1a1d24] px-4 lg:px-8">
          <div className="flex items-center">
            <MobileSidebar />
            <h2 className="text-lg font-semibold text-white ml-4">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-400"
                >
                  <span className="hidden text-sm text-white sm:inline-block">
                    {user?.first_name || "Guest"}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar-1.avif" alt="User Avatar" />
                    <AvatarFallback>UH</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/dashboard/profile" passHref>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

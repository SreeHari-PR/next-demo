import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export function LoginLayout() {
  return (
    <div className="h-screen w-full bg-gray-700 flex items-center content-center justify-center">
        <div className="bg-slate-900/70 backdrop-blur-sm md:rounded-lg p-8 md:max-w-[400px] md:h-[600px] h-full w-full">
          <div className="space-y-3 text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-wide text-white">
              ProfiteX
            </h1>
            <p className="text-slate-400 text-sm">
              Please login to continue
            </p>
          </div>
          <LoginForm />
          <div className="space-y-3 text-center text-sm pt-2 mt-10">
        <div className="text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-400">
            Create account
          </Link>
        </div>
        <div>
          <Link href="/forgot-password" className="text-blue-500 hover:text-blue-400">
            Forgot Password
          </Link>
        </div>
        </div>
    </div>
    </div>
  )
}


import { SignupForm } from "@/components/auth/signup-form"

export function SignupLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-700 flex items-center justify-center p-4">
      <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-6 sm:p-8 max-w-[400px] sm:max-w-[500px] md:max-w-[600px]  lg:max-w-[700px] w-full h-full">
        <div className="space-y-4 text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white">
            Profitex
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white">
            Create a new account
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

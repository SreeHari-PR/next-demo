'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, KeyRound, User, Phone, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
// import { signupService } from '@/utils/services/auth/signup'
import axios from 'axios'

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(1, {
    message: "Last name must be at least 1 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  referrer: z.string().optional(),
  terms: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      referrer: "",
      terms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const { first_name, last_name, email, password, phone, referrer } = values;
      const payload = {
        first_name,
        last_name,
        email,
        password,
        phone,
        referrer
      };
      console.log(payload,'form data')

      const response = axios.post('https://dev.zynact.com/api/profitex/signup',payload)
      // const response= signupService(payload)
      console.log("Signup Success:", response);
      // window.location.href = "/login";
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <Input
                      placeholder="First name"
                      {...field}
                      className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                    className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referrer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Enter referral id"
                    {...field}
                    className="pl-10 h-12 bg-slate-800/50 border-0 text-slate-300 placeholder:text-slate-500"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-slate-500">
                  I agree to accept the{" "}
                  <Link href="/terms" className="text-blue-500 hover:text-blue-400">
                    Terms of service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-white bg-blue-600 hover:bg-blue-700 text-base font-medium" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        <div className="text-center text-sm text-slate-500">
          Have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-400">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}



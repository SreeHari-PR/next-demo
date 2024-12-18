'use client';

import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuth,
} from '@/utils/redux/authslice';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters long.',
  }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector(selectAuth); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginStart());

    try {
      console.log('dsfas');
      
      const response = await fetch('https://dev.zynact.com/api/profitex/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
       console.log(data,'data')
      if (data.success===true&&typeof data.data === 'string') {
        dispatch(
          loginSuccess(
             data.data,
          )
        );
        router.push('/dashboard');
      } else {
        dispatch(loginFailure(data.message || 'Login failed'));
      }
    } catch (error: any) {
      console.log(error)
      dispatch(loginFailure('An unexpected error occurred'));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter your email"
                    className="pl-10 py-6"
                    {...field}
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 py-6"
                    {...field}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
        <Button
          type="submit"
          className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-base font-medium text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin text-white mx-auto" />
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </Form>
  );
}

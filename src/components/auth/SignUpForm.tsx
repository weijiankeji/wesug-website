import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11).max(11),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  otp: z.string().length(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  step: 'phone' | 'otp';
  countdown: number;
  onGetCode: () => void;
}

export const SignUpForm = ({ onSubmit, step, countdown, onGetCode }: SignUpFormProps) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
      otp: '',
      agreement: false
    }
  });

  const isPhoneValid = form.watch('phone')?.length === 11;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {step === 'phone' ? (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('name')}</Label>
                  <FormControl>
                    <Input placeholder={t('enterName')} {...field} />
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
                  <Label>{t('phoneNumber')}</Label>
                  <FormControl>
                    <Input placeholder="1xxxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('verificationCode')}</Label>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <Button 
                      type="button" 
                      onClick={onGetCode} 
                      disabled={!isPhoneValid || countdown > 0}
                      className="whitespace-nowrap"
                    >
                      {countdown > 0 ? `${countdown}s` : t(countdown === 0 && field.value ? 'getCodeAgain' : 'getCode')}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('password')}</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('confirmPassword')}</Label>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label>
                      {t('agreeToTerms')} <a href="/terms" className="text-primary hover:underline">{t('terms')}</a> {t('and')} <a href="/privacy" className="text-primary hover:underline">{t('privacy')}</a>
                    </Label>
                  </div>
                </FormItem>
              )}
            />
          </>
        ) : (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <Label>{t('verificationCode')}</Label>
                <FormControl>
                  <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full">
          {t('signUp')}
        </Button>
      </form>
    </Form>
  );
};
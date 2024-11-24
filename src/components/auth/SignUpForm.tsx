import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(2),
  mobile: z.string().min(11).max(11),
  password: z.string().min(6),
  password1: z.string().min(6),
  smscode: z.string().length(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
}).refine((data) => data.password === data.password1, {
  message: "Passwords don't match",
  path: ["password1"],
});

interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  countdown: number;
  onGetCode: () => void;
  onModeChange: () => void;
}

export const SignUpForm = ({ onSubmit, countdown, onGetCode, onModeChange }: SignUpFormProps) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
      password: '',
      password1: '',
      smscode: '',
      agreement: false
    }
  });

  const isPhoneValid = form.watch('mobile')?.length === 11;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>{t('username')}</Label>
              <FormControl>
                <Input placeholder={t('enterName')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
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
          name="smscode"
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
          name="password1"
          render={({ field }) => (
            <FormItem>
              <Label>{t('password1')}</Label>
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
                  {t('agreeToTerms')} <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{t('terms')}</a> {t('and')} <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{t('privacy')}</a>
                </Label>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('signUp')}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t('haveAccount')}</span>{' '}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={onModeChange}
          >
            {t('signIn')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

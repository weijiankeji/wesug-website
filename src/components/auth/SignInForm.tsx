import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginTypeSwitch } from './LoginTypeSwitch';
import { z } from 'zod';

const formSchema = (t: any) => z.object({
  mobile: z.string().regex(/^1\d{10}$/, {
    message: t('invalidPhone')
  }),
  password: z.string().min(6, {
    message: t('passwordMinLength')
  }).optional(),
  smscode: z.string().length(6, {
    message: t('invalidCode')
  }).optional(),
  agreement: z.boolean().refine((val) => val === true, {
    message: t('agreementRequired')
  })
});

type FormData = z.infer<ReturnType<typeof formSchema>>;

interface SignInFormProps {
  onSubmit: (values: any) => void;
  countdown: number;
  onGetCode: () => void;
  onModeChange: () => void;
  loginType: 1 | 2;
}

export const SignInForm = ({ onSubmit, countdown, onGetCode, onModeChange, loginType }: SignInFormProps) => {
  const { t } = useTranslation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      mobile: '',
      password: '',
      smscode: '',
      agreement: false
    },
    mode: 'onChange'
  });

  const isMobileValid = React.useMemo(() => {
    const mobile = form.watch('mobile');
    return /^1\d{10}$/.test(mobile);
  }, [form]);

  const handleSubmit = (values: FormData) => {
    onSubmit({
      mobile: values.mobile,
      ...(loginType === 1 ? { password: values.password } : { smscode: Number(values.smscode) }),
      loginType,
      agreement: values.agreement
    });
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <Label>{t('phoneNumber')}</Label>
                <FormControl>
                  <Input placeholder={t('enterPhone')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loginType === 1 ? (
            <FormField
              key="password-field"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('password')}</Label>
                  <FormControl>
                    <Input type="password" placeholder={t('enterPassword')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key="smscode-field"
              control={form.control}
              name="smscode"
              render={({ field }) => (
                <FormItem>
                  <Label>{t('verificationCode')}</Label>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder={t('enterCode')} {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={onGetCode}
                      disabled={!isMobileValid || countdown > 0}
                      variant="outline"
                      className="shrink-0 min-w-[4rem] h-10"
                    >
                      {countdown > 0 ? countdown : t('getCode')}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
            {t('signIn')}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('noAccount')}</span>{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={onModeChange}
            >
              {t('signUp')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

SignInForm.LoginTypeSwitch = LoginTypeSwitch;

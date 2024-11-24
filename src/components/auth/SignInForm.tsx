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
import { MessageSquareCode, KeyRound } from 'lucide-react';

const passwordFormSchema = z.object({
  mobile: z.string().min(11).max(11),
  password: z.string().min(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
});

const smscodeFormSchema = z.object({
  mobile: z.string().min(11).max(11),
  smscode: z.string().length(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
});

interface SignInFormProps {
  onSubmit: (values) => void;
  countdown: number;
  onGetCode: () => void;
  onModeChange: () => void;
  loginType: 1 | 2;
}

interface LoginTypeSwitchProps {
  loginType: 1 | 2;
  onLoginTypeChange: (type: 1 | 2) => void;
}

const LoginTypeSwitch = ({ loginType, onLoginTypeChange }: LoginTypeSwitchProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLoginTypeChange(loginType === 1 ? 2 : 1)}
      className="text-primary hover:text-primary/80 px-2"
    >
      {loginType === 1 ? (
        <MessageSquareCode className="h-4 w-4 mr-2" />
      ) : (
        <KeyRound className="h-4 w-4 mr-2" />
      )}
      {loginType === 1 ? t('useSmscode') : t('usePassword')}
    </Button>
  );
};

export const SignInForm = ({ onSubmit, countdown, onGetCode, onModeChange, loginType }: SignInFormProps) => {
  const { t } = useTranslation();

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      mobile: '',
      password: '',
      agreement: false
    }
  });

  const smscodeForm = useForm<z.infer<typeof smscodeFormSchema>>({
    resolver: zodResolver(smscodeFormSchema),
    defaultValues: {
      mobile: '',
      smscode: '',
      agreement: false
    }
  });

  const isMobileValid = loginType === 1
    ? passwordForm.watch('mobile')?.length === 11
    : smscodeForm.watch('mobile')?.length === 11;

  const handleSubmit = loginType === 1
    ? passwordForm.handleSubmit(onSubmit)
    : smscodeForm.handleSubmit(onSubmit);

  const currentForm = loginType === 1 ? passwordForm : smscodeForm;

  return (
    <div className="space-y-4">
      <Form {...currentForm}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={currentForm.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <Label>{t('phoneNumber')}</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loginType === 1 ? (
            <FormField
              control={passwordForm.control}
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
          ) : (
            <FormField
              control={smscodeForm.control}
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
            control={currentForm.control}
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
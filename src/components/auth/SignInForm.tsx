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
import { passwordFormSchema, smscodeFormSchema, PasswordFormData, SMSCodeFormData } from './formSchemas';

interface SignInFormProps {
  onSubmit: (values: any) => void;
  countdown: number;
  onGetCode: () => void;
  onModeChange: () => void;
  loginType: 1 | 2;
}

export const SignInForm = ({ onSubmit, countdown, onGetCode, onModeChange, loginType }: SignInFormProps) => {
  const { t } = useTranslation();

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      mobile: '',
      password: '',
      agreement: false
    },
    mode: 'onSubmit'
  });

  const smscodeForm = useForm<SMSCodeFormData>({
    resolver: zodResolver(smscodeFormSchema),
    defaultValues: {
      mobile: '',
      smscode: '',
      agreement: false
    },
    mode: 'onSubmit'
  });

  // Sync mobile number between forms when it changes
  React.useEffect(() => {
    const subscription = loginType === 1
      ? passwordForm.watch((value) => {
          const mobile = value.mobile;
          if (mobile !== undefined) {
            smscodeForm.setValue('mobile', mobile, { shouldValidate: false });
          }
        })
      : smscodeForm.watch((value) => {
          const mobile = value.mobile;
          if (mobile !== undefined) {
            passwordForm.setValue('mobile', mobile, { shouldValidate: false });
          }
        });

    return () => subscription.unsubscribe();
  }, [loginType, passwordForm, smscodeForm]);

  const isMobileValid = React.useMemo(() => {
    const mobile = loginType === 1 
      ? passwordForm.getValues('mobile')
      : smscodeForm.getValues('mobile');
    return mobile?.length === 11;
  }, [loginType, passwordForm, smscodeForm]);

  const handleSubmit = (values: any) => {
    onSubmit({
      ...values,
      loginType,
      ...(values.smscode && { smscode: Number(values.smscode) })
    });
  };

  const currentForm = loginType === 1 ? passwordForm : smscodeForm;

  return (
    <div className="space-y-4">
      <Form {...currentForm}>
        <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-4">
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
              key="password-form-item"
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
              key="smscode-form-item"
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
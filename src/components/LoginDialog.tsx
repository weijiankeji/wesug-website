import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { useToast } from './ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (phone: string) => void;
}

export const LoginDialog = ({ open, onOpenChange, onLogin }: LoginDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [countdown, setCountdown] = React.useState(0);
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signin');

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = () => {
    toast({
      title: t('codeSent'),
    });
    startCountdown();
  };

  const handleSignIn = (values: any) => {
    onLogin(values.phone);
    onOpenChange(false);
  };

  const handleSignUp = (values: any) => {
    onLogin(values.phone);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <h2 className="text-lg font-semibold">{t(mode === 'signin' ? 'signIn' : 'signUp')}</h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' ? (
              <>
                {t('noAccount')}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-primary hover:underline"
                >
                  {t('signUp')}
                </button>
              </>
            ) : (
              <>
                {t('haveAccount')}{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-primary hover:underline"
                >
                  {t('signIn')}
                </button>
              </>
            )}
          </p>
        </DialogHeader>
        {mode === 'signin' ? (
          <SignInForm
            onSubmit={handleSignIn}
            countdown={countdown}
            onGetCode={handleSendCode}
          />
        ) : (
          <SignUpForm
            onSubmit={handleSignUp}
            countdown={countdown}
            onGetCode={handleSendCode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
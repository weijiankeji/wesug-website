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

  const handleModeChange = (newMode: string) => {
    setMode(newMode as 'signin' | 'signup');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <Tabs defaultValue="signin" onValueChange={handleModeChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t('signIn')}</TabsTrigger>
              <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
            </TabsList>
          </Tabs>
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
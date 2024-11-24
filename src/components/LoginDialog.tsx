import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { useToast } from './ui/use-toast';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (data: {
    mobile: string;
    password?: string;
    smscode?: number;
    loginType: 1 | 2;
  }) => void;
  onRegister: (data: {
    mobile: string;
    password: string;
    password1: string;
    smscode: number;
    username: string
  }) => void;
}

export const LoginDialog = ({ open, onOpenChange, onLogin, onRegister }: LoginDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [countdown, setCountdown] = React.useState(0);
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signin');
  const [loginType, setLoginType] = React.useState<1 | 2>(1);

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

  const handleSignIn = (values) => {
    onLogin({ ...values, loginType });
  };

  const handleSignUp = (values) => {
    onRegister(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">{t(mode === 'signin' ? 'signIn' : 'signUp')}</h2>
          {mode === 'signin' && (
            <SignInForm.LoginTypeSwitch
              loginType={loginType}
              onLoginTypeChange={setLoginType}
            />
          )}
        </DialogHeader>
        {mode === 'signin' ? (
          <SignInForm
            onSubmit={handleSignIn}
            countdown={countdown}
            onGetCode={handleSendCode}
            onModeChange={() => setMode('signup')}
            loginType={loginType}
          />
        ) : (
          <SignUpForm
            onSubmit={handleSignUp}
            countdown={countdown}
            onGetCode={handleSendCode}
            onModeChange={() => setMode('signin')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
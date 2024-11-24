import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { MessageSquareCode, KeyRound } from 'lucide-react';

interface LoginTypeSwitchProps {
  loginType: 1 | 2;
  onLoginTypeChange: (type: 1 | 2) => void;
}

export const LoginTypeSwitch = ({ loginType, onLoginTypeChange }: LoginTypeSwitchProps) => {
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
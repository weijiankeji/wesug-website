import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench } from 'lucide-react';

const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Wrench className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-xl text-primary">{t('companyName')}</span>
    </div>
  );
};

export default Logo;
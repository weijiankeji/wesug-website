import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';
import { useToast } from './ui/use-toast';

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    toast({
      title: newLang === 'en' ? 'Language Changed' : '语言已更改',
      description: newLang === 'en' ? 'Switched to English' : '已切换至中文',
      duration: 2000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50"
    >
      <Languages className="h-5 w-5" />
    </Button>
  );
};
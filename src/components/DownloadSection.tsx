import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const DownloadSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">{t('downloadClient')}</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{t('desktopClient')}</h3>
              <p className="text-gray-600">{t('clientDescription')}</p>
            </div>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t('download')}
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <p>{t('systemRequirements')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
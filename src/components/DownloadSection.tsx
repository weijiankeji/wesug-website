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
        
        {/* Desktop Client */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
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

        {/* Mobile Apps */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{t('mobileApps')}</h3>
              <p className="text-gray-600">{t('clientDescription')}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Android App</h4>
              <p className="text-sm text-gray-500 mb-4">{t('systemRequirements')}</p>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download APK
              </Button>
            </div>
            <div className="flex-1 p-4 border rounded-lg">
              <h4 className="font-medium mb-2">iOS App</h4>
              <p className="text-sm text-gray-500 mb-4">{t('systemRequirements')}</p>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                App Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
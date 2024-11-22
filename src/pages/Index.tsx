import { File, Image, RefreshCw, Upload, Download, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import DownloadSection from "@/components/DownloadSection";
import Logo from "@/components/Logo";
import { UserMenu } from "@/components/UserMenu";
import { useRef } from "react";

const Index = () => {
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDocumentProcessingClick = () => {
    window.location.href = 'https://pdf.wesug.cn';
  };

  const services = [
    {
      icon: <File className="w-8 h-8" />,
      title: t('documentProcessing'),
      description: t('documentDescription'),
      features: [
        t('pdfPreview'),
        t('pdfMerge'),
        t('pdfSplit'),
      ],
      onClick: handleDocumentProcessingClick
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: t('imageProcessing'),
      description: t('imageDescription'),
      features: [
        t('imageCompression'),
      ]
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: t('formatConversion'),
      description: t('formatDescription'),
      features: [
        t('comingSoon'),
      ]
    },
  ];

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: t('easyUpload'),
      description: t('uploadDescription'),
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: t('fastProcessing'),
      description: t('processingDescription'),
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: t('advancedTools'),
      description: t('toolsDescription'),
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-2">
            <LanguageSwitch />
            <div className="h-6 w-px bg-gray-200" />
            <UserMenu />
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-r from-primary to-secondary pt-32 pb-20 text-white">
        <div className="container mx-auto px-6 animate-fadeIn">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl mb-8 font-bold">
              {t('bannerText')}
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 transition-colors"
              onClick={scrollToServices}
            >
              {t('getStarted')}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('ourServices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={service.onClick}
              >
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-500">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DownloadSection />

      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('readyToStart')}</h2>
          <p className="text-xl mb-8">{t('transformWorkflow')}</p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 transition-colors"
            onClick={scrollToServices}
          >
            {t('tryNow')}
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8">
            <div className="text-left">  {/* Changed from text-center to text-left */}
              <h3 className="text-white text-lg font-semibold mb-4">{t('contact')}</h3>
              <p className="text-sm">Email: windyrain1994@163.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2024 {t('companyName')}. {t('rights')}{' '}
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                京ICP备2024062306号-2
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Upload, Download, Cog, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import Logo from '@/components/Logo';
import { UserMenu } from '@/components/UserMenu';
import { useRef } from 'react';
import { useState } from 'react';
import { FileImage, QrCode, Split } from 'lucide-react';
import { download } from '@/request';
import { isLogin } from '@/utils';

const Index = () => {
  const { t, i18n } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'dev' | 'tools'>('dev');
  // 在组件顶部添加状态管理
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
  });
  // 在状态管理部分添加loading状态
  const [loading, setLoading] = useState(false);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-2">
            <LanguageSwitch />
            {i18n.language !== 'en' && (
              <>
                <div className="h-6 w-px bg-gray-200" />
                <UserMenu />
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-r from-primary to-secondary pt-32 pb-20 text-white">
        <div className="container mx-auto px-6 animate-fadeIn">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl mb-8 font-bold">{t('bannerText')}</p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 transition-colors" onClick={scrollToServices}>
              {t('getStarted')}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('ourServices')}</h2>

          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-gray-200 hidden">
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'dev' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('dev')}
              >
                开发效率
              </button>
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'tools' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('tools')}
              >
                工具
              </button>
            </div>

            <div className="mt-8 grid gap-6">
              {activeTab === 'dev' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{t('easyAntDesignPro')}</h3>
                    <div className="flex space-x-6 mb-4">
                      <a
                        href={t('easyAntDesignProBlogUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center"
                      >
                        <FileImage className="w-4 h-4 mr-1" />
                        {t('easyAntDesignProBlog')}
                      </a>
                      <a
                        href={t('easyAntDesignProVideoUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        {t('easyAntDesignProVideo')}
                      </a>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('easyAntDesignProTitle')}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder={t('easyAntDesignProTitlePlaceholder')}
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('easyAntDesignProAdminUserName')}</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder={t('easyAntDesignProAdminUserNamePlaceholder')}
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('easyAntDesignProAdminPassword')}</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder={t('easyAntDesignProAdminPasswordPlaceholder')}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex w-100">
                      <Button
                        className="bg-primary hover:bg-primary/90 flex-1 mr-2"
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          const url = isLogin() ? '/wesug-website/download' : '/wesug-website/noauth-download';
                          download('POST', url, {
                            title: formData.title,
                            username: formData.username,
                            password: formData.password,
                            lang: i18n.language === 'en' ? 'en-US' : 'zh-CN',
                          })
                            .then((res) => {
                              if (res.status === 200) {
                                const a = document.createElement('a');
                                a.href = window.URL.createObjectURL(res.data);
                                a.download = 'ant-design-pro-template.zip';
                                a.click();
                              }
                            })
                            .finally(() => {
                              setLoading(false);
                            });
                        }}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t('easyAntDesignProGenerating')}
                          </span>
                        ) : (
                          t('easyAntDesignProGenerateOnline')
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          window.open(t('easyAntDesignProSourceCodeUrl'));
                        }}
                      >
                        {t('easyAntDesignProGetSourceCode')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Split className="w-6 h-6 text-primary mr-3" />
                          <h3 className="text-lg font-semibold">PDF拆分</h3>
                        </div>
                        <p className="text-gray-600 mb-4">将大型PDF文件按页面或内容拆分成多个小文件</p>
                        <Button variant="outline" className="w-full">
                          开始拆分
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <FileImage className="w-6 h-6 text-primary mr-3" />
                          <h3 className="text-lg font-semibold">图像压缩</h3>
                        </div>
                        <p className="text-gray-600 mb-4">智能压缩图片大小而不损失质量，支持多种格式</p>
                        <Button variant="outline" className="w-full">
                          上传图片
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <QrCode className="w-6 h-6 text-primary mr-3" />
                          <h3 className="text-lg font-semibold">二维码生成</h3>
                        </div>
                        <p className="text-gray-600 mb-4">快速生成可自定义样式和内容的二维码</p>
                        <Button variant="outline" className="w-full">
                          生成二维码
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8">
            <div className="text-left">
              {/* Changed from text-center to text-left */}
              <h3 className="text-white text-lg font-semibold mb-4">{t('contact')}</h3>
              <p className="text-sm">Email: admin@wesug.cn</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2025 {t('companyName')}. {t('rights')}{' '}
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
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

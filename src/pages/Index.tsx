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
    title: '后台管理系统',
    username: 'admin',
    password: '123456',
  });

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

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
                    <h3 className="text-xl font-semibold mb-4">Ant Design Pro 后台模板一键生成</h3>
                    <div className="flex space-x-6 mb-4">
                      <a
                        href="https://juejin.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center"
                      >
                        <FileImage className="w-4 h-4 mr-1" />
                        文章介绍
                      </a>
                      <a
                        href="https://www.bilibili.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        视频展示
                      </a>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">管理系统标题</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="默认标题：后台管理系统"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">管理员用户名</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="默认用户：admin"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">管理员密码</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="默认密码：123456"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex w-100">
                      <Button
                        className="bg-primary hover:bg-primary/90 flex-1 mr-2"
                        onClick={() => {
                          const url = isLogin() ? '/wesug-website/download' : '/wesug-website/noauth-download';
                          download('POST', url, {
                            title: formData.title,
                            username: formData.username,
                            password: formData.password,
                          }).then((res) => {
                            if (res.status === 200) {
                              const a = document.createElement('a');
                              a.href = window.URL.createObjectURL(res.data);
                              a.download = 'ant-design-pro-template.zip';
                              a.click();
                            }
                          });
                        }}
                      >
                        在线生成
                      </Button>
                      <Button variant="outline" className="flex-1 hidden">
                        <s className="decoration-slice">原价9.9</s>（1元限时折扣）获取源码
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

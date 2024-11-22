import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      companyName: "WeSug",
      heroTitle: "WeSug",
      heroDescription: "Committed to providing high-quality, efficient and secure tool services for individuals and enterprises",
      getStarted: "Get Started",
      ourServices: "Our Services",
      documentProcessing: "Document Processing",
      documentDescription: "Advanced document processing with support for multiple formats",
      imageProcessing: "Image Processing",
      imageDescription: "Professional image processing and optimization tools",
      formatConversion: "Format Conversion",
      formatDescription: "Seamless conversion between various file formats",
      keyFeatures: "Key Features",
      easyUpload: "Easy Upload",
      uploadDescription: "Simple drag-and-drop interface for all your files",
      fastProcessing: "Fast Processing",
      processingDescription: "Quick and efficient processing of your documents",
      advancedTools: "Advanced Tools",
      toolsDescription: "Professional-grade tools for all your needs",
      readyToStart: "Ready to Get Started?",
      transformWorkflow: "Transform your workflow with our professional tools",
      tryNow: "Try Now",
      since: "Providing professional tool services since 2024",
      contact: "Contact",
      followUs: "Follow Us",
      rights: "All rights reserved."
    }
  },
  zh: {
    translation: {
      companyName: "微谏科技",
      heroTitle: "微谏科技",
      heroDescription: "致力于为个人和企业提供高质量、高效率和安全的工具服务",
      getStarted: "立即开始",
      ourServices: "我们的服务",
      documentProcessing: "文档处理",
      documentDescription: "支持多种格式的高级文档处理",
      imageProcessing: "图像处理",
      imageDescription: "专业的图像处理和优化工具",
      formatConversion: "格式转换",
      formatDescription: "各种文件格式之间的无缝转换",
      keyFeatures: "核心特点",
      easyUpload: "简易上传",
      uploadDescription: "简单的拖放式文件上传界面",
      fastProcessing: "快速处理",
      processingDescription: "快速高效的文档处理",
      advancedTools: "高级工具",
      toolsDescription: "专业级别的工具满足您的所有需求",
      readyToStart: "准备开始了吗？",
      transformWorkflow: "使用我们的专业工具改变您的工作流程",
      tryNow: "立即尝试",
      since: "自2024年起提供专业工具服务",
      contact: "联系我们",
      followUs: "关注我们",
      rights: "版权所有"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('zh') ? 'zh' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
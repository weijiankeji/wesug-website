import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en', // default language
  resources: {
    en: {
      translation: {
        heroTitle: 'Professional File Processing Tools',
        heroDescription: 'Efficient and secure file processing solutions for your needs',
        getStarted: 'Get Started',
        ourServices: 'Our Services',
        keyFeatures: 'Key Features',
        readyToStart: 'Ready to Start?',
        transformWorkflow: 'Transform your workflow today',
        tryNow: 'Try Now',
        bannerText: 'Empowering individuals and enterprises with premium, efficient, and secure tools for document processing, image optimization, and format conversion. Transform your workflow today!',
        contact: 'Contact',
        followUs: 'Follow Us',
        rights: 'All rights reserved',
        documentProcessing: 'Document Processing',
        documentDescription: 'Professional PDF processing tools',
        imageProcessing: 'Image Processing',
        imageDescription: 'Efficient image optimization tools',
        formatConversion: 'Format Conversion',
        formatDescription: 'Convert between different file formats',
        easyUpload: 'Easy Upload',
        uploadDescription: 'Simple and secure file upload',
        fastProcessing: 'Fast Processing',
        processingDescription: 'Quick and efficient processing',
        advancedTools: 'Advanced Tools',
        toolsDescription: 'Professional-grade processing tools',
        pdfPreview: 'PDF Preview - View PDF files online',
        pdfMerge: 'PDF Merge - Combine multiple PDFs into one',
        pdfSplit: 'PDF Split - Extract pages from PDF files',
        imageCompression: 'Image Compression - Reduce image file size while maintaining quality',
        comingSoon: 'Format conversion features coming soon',
        downloadClient: 'Download Our Client Software',
        desktopClient: 'Desktop Client',
        clientDescription: 'Get more features and better performance with our desktop application',
        download: 'Download',
        systemRequirements: 'System Requirements: Windows 10/11, macOS 10.15+',
        login: 'Login',
        logout: 'Logout',
      }
    },
    zh: {
      translation: {
        heroTitle: '专业文件处理工具',
        heroDescription: '高效安全的文件处理解决方案',
        getStarted: '立即开始',
        ourServices: '我们的服务',
        keyFeatures: '核心功能',
        readyToStart: '准备开始？',
        transformWorkflow: '今天就改变您的工作流程',
        tryNow: '立即尝试',
        bannerText: '为您提供专业级文档处理、图像优化和格式转换工具，让工作更高效，让创作更简单。立即体验智能办公新方式！',
        contact: '联系我们',
        followUs: '关注我们',
        rights: '版权所有',
        documentProcessing: '文档处理',
        documentDescription: '专业PDF处理工具',
        imageProcessing: '图像处理',
        imageDescription: '高效图像优化工具',
        formatConversion: '格式转换',
        formatDescription: '在不同文件格式之间转换',
        easyUpload: '轻松上传',
        uploadDescription: '简单安全的文件上传',
        fastProcessing: '快速处理',
        processingDescription: '快速高效的处理',
        advancedTools: '高级工具',
        toolsDescription: '专业级处理工具',
        pdfPreview: 'PDF预览 - 在线查看PDF文件',
        pdfMerge: 'PDF合并 - 将多个PDF文件合并为一个',
        pdfSplit: 'PDF拆分 - 从PDF文件中提取页面',
        imageCompression: '图片压缩 - 在保持质量的同时减小图片文件大小',
        comingSoon: '格式转换功能即将推出',
        downloadClient: '下载客户端软件',
        desktopClient: '桌面客户端',
        clientDescription: '使用我们的桌面应用程序获得更多功能和更好的性能',
        download: '下载',
        systemRequirements: '系统要求：Windows 10/11、macOS 10.15+',
        login: '登录',
        logout: '退出登录',
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

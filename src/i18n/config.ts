import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
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
      }
    },
    zh: {
      translation: {
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
      }
    }
  }
});

export default i18n;

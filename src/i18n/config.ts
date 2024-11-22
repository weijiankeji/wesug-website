import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'zh',
  lng: 'zh',
  resources: {
    en: {
      translation: {
        companyName: 'Wesug',
        heroTitle: 'Professional File Processing Tools',
        heroDescription: 'Efficient and secure file processing solutions for your needs',
        getStarted: 'Get Started',
        ourServices: 'Our Services',
        keyFeatures: 'Key Features',
        readyToStart: 'Ready to Start?',
        transformWorkflow: 'Transform your workflow today',
        tryNow: 'Try Now',
        bannerText: 'Committed to providing high-quality, efficient and secure tool services for individuals and enterprises, such as document/image processing, format conversion, etc.',
        contact: 'Contact',
        followUs: 'Follow Us',
        rights: 'All rights reserved',
        documentProcessing: 'Document Processing',
        documentDescription: 'PDF tools for viewing, merging and splitting',
        imageProcessing: 'Image Processing',
        imageDescription: 'Smart image optimization',
        formatConversion: 'Format Conversion',
        formatDescription: 'Convert between formats',
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
        mobileApps: 'Mobile Applications',
        login: 'Login',
        logout: 'Logout',
        phoneNumber: 'Phone Number',
        verificationCode: 'Verification Code',
        getCode: 'Get Code',
        verify: 'Verify',
        resendCode: 'Resend Code',
        invalidPhone: 'Invalid phone number',
        codeSent: 'Verification code sent',
        agreeToTerms: 'I agree to the',
        terms: 'Terms of Service',
        and: 'and',
        privacy: 'Privacy Policy',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        name: 'Name',
        enterName: 'Enter your name',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        passwordLogin: 'Password Login',
        otpLogin: 'SMS Code Login',
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        usePassword: "Use Password",
        useOtp: "Use SMS Code",
      }
    },
    zh: {
      translation: {
        companyName: '微谏科技',
        heroTitle: '专业文件处理工具',
        heroDescription: '高效安全的文件处理解决方案',
        getStarted: '立即开始',
        ourServices: '我们的服务',
        keyFeatures: '核心功能',
        readyToStart: '准备开始？',
        transformWorkflow: '今天就改变您的工作流程',
        tryNow: '立即尝试',
        bannerText: '致力于为个人和企业提供高质量、高效且安全的工具服务，如文档/图像处理、格式转换等。',
        contact: '联系我们',
        followUs: '关注我们',
        rights: '版权所有',
        documentProcessing: '文档处理',
        documentDescription: 'PDF查看与编辑',
        imageProcessing: '图像处理',
        imageDescription: '智能图像优化',
        formatConversion: '格式转换',
        formatDescription: '多格式转换',
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
        mobileApps: '移动应用',
        login: '登录',
        logout: '退出登录',
        phoneNumber: '手机号',
        verificationCode: '验证码',
        getCode: '获取验证码',
        verify: '验证',
        resendCode: '重新发送',
        invalidPhone: '无效的手机号',
        codeSent: '验证码已发送',
        agreeToTerms: '我已阅读并同意',
        terms: '用户协议',
        and: '和',
        privacy: '隐私政策',
        signIn: '登录',
        signUp: '注册',
        name: '姓名',
        enterName: '请输入姓名',
        password: '密码',
        confirmPassword: '确认密码',
        passwordLogin: '密码登录',
        otpLogin: '验证码登录',
        noAccount: '还没有账号？',
        haveAccount: '已有账号？',
        usePassword: '使用密码登录',
        useOtp: '使用短信验证码',
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

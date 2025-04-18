import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'zh',
  lng: window.location.href.includes('lang=en') ? 'en' : 'zh',
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
        bannerText: 'Committed to providing high-quality, efficient and secure software services',
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
        getCodeAgain: 'Get Code Again',
        verify: 'Verify',
        resendCode: 'Resend Code',
        codeSent: 'Verification code sent',
        agreeToTerms: 'I agree to the',
        terms: 'Terms of Service',
        and: 'and',
        privacy: 'Privacy Policy',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        username: 'Nick Name',
        enterName: 'Please enter your nickname',
        enterPhone: 'Please enter your phone number',
        enterCode: 'Please enter verification code',
        enterPassword: 'Please enter your password',
        confirmPassword: 'Please confirm your password',
        password: 'Password',
        password1: 'Confirm Password',
        passwordLogin: 'Password Login',
        otpLogin: 'SMS Code Login',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        usePassword: 'Use Password',
        useSmscode: 'Use SMS Code',
        // Validation messages
        invalidPhone: 'Please enter a valid phone number',
        invalidCode: 'Please enter a valid verification code',
        passwordMinLength: 'Password must be at least 6 characters',
        usernameMinLength: 'Username must be at least 2 characters',
        passwordsNotMatch: "Passwords don't match",
        agreementRequired: 'You must agree to the terms and privacy policy',
        // easy-ant-design-pro
        easyAntDesignPro: 'Simplifying Ant Design Pro Template',
        easyAntDesignProBlog: 'Blog',
        easyAntDesignProVideo: 'Youtube',
        easyAntDesignProTitle: 'CMS Title',
        easyAntDesignProAdminUserName: 'Admin username',
        easyAntDesignProAdminPassword: 'Admin password',
        easyAntDesignProTitlePlaceholder: 'DefaultValue: XX-CMS',
        easyAntDesignProAdminUserNamePlaceholder: 'Default value: admin',
        easyAntDesignProAdminPasswordPlaceholder: 'Default value: 123456',
        easyAntDesignProTitleDefaultValue: 'XX-CMS',
        easyAntDesignProGenerateOnline: 'Generate online',
        easyAntDesignProGenerating: 'Generating...',
        easyAntDesignProGetSourceCode: 'Get source code(open source is not easy, please give me a star)',
        easyAntDesignProBlogUrl: 'https://medium.com/@windyrain1994/simplifying-ant-design-pro-template-dc6b97199f16',
        easyAntDesignProVideoUrl: 'https://www.youtube.com/watch?v=WKJjsP2Erq4',
        easyAntDesignProSourceCodeUrl: 'https://github.com/weijiankeji/easy-ant-design-pro',
        // tab
        tabDevelop: 'Develop Efficient',
        tabTools: 'Tools',
        // pdf Combiner
        pdfCombinerTitle: 'PDF Combiner',
        pdfCombinerDescription: 'Recombine subpages from PDF files freely',
        tryIt: 'Try it',
        pdfCombiner: {
          uploadedFile: 'Uploaded file',
          removeFromCombination: 'Remove from combination',
          addToCombination: 'Add to combination',
          combine: 'Combine',
          reupload: 'Reupload',
          exit: 'Exit',
          selectAll: 'Select All',
          deselectAll: 'Cancel Select All',
        },
      },
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
        bannerText: '致力于提供高质量、高效且安全的软件服务。',
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
        getCodeAgain: '重新获取验证码',
        verify: '验证',
        resendCode: '重新发送',
        codeSent: '验证码已发送',
        agreeToTerms: '我已阅读并同意',
        terms: '用户协议',
        and: '和',
        privacy: '隐私政策',
        signIn: '登录',
        signUp: '注册',
        username: '昵称',
        enterName: '请输入昵称',
        enterPhone: '请输入手机号',
        enterCode: '请输入验证码',
        enterPassword: '请输入密码',
        confirmPassword: '请确认密码',
        password: '密码',
        password1: '确认密码',
        passwordLogin: '密码登录',
        otpLogin: '验证码登录',
        noAccount: '还没有账号？',
        haveAccount: '已有账号？',
        usePassword: '使用密码登录',
        useSmscode: '使用短信验证码',
        // Validation messages
        invalidPhone: '请输入有效的手机号',
        invalidCode: '请输入有效的验证码',
        passwordMinLength: '密码至少需要6个字符',
        usernameMinLength: '用户名至少需要2个字符',
        passwordsNotMatch: '两次输入的密码不一致',
        agreementRequired: '请同意用户协议和隐私政策',
        // easy-ant-design-pro
        easyAntDesignPro: 'Ant Design Pro 模版简化工具',
        easyAntDesignProBlog: '文章介绍',
        easyAntDesignProVideo: '视频展示',
        easyAntDesignProTitle: '管理系统标题',
        easyAntDesignProAdminUserName: '管理员用户名',
        easyAntDesignProAdminPassword: '管理员密码',
        easyAntDesignProTitlePlaceholder: '默认标题: 后台管理系统',
        easyAntDesignProAdminUserNamePlaceholder: '默认用户: admin',
        easyAntDesignProAdminPasswordPlaceholder: '默认密码: 123456',
        easyAntDesignProTitleDefaultValue: '后台管理系统',
        easyAntDesignProGenerateOnline: '在线生成',
        easyAntDesignProGenerating: '正在生成...',
        easyAntDesignProGetSourceCode: '获取源码（开源不易，给我的文章/源码点个赞吧）',
        easyAntDesignProBlogUrl: 'https://juejin.cn/post/7488529389338673204',
        easyAntDesignProVideoUrl: 'https://www.bilibili.com/video/BV1PcfMYHE95/?vd_source=21fc071576e0c6a54d3912b89ce741fd',
        easyAntDesignProSourceCodeUrl: 'https://gitee.com/windyrain1994/easy-ant-design-pro',
        // tab
        tabDevelop: '开发效率',
        tabTools: '工具',
        // pdf 自由组合
        pdfCombinerTitle: 'PDF自由组合',
        pdfCombinerDescription: '将PDF文件中的子页面重新自由组合',
        tryIt: '试一试',
        pdfCombiner: {
          uploadedFile: '已上传文件',
          removeFromCombination: '从自由组合中移除',
          addToCombination: '添加到自由组合',
          combine: '自由组合',
          reupload: '重新上传',
          exit: '退出',
          selectAll: '全选',
          deselectAll: '取消全选',
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

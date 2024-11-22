import React from "react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
      <div className="prose prose-gray max-w-none">
        <p className="mb-4">北京微谏科技有限公司（以下简称"我们"）非常重视用户的隐私保护。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">1. 信息收集</h2>
        <p>我们收集的信息包括：</p>
        <ul className="list-disc pl-6 mb-4">
          <li>账号信息（手机号码等）</li>
          <li>使用服务时产生的信息</li>
          <li>设备信息</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">2. 信息使用</h2>
        <p>我们使用收集的信息用于：</p>
        <ul className="list-disc pl-6 mb-4">
          <li>提供、维护和改进我们的服务</li>
          <li>向您推送服务通知</li>
          <li>预防和处理欺诈等安全问题</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">3. 信息保护</h2>
        <p>我们采取严格的数据安全措施保护您的个人信息。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">4. 信息共享</h2>
        <p>除非法律要求或获得您的同意，我们不会与第三方共享您的个人信息。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">5. Cookie的使用</h2>
        <p>我们使用Cookie来改善用户体验。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">6. 联系我们</h2>
        <p>如果您对本隐私政策有任何疑问，请联系我们。</p>
      </div>
    </div>
  );
};

export default Privacy;
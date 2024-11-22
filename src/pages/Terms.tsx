import React from "react";

const Terms = () => {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">用户服务协议</h1>
      <div className="prose prose-gray max-w-none">
        <p className="mb-4">欢迎使用北京微谏科技有限公司（以下简称"我们"）提供的服务。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">1. 协议的范围</h2>
        <p>本协议是您与北京微谏科技有限公司之间关于使用我们的产品和服务所订立的协议。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">2. 服务内容</h2>
        <p>我们提供的服务包括但不限于：文件处理、格式转换、在线预览等功能。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">3. 用户义务</h2>
        <p>3.1 您应当遵守中华人民共和国相关法律法规。</p>
        <p>3.2 您应当妥善保管账号信息，对账号进行的所有活动负责。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">4. 知识产权</h2>
        <p>我们的服务中包含的所有知识产权均属于北京微谏科技有限公司所有。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">5. 服务变更、中断或终止</h2>
        <p>我们保留随时修改或中断服务而不需通知您的权利。</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-4">6. 法律管辖</h2>
        <p>本协议受中华人民共和国法律管辖。</p>
      </div>
    </div>
  );
};

export default Terms;
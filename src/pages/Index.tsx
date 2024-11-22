import { File, Image, RefreshCw, Upload, Download, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const services = [
    {
      icon: <File className="w-8 h-8" />,
      title: "Document Processing",
      description: "Advanced document processing with support for multiple formats",
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Image Processing",
      description: "Professional image processing and optimization tools",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Format Conversion",
      description: "Seamless conversion between various file formats",
    },
  ];

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Easy Upload",
      description: "Simple drag-and-drop interface for all your files",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Fast Processing",
      description: "Quick and efficient processing of your documents",
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: "Advanced Tools",
      description: "Professional-grade tools for all your needs",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-6 animate-fadeIn">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">微谏科技 / WeSug</h1>
            <p className="text-xl md:text-2xl mb-8">
              Committed to providing high-quality, efficient and secure tool services for individuals and enterprises
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
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

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Transform your workflow with our professional tools</p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 transition-colors"
          >
            Try Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">微谏科技 / WeSug</h3>
              <p className="text-sm">Providing professional tool services since 2024</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm">Email: contact@wesug.com</p>
              <p className="text-sm">Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 微谏科技 / WeSug. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
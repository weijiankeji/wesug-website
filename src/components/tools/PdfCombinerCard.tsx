import { Split, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useState, lazy, Suspense, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Combine, Upload as IconUpload, X } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { generatePdf } from '@/lib/pdf-utils'; // 假设有这个工具函数

const isDevelopment = process.env.NODE_ENV === 'development';

// 动态导入大型库
const Document = lazy(() => import('react-pdf').then((module) => ({ default: module.Document })));
const Page = lazy(() => import('react-pdf').then((module) => ({ default: module.Page })));

interface PdfCombinerCardProps {
  onClick?: () => void;
}

export const PdfCombinerCard = ({ onClick }: PdfCombinerCardProps) => {
  const { t } = useTranslation();
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfFile, setPdfFile] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [combinedPages, setCombinedPages] = useState<number[]>([]);

  useEffect(() => {
    if (isUploaded) {
      import('react-pdf').then(({ pdfjs }) => {
        pdfjs.GlobalWorkerOptions.workerSrc = isDevelopment
          ? `./pdf/pdf.worker.min.mjs`
          : `https://cdn.wesug.cn/static/pdf/4.8.69/pdf.worker.min.mjs`;
      });
    }
  }, [isUploaded]);

  const handleContextMenuAction = (pageNum: number) => {
    if (combinedPages.includes(pageNum)) {
      setCombinedPages(combinedPages.filter((p) => p !== pageNum));
    } else {
      setCombinedPages([...combinedPages, pageNum]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsUploaded(true);
      setIsLoading(true); // 添加加载状态

      const reader = new FileReader();
      reader.onload = (event) => {
        setPdfFile(event.target?.result || null);
      };
      reader.readAsDataURL(file);

      onClick?.();
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false); // 加载完成
  };

  const handleCombinePdf = async () => {
    if (!pdfFile || combinedPages.length === 0) return;

    setIsLoading(true);
    try {
      // 调用PDF生成工具函数
      await generatePdf({
        source: pdfFile,
        pages: combinedPages,
        filename: 'pdfcombiner.pdf',
      });
      // 组合完成后重置序列
      setCombinedPages([]);
    } catch (error) {
      console.error('PDF生成失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 修改PDF worker初始化部分
  useEffect(() => {
    if (isUploaded) {
      import('react-pdf').then(({ pdfjs }) => {
        pdfjs.GlobalWorkerOptions.workerSrc = isDevelopment
          ? `./pdf/pdf.worker.min.mjs`
          : `https://cdn.wesug.cn/static/pdf/4.8.69/pdf.worker.min.mjs`;
      });
    }
  }, [isUploaded]);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${isUploaded ? 'col-span-3' : ''}`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Split className="w-6 h-6 text-primary mr-3" />
          <h3 className="text-lg font-semibold">{t('pdfCombinerTitle')}</h3>
        </div>

        {!isUploaded ? (
          <>
            <p className="text-gray-600 mb-4">{t('pdfCombinerDescription')}</p>
            <label className="w-full">
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
              <Button variant="outline" className="w-full" asChild>
                <span className="flex items-center justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('tryIt')}
                </span>
              </Button>
            </label>
          </>
        ) : (
          <div className="space-y-4">
            {/* 已上传文件提示 */}
            <p className="text-gray-600">
              {t('pdfCombiner.uploadedFile')}: {fileName}
            </p>

            {isLoading && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {/* PDF 预览区域 */}
            <div className="border rounded-md p-4">
              {/* 主预览 */}
              <div className="flex justify-center mb-4 min-h-[400px]">
                {pdfFile && (
                  <Suspense fallback={<div>加载PDF查看器...</div>}>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} className={isLoading ? 'hidden' : ''}>
                      <Page pageNumber={currentPage} height={400} renderTextLayer={false} renderAnnotationLayer={false} />
                    </Document>
                  </Suspense>
                )}
              </div>

              {/* 缩略图导航 - 单独放在Document外 */}
              <div className={`overflow-x-auto whitespace-nowrap py-2 ${isLoading ? 'hidden' : ''}`}>
                {pdfFile && (
                  <Document file={pdfFile}>
                    {Array.from(new Array(numPages), (el, index) => {
                      const pageNum = index + 1;
                      const isCombined = combinedPages.includes(pageNum);
                      const orderIndex = isCombined ? combinedPages.indexOf(pageNum) + 1 : null;

                      return (
                        <ContextMenu key={`page_${pageNum}`}>
                          <ContextMenuTrigger>
                            <div
                              className={`inline-block mx-1 cursor-pointer relative ${
                                currentPage === pageNum ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {isCombined && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                                  {orderIndex}
                                </div>
                              )}
                              <Page pageNumber={pageNum} height={135} renderTextLayer={false} renderAnnotationLayer={false} />
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            {isCombined ? (
                              <ContextMenuItem onClick={() => handleContextMenuAction(pageNum)}>
                                {t('pdfCombiner.removeFromCombination')}
                              </ContextMenuItem>
                            ) : (
                              <ContextMenuItem onClick={() => handleContextMenuAction(pageNum)}>
                                {t('pdfCombiner.addToCombination')}
                              </ContextMenuItem>
                            )}
                          </ContextMenuContent>
                        </ContextMenu>
                      );
                    })}
                  </Document>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between space-x-4">
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  onClick={handleCombinePdf}
                  disabled={combinedPages.length === 0 || isLoading}
                >
                  <Combine className="w-4 h-4 mr-2" />
                  {t('pdfCombiner.combine')}
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="text-gray-600 hover:bg-gray-100"
                  onClick={() => {
                    setPdfFile(null);
                    setIsUploaded(false);
                  }}
                >
                  <IconUpload className="w-4 h-4 mr-2" />
                  {t('pdfCombiner.reupload')}
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:bg-red-500 border-red-200 hover:border-red-300"
                  onClick={() => {
                    setPdfFile(null);
                    setIsUploaded(false);
                    setFileName('');
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  {t('pdfCombiner.exit')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

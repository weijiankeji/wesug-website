import { Split, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useState, lazy, Suspense, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Combine, Upload as IconUpload, X } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { generatePdf, WidthMode } from '@/lib/pdf-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ZoomIn, ZoomOut, RotateCw, Check } from 'lucide-react';

const isDevelopment = process.env.NODE_ENV === 'development';

// 动态导入大型库
const Document = lazy(() => import('react-pdf').then((module) => ({ default: module.Document })));
const Page = lazy(() => import('react-pdf').then((module) => ({ default: module.Page })));

type PdfFile = {
  name: string;
  data: string | ArrayBuffer;
  numPages: number;
};

type PageRef = { fileIndex: number; pageNum: number };

const pageKey = (ref: PageRef) => `${ref.fileIndex}-${ref.pageNum}`;
const samePage = (a: PageRef, b: PageRef) => a.fileIndex === b.fileIndex && a.pageNum === b.pageNum;

interface PdfCombinerCardProps {
  onClick?: () => void;
}

export const PdfCombinerCard = ({ onClick }: PdfCombinerCardProps) => {
  const { t } = useTranslation();
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [currentPage, setCurrentPage] = useState<PageRef>({ fileIndex: 0, pageNum: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [combinedPages, setCombinedPages] = useState<PageRef[]>([]);
  const [scale, setScale] = useState<number>(1.0);
  const [pageRotations, setPageRotations] = useState<Record<string, number>>({});
  const [widthMode, setWidthMode] = useState<WidthMode>('min');

  const isUploaded = pdfFiles.length > 0;
  const totalPages = pdfFiles.reduce((sum, f) => sum + f.numPages, 0);
  const currentFile = pdfFiles[currentPage.fileIndex];

  useEffect(() => {
    if (isUploaded) {
      import('react-pdf').then(({ pdfjs }) => {
        pdfjs.GlobalWorkerOptions.workerSrc = isDevelopment
          ? `./pdf/pdf.worker.min.mjs`
          : `https://cdn.wesug.cn/static/pdf/4.8.69/pdf.worker.min.mjs`;
      });
    }
  }, [isUploaded]);

  const handleContextMenuAction = (ref: PageRef) => {
    const exists = combinedPages.some((p) => samePage(p, ref));
    if (exists) {
      setCombinedPages(combinedPages.filter((p) => !samePage(p, ref)));
    } else {
      setCombinedPages([...combinedPages, ref]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsLoading(true);
    const wasEmpty = pdfFiles.length === 0;

    Promise.all(
      files.map(
        (file) =>
          new Promise<PdfFile>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                name: file.name,
                data: (event.target?.result as string | ArrayBuffer) ?? '',
                numPages: 0,
              });
            };
            reader.readAsDataURL(file);
          }),
      ),
    ).then((newFiles) => {
      setPdfFiles((prev) => [...prev, ...newFiles]);
      if (wasEmpty) {
        setCurrentPage({ fileIndex: 0, pageNum: 1 });
        onClick?.();
      }
    });

    // 清空 input 以便同名文件可再次选中
    e.target.value = '';
  };

  const handleFileLoadSuccess = (fileIndex: number, numPages: number) => {
    setPdfFiles((prev) => {
      if (!prev[fileIndex] || prev[fileIndex].numPages === numPages) return prev;
      const next = [...prev];
      next[fileIndex] = { ...next[fileIndex], numPages };
      return next;
    });
    setIsLoading(false);
  };

  const handleCombinePdf = async () => {
    if (combinedPages.length === 0) return;

    setIsLoading(true);
    try {
      await generatePdf({
        entries: combinedPages.map((ref) => ({
          source: pdfFiles[ref.fileIndex].data,
          pageNum: ref.pageNum,
          rotation: pageRotations[pageKey(ref)] || 0,
        })),
        filename: 'pdfcombiner.pdf',
        widthMode,
      });
      setCombinedPages([]);
    } catch (error) {
      console.error('PDF生成失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFiles([]);
    setCombinedPages([]);
    setPageRotations({});
    setCurrentPage({ fileIndex: 0, pageNum: 1 });
  };

  // 缩放控制函数
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  // 旋转控制函数
  const rotate = () => {
    const k = pageKey(currentPage);
    setPageRotations((prev) => ({
      ...prev,
      [k]: ((prev[k] || 0) + 90) % 360,
    }));
  };

  const getRotation = (ref: PageRef) => pageRotations[pageKey(ref)] || 0;

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (combinedPages.length === totalPages && totalPages > 0) {
      setCombinedPages([]);
      return;
    }
    const all: PageRef[] = [];
    pdfFiles.forEach((file, fileIndex) => {
      for (let i = 1; i <= file.numPages; i += 1) {
        all.push({ fileIndex, pageNum: i });
      }
    });
    setCombinedPages(all);
  };

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
              <input type="file" accept=".pdf" multiple className="hidden" onChange={handleFileUpload} />
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
            <p className="text-gray-600 truncate" title={pdfFiles.map((f) => f.name).join('、')}>
              {t('pdfCombiner.uploadedFile')}: {pdfFiles.map((f) => f.name).join('、')}
            </p>

            {isLoading && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {/* PDF 预览区域 */}
            <div className="border rounded-md p-4">
              {/* 主预览 */}
              <div className="flex justify-center mb-4 h-[400px] relative overflow-y-scroll">
                <div className="absolute top-2 right-2 bg-white/90 rounded-md shadow-sm p-1 flex space-x-1 z-10">
                  <Button variant="ghost" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={zoomIn} disabled={scale >= 3.0}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={rotate}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>

                {currentFile && (
                  <Suspense fallback={<div>加载PDF查看器...</div>}>
                    <Document file={currentFile.data} className={isLoading ? 'hidden' : ''}>
                      <Page
                        pageNumber={currentPage.pageNum}
                        height={400 * scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        rotate={getRotation(currentPage)}
                      />
                    </Document>
                  </Suspense>
                )}
              </div>

              {/* 缩略图导航 - 按文件分组 */}
              <div className={`space-y-3 ${isLoading ? 'hidden' : ''}`}>
                {pdfFiles.map((file, fileIndex) => (
                  <div key={`file_${fileIndex}_${file.name}`}>
                    <div className="text-xs text-gray-500 mb-1 px-1 truncate" title={file.name}>
                      {fileIndex + 1}. {file.name}
                    </div>
                    <div className="overflow-x-auto whitespace-nowrap py-1">
                      <Document file={file.data} onLoadSuccess={({ numPages }) => handleFileLoadSuccess(fileIndex, numPages)}>
                        {Array.from(new Array(file.numPages), (_, index) => {
                          const pageNum = index + 1;
                          const ref: PageRef = { fileIndex, pageNum };
                          const orderIndex = combinedPages.findIndex((p) => samePage(p, ref));
                          const isCombined = orderIndex !== -1;
                          const isCurrent = samePage(currentPage, ref);

                          return (
                            <ContextMenu key={`page_${fileIndex}_${pageNum}`}>
                              <ContextMenuTrigger>
                                <div
                                  className={`inline-block mx-1 cursor-pointer relative ${isCurrent ? 'ring-2 ring-primary' : ''}`}
                                  onClick={() => setCurrentPage(ref)}
                                >
                                  {isCombined && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                                      {orderIndex + 1}
                                    </div>
                                  )}
                                  <Page
                                    pageNumber={pageNum}
                                    height={135}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    rotate={getRotation(ref)}
                                  />
                                </div>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                {isCombined ? (
                                  <ContextMenuItem onClick={() => handleContextMenuAction(ref)}>
                                    {t('pdfCombiner.removeFromCombination')}
                                  </ContextMenuItem>
                                ) : (
                                  <ContextMenuItem onClick={() => handleContextMenuAction(ref)}>
                                    {t('pdfCombiner.addToCombination')}
                                  </ContextMenuItem>
                                )}
                              </ContextMenuContent>
                            </ContextMenu>
                          );
                        })}
                      </Document>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between space-x-4">
              <div className="flex space-x-2 items-center">
                <Button variant="outline" onClick={toggleSelectAll} disabled={isLoading}>
                  <Check className="w-4 h-4 mr-2" />
                  {combinedPages.length === totalPages && totalPages > 0 ? t('pdfCombiner.deselectAll') : t('pdfCombiner.selectAll')}
                </Button>
                <Select value={widthMode} onValueChange={(v) => setWidthMode(v as WidthMode)}>
                  <SelectTrigger className="w-[160px]" aria-label={t('pdfCombiner.widthMode.label')}>
                    <SelectValue placeholder={t('pdfCombiner.widthMode.label')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="min">{t('pdfCombiner.widthMode.min')}</SelectItem>
                    <SelectItem value="max">{t('pdfCombiner.widthMode.max')}</SelectItem>
                    <SelectItem value="average">{t('pdfCombiner.widthMode.average')}</SelectItem>
                    <SelectItem value="original">{t('pdfCombiner.widthMode.original')}</SelectItem>
                  </SelectContent>
                </Select>
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
                <label>
                  <input type="file" accept=".pdf" multiple className="hidden" onChange={handleFileUpload} />
                  <Button variant="outline" className="text-gray-600 hover:bg-gray-100" asChild>
                    <span className="flex items-center cursor-pointer">
                      <IconUpload className="w-4 h-4 mr-2" />
                      {t('pdfCombiner.addMore')}
                    </span>
                  </Button>
                </label>
                <Button
                  variant="outline"
                  className="text-red-500 hover:bg-red-500 border-red-200 hover:border-red-300"
                  onClick={handleReset}
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

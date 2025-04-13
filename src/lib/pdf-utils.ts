import { degrees, PDFDocument } from 'pdf-lib';

export const generatePdf = async ({
  source,
  pages,
  filename,
  rotations,
}: {
  source: string | ArrayBuffer;
  pages: number[];
  filename: string;
  rotations?: Record<number, number>;
}) => {
  // 加载源PDF
  const existingPdfBytes = typeof source === 'string' ? await fetch(source).then((res) => res.arrayBuffer()) : source;

  const existingPdf = await PDFDocument.load(existingPdfBytes);
  const newPdf = await PDFDocument.create();

  // 复制选中的页面
  for (const pageNum of pages) {
    const [copiedPage] = await newPdf.copyPages(existingPdf, [pageNum - 1]);
    const rotation = rotations?.[pageNum] || 0;
    copiedPage.setRotation(degrees(rotation)); // 应用旋转角度
    newPdf.addPage(copiedPage);
  }

  // 生成并下载新PDF
  const pdfBytes = await newPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

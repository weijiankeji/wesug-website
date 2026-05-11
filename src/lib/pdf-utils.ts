import { degrees, PDFDocument } from 'pdf-lib';

type PdfEntry = {
  source: string | ArrayBuffer;
  pageNum: number;
  rotation?: number;
};

export const generatePdf = async ({ entries, filename }: { entries: PdfEntry[]; filename: string }) => {
  const newPdf = await PDFDocument.create();
  const docCache = new Map<string | ArrayBuffer, PDFDocument>();

  for (const entry of entries) {
    let doc = docCache.get(entry.source);
    if (!doc) {
      const bytes = typeof entry.source === 'string' ? await fetch(entry.source).then((res) => res.arrayBuffer()) : entry.source;
      doc = await PDFDocument.load(bytes);
      docCache.set(entry.source, doc);
    }
    const [copiedPage] = await newPdf.copyPages(doc, [entry.pageNum - 1]);
    copiedPage.setRotation(degrees(entry.rotation || 0));
    newPdf.addPage(copiedPage);
  }

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

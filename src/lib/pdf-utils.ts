import { degrees, PDFDocument, PDFEmbeddedPage } from 'pdf-lib';

export type WidthMode = 'original' | 'min' | 'max' | 'average';

type PdfEntry = {
  source: string | ArrayBuffer;
  pageNum: number;
  rotation?: number;
};

const loadDoc = async (source: string | ArrayBuffer, cache: Map<string | ArrayBuffer, PDFDocument>) => {
  let doc = cache.get(source);
  if (!doc) {
    const bytes = typeof source === 'string' ? await fetch(source).then((res) => res.arrayBuffer()) : source;
    doc = await PDFDocument.load(bytes);
    cache.set(source, doc);
  }
  return doc;
};

export const generatePdf = async ({
  entries,
  filename,
  widthMode = 'min',
}: {
  entries: PdfEntry[];
  filename: string;
  widthMode?: WidthMode;
}) => {
  const newPdf = await PDFDocument.create();
  const docCache = new Map<string | ArrayBuffer, PDFDocument>();

  if (widthMode === 'original') {
    for (const entry of entries) {
      const doc = await loadDoc(entry.source, docCache);
      const [copiedPage] = await newPdf.copyPages(doc, [entry.pageNum - 1]);
      copiedPage.setRotation(degrees(entry.rotation || 0));
      newPdf.addPage(copiedPage);
    }
  } else {
    type Slot = {
      embedded: PDFEmbeddedPage;
      rotation: number;
      effectiveWidth: number;
      effectiveHeight: number;
    };
    const slots: Slot[] = [];

    for (const entry of entries) {
      const doc = await loadDoc(entry.source, docCache);
      const sourcePage = doc.getPage(entry.pageNum - 1);
      const embedded = await newPdf.embedPage(sourcePage);
      const rotation = (((entry.rotation || 0) % 360) + 360) % 360;
      const swap = rotation % 180 !== 0;
      slots.push({
        embedded,
        rotation,
        effectiveWidth: swap ? embedded.height : embedded.width,
        effectiveHeight: swap ? embedded.width : embedded.height,
      });
    }

    const widths = slots.map((s) => s.effectiveWidth);
    let targetWidth: number;
    if (widthMode === 'min') targetWidth = Math.min(...widths);
    else if (widthMode === 'max') targetWidth = Math.max(...widths);
    else targetWidth = widths.reduce((sum, w) => sum + w, 0) / widths.length;

    for (const slot of slots) {
      const scale = targetWidth / slot.effectiveWidth;
      const pageWidth = targetWidth;
      const pageHeight = slot.effectiveHeight * scale;
      const page = newPdf.addPage([pageWidth, pageHeight]);

      const w = slot.embedded.width * scale;
      const h = slot.embedded.height * scale;

      // drawPage 围绕嵌入页左下角旋转，所以旋转后需要平移到可视区
      switch (slot.rotation) {
        case 90:
          page.drawPage(slot.embedded, { x: h, y: 0, width: w, height: h, rotate: degrees(90) });
          break;
        case 180:
          page.drawPage(slot.embedded, { x: w, y: h, width: w, height: h, rotate: degrees(180) });
          break;
        case 270:
          page.drawPage(slot.embedded, { x: 0, y: w, width: w, height: h, rotate: degrees(270) });
          break;
        default:
          page.drawPage(slot.embedded, { x: 0, y: 0, width: w, height: h });
      }
    }
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

// src/windows/Resume.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setContainerSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = useMemo(() => {
    const { width: cw, height: ch } = containerSize;
    const { width: pw, height: ph } = pageSize;

    // If we don't know sizes yet, fall back to default scale.
    if (!cw || !ch || !pw || !ph) return 1;

    // Fit the entire PDF page within the available viewport (no cropping).
    const padding = 16; // keep a small margin around the page
    const maxW = Math.max(cw - padding, 0);
    const maxH = Math.max(ch - padding, 0);

    return Math.min(maxW / pw, maxH / ph);
  }, [containerSize, pageSize]);

  return (
    <>
      <div
        id="window-header"
        className="flex items-center justify-between px-3 py-2 gap-2"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="resume" />
          <h2 className="font-medium text-sm">Resume.pdf</h2>
        </div>

        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <div ref={containerRef} className="resume-viewer">
        <Document file="/files/resume.pdf" onLoadError={(err) => console.error(err)}>
          <Page
            pageNumber={1}
            scale={scale}
            onLoadSuccess={(page) =>
              setPageSize({ width: page.originalWidth, height: page.originalHeight })
            }
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;

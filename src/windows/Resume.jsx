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
  const [loadError, setLoadError] = useState(null);

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

    if (!cw || !ch || !pw || !ph) return 1;

    // Fit the entire PDF page within the available viewport (no cropping).
    const padding = 16; // keep a small margin around the page
    const maxW = Math.max(cw - padding, 0);
    const maxH = Math.max(ch - padding, 0);

    // Guard against NaN / Infinity
    const next = Math.min(maxW / pw, maxH / ph);
    return Number.isFinite(next) && next > 0 ? next : 1;
  }, [containerSize, pageSize]);

  const handleDocumentLoadSuccess = async (pdf) => {
    try {
      setLoadError(null);

      // Use pdf.js viewport as the source of truth for page dimensions.
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      setPageSize({ width: viewport.width, height: viewport.height });
    } catch (err) {
      console.error(err);
      setLoadError(err);
    }
  };

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
        {loadError ? (
          <div className="text-sm text-gray-700">Failed to load resume.</div>
        ) : (
          <Document
            file="/files/resume.pdf"
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={(err) => {
              console.error(err);
              setLoadError(err);
            }}
            loading={<div className="text-sm text-gray-700">Loading resume…</div>}
          >
            <Page
              pageNumber={1}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        )}
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;

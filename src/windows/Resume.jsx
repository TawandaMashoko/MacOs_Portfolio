// src/windows/Resume.jsx
import React from 'react';
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

      <div className="p-4 overflow-auto h-full">
        <Document
          file="/files/resume.pdf"              // put resume.pdf in public/files/
          onLoadError={(err) => console.error(err)}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;

// src/windows/Resume.jsx
import React from 'react';
import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import { Download } from 'lucide-react';

const Resume = () => {
  return (
    <>
      <div
        id="window-header"
        className="flex items-center justify-between px-3 py-2 gap-2"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="resume" />
          <h2 className="font-medium text-sm">Resume</h2>
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

      <div className="resume-download">
        <a
          className="download-cta"
          href="/files/resume.pdf"
          download
          aria-label="Download resume PDF"
        >
          <span className="emoji" aria-hidden="true">😊</span>
          <span className="label-btn">Download</span>
        </a>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;

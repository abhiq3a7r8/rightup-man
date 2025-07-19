import React from 'react';
import { usePDF } from 'react-to-pdf';

export default function PdfGenerator({ aim, theory, conclusion }: any) {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  return (
    <div>
      <button
        onClick={() => {
          requestAnimationFrame(() => toPDF());
        }}
      >
        Download PDF
      </button>

      <div
        ref={targetRef}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          color: '#000',
          width: '600px',
          minHeight: '300px',
        }}
      >
        <h2>Aim</h2>
        <p>{aim}</p>

        <h2>Theory</h2>
        <p>{theory}</p>

        <h2>Conclusion</h2>
        <p>{conclusion}</p>
      </div>
    </div>
  );
}

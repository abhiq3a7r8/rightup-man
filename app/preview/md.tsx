import React from 'react';

const MarkdownFile = ({ aim, theory, conclusion }:any) => {
  const openMarkdownFile = () => {
    const markdownContent = `
# Experiment No.

## Aim
${aim}

## Theory
${theory}

## Conclusion
${conclusion}
    `;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Open the Markdown file in a new tab
    window.open(url);
  };

  return (
    <button onClick={openMarkdownFile}>Open Markdown</button>
  );
};

export default MarkdownFile;

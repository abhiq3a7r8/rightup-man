"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const generateMarkdownContent = (aim, theory, conclusion) => {
    return `
  <b>Aim:</b>
  ${aim}
  <b>hiii</b><br><br>
  
  <h1>Theory</h1>
  <p>${theory}</p><br>
  
  <h1>Conclusion</h1>
  <p>${conclusion}</p>
  `;
  };

export default function Home() {
  const [aim, setAim] = useState("");
  const [theory, setTheory] = useState("");
  const [conclusion, setConclusion] = useState("");

  useEffect(() => {
    setAim(sessionStorage.getItem("aim") || "Default aim text");
    setTheory(sessionStorage.getItem("theory") || "Default theory text");
    setConclusion(sessionStorage.getItem("conclusion") || "Default conclusion text");
  }, []);

  const saveAsMarkdown = () => {
    const content = generateMarkdownContent(aim, theory, conclusion);
    const blob = new Blob([content], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "writeup.md";
    link.click();
  };

  const markdown = generateMarkdownContent(aim, theory, conclusion);

  return (
    <div className="flex flex-row min-h-screen items-start gap-6 bg-slate-300 overflow-auto p-4">
      <button
        onClick={saveAsMarkdown}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save as .md
      </button>

      <div
        id="page"
        className="prose w-[794px] h-[1123px] bg-white mx-auto p-6 overflow-y-auto shadow-lg"
      >
        <div className="prose font-serif">
        <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            >
            {markdown}
        </Markdown>
        </div>
      </div>
    </div>
  );
}

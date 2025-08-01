"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PdfTW from "./pdftw";
import MarkdownFile from "./md";
import Pdf from "./pdf";
import PdfGenerator from "./react-to-pdf";
// import Pdf from "./pdf";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

//lolita express

export default function Home() {
  const [aim, setAim] = useState("");
  const [theory, setTheory] = useState("");
  const [conclusion, setConclusion] = useState("");

  useEffect(() => {
    setAim(sessionStorage.getItem("aim") || "Default aim text");
    setTheory(sessionStorage.getItem("theory") || "Default theory text");
    setConclusion(sessionStorage.getItem("conclusion") || "Default conclusion text");
  }, []);

  return (
    <div className="flex flex-row h-screen items-center gap-6">
      
      
      <div style={{ width: "90%", height: "100%", border: "1px solid #ccc" }}>
        <PDFViewer width="100%" height="100%">
          <PdfGenerator aim={aim} theory={theory} conclusion={conclusion} />
          
        </PDFViewer>
      </div>

      <PDFDownloadLink
        document={<PdfGenerator aim={aim} theory={theory} conclusion={conclusion} />}
        fileName="writeup.md"
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : (
            <button className="bg-black text-white px-4 py-2 rounded mx-10">
              Download PDF
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

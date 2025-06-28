"use client";

import { useEffect, useState } from "react";



export default function Home() {

  const [aim, setAim] = useState("");
  const [theory, setTheory] = useState("");
  const [conclusion, setConclusion] = useState("");

  useEffect(() => {
    const storedAim = sessionStorage.getItem("aim");
    const storedTheory = sessionStorage.getItem("theory");
    const storedConclusion = sessionStorage.getItem("conclusion");

    if (storedAim) setAim(storedAim);
    if (storedTheory) setTheory(storedTheory);
    if (storedConclusion) setConclusion(storedConclusion);
  }, []);


  return (
    <div className="flex flex-col w-full items-center justify-center">
      
      
      <div className="flex flex-col h-[842px] w-[595] border bg-white border-slate-400 mt-10 shadow-2xl">

        
        <section className="flex items-center justify-center w-full h-[82px] bg-pink-50">
        <div className="text-[14px] font-bold font-serif">EXPERIMENT NO. </div>
        </section>

        
        <section className="w-full h-full bg-blue-50 px-[32px]">
        <div className="h-auto w-full text-[12px] bg-amber-50 font-serif">
          <span className="font-bold">Aim:</span> {aim}
        </div>

        <div className="h-auto w-full text-[12px] bg-green-50 font-serif">
          <div className="font-bold">Theory:</div> 
          {theory}
        </div>

        <div className="h-auto w-full text-[12px] bg-orange-50 font-serif">
          <div className="font-bold">Conclusion:</div> 
          {conclusion}
        </div>
        </section>

      </div>
    </div>
  );
}

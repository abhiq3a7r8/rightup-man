"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Experiment {
  subject: string;
  expno: string;
  description: string;
}

export default function Editor() {

  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? "";
  const expno = searchParams.get("expno") ?? "";
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [aim, setAim] = useState<string | null>(null);
  const [theory, setTheory] = useState<string | null>(null);
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTable, setIsTable] = useState(false);
  const [block, addBlock] = useState([1]);
  
  


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//load experiments on page load

  useEffect(() => {
    fetch("/experiments.json")
      .then((res) => res.json())
      .then((data: Experiment[]) => {
        const match = data.find(
          (exp) =>
            exp.subject === subject &&
            exp.expno.trim() === expno.trim()
        );
        if (match) setDescription(match.description);
      });
  }, [subject, expno]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//pull from session storage

  useEffect(() => {
    const storedAim = sessionStorage.getItem("aim");
    const storedTheory = sessionStorage.getItem("theory");
    const storedConclusion = sessionStorage.getItem("conclusion");
  
    if (storedAim) setAim(storedAim);
    if (storedTheory) setTheory(storedTheory);
    if (storedConclusion) setConclusion(storedConclusion);
  }, []);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//load from session storage

  useEffect(() => {
    if (aim !== null) sessionStorage.setItem("aim", aim);
  }, [aim]);
  
  useEffect(() => {
    if (theory !== null) sessionStorage.setItem("theory", theory);
  }, [theory]);
  
  useEffect(() => {
    if (conclusion !== null) sessionStorage.setItem("conclusion", conclusion);
  }, [conclusion]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//button click functions

  function handleNavigation() {
    router.push(`/preview`)
  }

  const HandleCreateBlock = () => {
    addBlock([...block, block.length + 1])
  }


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//API call to backend
  
async function generateWriteup(
  type: "aim" | "theory" | "conclusion",
  useTable?: boolean 
) {
  if (!subject || !description) return;

  setLoading(true);
  try {
    const res = await fetch("http://localhost:8080/api/writeup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject,
        title: description,
        type,
        table: isTable
      })
    });

    const data = await res.json();

    if (type === "aim" && data.aim) setAim(data.aim);
    if (type === "theory" && data.theory) setTheory(data.theory);
    if (type === "conclusion" && data.conclusion) setConclusion(data.conclusion);
  } catch (err) {
    console.error("Failed to generate writeup:", err);
  } finally {
    setLoading(false);
  }
}



  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//rendering funcntion 

  return (
    <div className="flex flex-col h-screen w-full items-center p-6">
      <div className="text-xl font-bold mb-2 capitalize">{subject}</div>
      <div className="text-lg mb-6">
        Experiment {expno}: {description}
      </div>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Aim Editor*/}


      <div className="w-full max-w-3xl mb-4 bg-white shadow-xl p-4 rounded-md">
        <div className="font-semibold mb-2">Aim</div>
        <div className="min-h-[3rem] bg-slate-100 p-2 rounded text-sm">
          {aim ?? "Not generated yet"}
        </div>
        <Button
          onClick={() => generateWriteup("aim")}
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Theory Editor*/}


{block.map((id) => (
  <div key={id} className="w-full max-w-3xl bg-red-50 p-4 rounded-md">
    <div className="font-semibold mb-2">Theory</div>

    <div className="min-h-[3rem] bg-slate-100 p-2 rounded text-sm">
      {theory}
    </div>

    <div className="flex items-center gap-4 mt-3">
      <Button
        onClick={() => generateWriteup("theory", isTable)}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <div className="flex items-center gap-2">
        <Switch checked={isTable} onCheckedChange={setIsTable} />
        <p className="text-sm">
          Use Table:{" "}
          <span className="font-semibold">{isTable ? "ON" : "OFF"}</span>
        </p>
      </div>
    </div>
  </div>
))}




    <div className="h-10 w-full bg-slate-100 flex justify-center opacity-10 my-2 hover:opacity-100 max-w-3xl">
      <Button onClick={HandleCreateBlock}>add more</Button>
    </div>
    


{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Conclusion Editor*/}


      <div className="w-full max-w-3xl mb-4 bg-red-50 p-4 rounded-md">
        <div className="font-semibold mb-2">Conclusion</div>
        <div className="min-h-[3rem] bg-slate-100 p-2 rounded text-sm">
          {conclusion ?? "Not generated yet"}
        </div>
        <Button
          onClick={() => generateWriteup("conclusion")}
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Preview Button at bottom*/}

      <Button onClick={() => handleNavigation()}>Preview</Button>
    </div>
  );
}

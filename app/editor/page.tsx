"use client";

import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const storedAim = sessionStorage.getItem("aim");
    const storedTheory = sessionStorage.getItem("theory");
    const storedConclusion = sessionStorage.getItem("conclusion");
  
    if (storedAim) setAim(storedAim);
    if (storedTheory) setTheory(storedTheory);
    if (storedConclusion) setConclusion(storedConclusion);
  }, []);

  useEffect(() => {
    if (aim !== null) sessionStorage.setItem("aim", aim);
  }, [aim]);
  
  useEffect(() => {
    if (theory !== null) sessionStorage.setItem("theory", theory);
  }, [theory]);
  
  useEffect(() => {
    if (conclusion !== null) sessionStorage.setItem("conclusion", conclusion);
  }, [conclusion]);

  function handleNavigation() {
    router.push(`/preview`)
  }

  
  async function generateWriteup(type: "aim" | "theory" | "conclusion") {
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
          type
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
  

  return (
    <div className="flex flex-col h-screen w-full items-center p-6">
      <div className="text-xl font-bold mb-2 capitalize">{subject}</div>
      <div className="text-lg mb-6">
        Experiment {expno}: {description}
      </div>

      {/* Aim */}
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

      {/* Theory */}
      <div className="w-full max-w-3xl mb-4 bg-red-50 p-4 rounded-md">
        <div className="font-semibold mb-2">Theory</div>
        <div className="min-h-[3rem] bg-slate-100 p-2 rounded text-sm">
          {theory ?? "Not generated yet"}
        </div>
        <Button
          onClick={() => generateWriteup("theory")}
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {/* Conclusion */}
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
      <Button onClick={() => handleNavigation()}>Preview</Button>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
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
  const [description, setDescription] = useState("");
  const [atc, setATC] = useState(null);

  useEffect(() => {
    fetch("/experiments.json")
      .then((res) => res.json())
      .then((data: Experiment[]) => {
        const match = data.find(
          (exp) => exp.subject === subject && exp.expno.trim() === expno.trim()
        );
        if (match) setDescription(match.description);
      });
  }, [subject, expno]);

  async function handleAimGeneration({ subject, description }: { subject: string; description: string }) {
    const response = await fetch("http://localhost:8080/api/writeup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject,
        title: description,
        type: "theory"
      })
    });
  
    const data = await response.json();
    setATC(data.aim);
  }
  
  

  return (
    <div className="flex flex-col h-screen w-full items-center p-4">
      <div className="text-xl font-bold mb-2">{subject}</div>
      <div className="text-lg mb-4">Experiment {expno}: {description}</div>
      <div className="text-sm mb-2 flex flex-row bg-red-50 items-center">
        <div className="mx-4 font-bold">Aim</div> 
        <div className="h-10 w-96 bg-slate-200 items-center flex">{atc}</div>
        <Button onClick={() => handleAimGeneration({ subject, description })}>
            Generate
        </Button>

      </div>
      <div className="text-sm mb-2 flex flex-row bg-red-50 items-center">
        <div className="mx-4 font-bold">Theory</div> 
        <div className="h-10 w-96 bg-slate-200 items-center flex">hii</div>
        <Button>Generate</Button>
      </div>
      
      
    </div>
  );
}

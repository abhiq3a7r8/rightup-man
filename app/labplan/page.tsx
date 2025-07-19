"use client";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//Imports

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubjectSelector from "@/components/subjectselector";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
// Constants and Interfaces 

interface Experiment {
  subject: string;
  expno: string;
  description: string;
}

export default function TableDemo() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("sub");
  const router = useRouter();

  const [experiments, setExperiments] = useState<Experiment[]>([]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
// Load Json on page load

  useEffect(() => {
    fetch("/experiments.json")
      .then((res) => res.json())
      .then((data: Experiment[]) => {
        const filtered = data.filter((exp) => exp.subject === subject);
        setExperiments(filtered);
      });
  }, [subject]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
// Button click functions

  function handleClick(expno: string) {
    console.log("Clicked:", expno);
    sessionStorage.clear();
    router.push(`/editor/?subject=${subject}&expno=${expno}`);
    
  }
  
  return (
    
    <div className="flex flex-col h-screen w-full items-center border ">
    <div className="h-10 w-auto bg-slate-100 rounded flex items-center p-8 text-3xl mt-8">{subject}</div>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Drawer*/}

    <Drawer direction="top">
      <DrawerTrigger className="text-slate-700 rounded mb-10 mt-4 underline">
        Change Subject
      </DrawerTrigger>
      <DrawerContent className="items-center">
        <DrawerHeader>
          <DrawerTitle>Change Subject</DrawerTitle>
          <SubjectSelector />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Table*/}
    
    <Table className="w-[70%] mx-auto border border-black ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-center">Experiment No.</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {experiments.map((exp, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">{exp.expno}</TableCell>
            <TableCell
              onClick={() => handleClick(exp.expno)}
              className="whitespace-normal break-words cursor-pointer hover:bg-gray-100">
              {exp.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

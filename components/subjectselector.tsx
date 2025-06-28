"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SemesterSubject = {
  semester: string;
  subject: string;
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
// Setters and Getters 

export default function SubjectSelector() {
  const [data, setData] = useState<SemesterSubject[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const router = useRouter();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
// load json file immediately after page is rendered

  useEffect(() => {
    fetch("/semesters.json")
      .then((res) => res.json())
      .then((json: SemesterSubject[]) => {
        setData(json);
        const sems = [...new Set(json.map((item) => item.semester))];
        setSemesters(sems);
      });
  }, []);

  useEffect(() => {subjects
    const filteredSubjects = data
      .filter((item) => item.semester === selectedSemester)
      .map((item) => item.subject);
    setSubjects(filteredSubjects);
    setSelectedSubject(""); 
  }, [selectedSemester, data]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//button to go to the page with list of experiments for selected semester and subject

const handleNavigate = () => {
  const sem = encodeURIComponent(selectedSemester);
  const sub = encodeURIComponent(selectedSubject);
  router.push(`/labplan?sem=${sem}&sub=${sub}`);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=//
//dropdown for selecting semester 

  return (
      <div className="flex flex-col gap-y-8 w-96">
        <Select onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((sem) => (
              <SelectItem key={sem} value={sem}>
                {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*Dropdown for selecting subject */}

        <Select
          disabled={!selectedSemester}
          onValueChange={setSelectedSubject}
          value={selectedSubject}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subj) => (
              <SelectItem key={subj} value={subj}>
                {subj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
{/*submit button*/}
        
        <Button
          onClick={handleNavigate}
          className={`transition-opacity duration-300 ${
            selectedSemester && selectedSubject
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          Submit
        </Button>

{/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}

      </div>
    
  );
}

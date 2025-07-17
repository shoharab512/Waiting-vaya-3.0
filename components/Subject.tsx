"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBook } from "react-icons/fa";

const subjects = [
  "Physics 1st paper",
  "Physics 2nd paper",
  "Math 1st paper",
  "Math 2nd paper",
  "Chemistry 1st paper",
  "Chemistry 2nd paper",
];

export default function Subject({
  setInput,
  setSelectedSubject,
  selectedSubject,
  input,
}: {
  setInput: any;
  setSelectedSubject: any;
  selectedSubject: any;
  input: any;
}) {
  const handleSubjectChange = (subject: any) => {
    setSelectedSubject(subject);
    setInput((prevInput: any) => ({
      ...prevInput,
      subject: subject,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
        <FaBook className="mr-2" />
          {input.subject ? selectedSubject : "Subject"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Subject</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedSubject}
          onValueChange={handleSubjectChange}
        >
          {subjects.map((subject, index) => (
            <DropdownMenuRadioItem key={index} value={subject}>
              {subject}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

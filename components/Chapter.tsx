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
import { FaBookOpen } from "react-icons/fa";

const chaptersData = {
  "Physics 1st paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
    "Chapter 9",
    "Chapter 10",
  ],
  "Physics 2nd paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
    "Chapter 9",
    "Chapter 10",
    "Chapter 11",
  ],
  "Chemistry 1st paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ],
  "Chemistry 2nd paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ],
  "Math 1st paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
    "Chapter 9",
    "Chapter 10",
  ],
  "Math 2nd paper": [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
    "Chapter 9",
    "Chapter 10",
  ],
};

export default function Chapter({
  setInput,
  setSelectedChapter,
  selectedChapter,
  selectedSubject,
  input,
}: {
  setInput: any;
  input: any;
  selectedChapter: any;
  setSelectedChapter: any;
  selectedSubject: keyof typeof chaptersData;
}) {
  const chapters = chaptersData[selectedSubject] || [];

  const handleChapterChange = (chapter: any) => {
    setSelectedChapter(chapter);
    setInput((prevInput: any) => ({
      ...prevInput,
      chapter: chapter,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {" "}
          <FaBookOpen className="mr-2" />
          {input.chapter ? selectedChapter : "Chapter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Chapter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedChapter}
          onValueChange={handleChapterChange}
        >
          {chapters.map((chapter, index) => (
            <DropdownMenuRadioItem key={index} value={chapter}>
              {chapter}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

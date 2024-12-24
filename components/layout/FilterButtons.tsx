"use client";

import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/filter";

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        onClick={() => onFilterChange("all")}
        className="flex-1"
      >
        All
      </Button>
      <Button
        variant={currentFilter === "complete" ? "default" : "outline"}
        onClick={() => onFilterChange("complete")}
        className="flex-1"
      >
        Complete
      </Button>
      <Button
        variant={currentFilter === "incomplete" ? "default" : "outline"}
        onClick={() => onFilterChange("incomplete")}
        className="flex-1"
      >
        Incomplete
      </Button>
    </div>
  );
}

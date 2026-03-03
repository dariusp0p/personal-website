import React from "react";
import SearchBar from "./SearchBar";
import FilterCategories from "./FilterCategories";

interface ProjectSearchEngineProps {
  searchBarText: string;
  setSearchBarText: (text: string) => void;
  filters: { [category: string]: Set<string> };
  setFilters: React.Dispatch<
    React.SetStateAction<{ [category: string]: Set<string> }>
  >;
  categories: { name: string; fields: string[] }[];
}

const ProjectSearchEngine: React.FC<ProjectSearchEngineProps> = ({
  searchBarText,
  setSearchBarText,
  filters,
  setFilters,
  categories,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 border-b-2 border-muted">
      <div className="flex flex-row justify-between items-center">
        <SearchBar
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
        />
        <FilterCategories
          categories={categories}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default ProjectSearchEngine;

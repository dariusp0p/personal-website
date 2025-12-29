import React from "react";

interface ProjectFiltersProps {
  filters: {
    inProgress: boolean;
    deployed: boolean;
    tech: string[];
  };
  onStatusChange: (key: "inProgress" | "deployed") => void;
  onTechChange: (tech: string) => void;
  allTechs: string[];
}

export default function ProjectFilters({
  filters,
  onStatusChange,
  onTechChange,
  allTechs,
}: ProjectFiltersProps) {
  return (
    <aside className="md:w-64 w-full mb-4 md:mb-0">
      <div
        className="bg-card rounded-xl shadow-xl p-4 border-2 border-neutral-200 dark:border-neutral-700"
        style={{ borderStyle: "solid" }}
      >
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Status</h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.inProgress}
              onChange={() => onStatusChange("inProgress")}
              className="mr-2"
            />
            In Progress
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.deployed}
              onChange={() => onStatusChange("deployed")}
              className="mr-2"
            />
            Deployed
          </label>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <label key={tech} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.tech.includes(tech)}
                  onChange={() => onTechChange(tech)}
                  className="mr-1"
                />
                {tech}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

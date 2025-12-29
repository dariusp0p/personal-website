import React from "react";

interface ProjectSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFiltersClick?: () => void;
  showFiltersButton?: boolean;
}

const ProjectSearchBar: React.FC<ProjectSearchBarProps> = ({
  value,
  onChange,
  onFiltersClick,
  showFiltersButton = false,
}) => (
  <div className="relative flex w-full max-w-xl">
    <input
      type="text"
      placeholder="Search projects..."
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm focus:outline-none focus:ring bg-card text-card-foreground transition-all duration-200"
      style={{ borderStyle: "solid" }}
    />
    {showFiltersButton && onFiltersClick && (
      <button
        type="button"
        onClick={onFiltersClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center px-2 py-1 rounded text-blue-600 hover:bg-blue-50 dark:hover:bg-neutral-800 transition md:hidden"
        aria-label="Open filters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.586-1.414L2 6.707A1 1 0 012 6V4z"
          />
        </svg>
      </button>
    )}
  </div>
);

export default ProjectSearchBar;

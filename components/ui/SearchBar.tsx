import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface ProjectSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<ProjectSearchBarProps> = ({ value, onChange }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-4 px-2 py-1">
      {value === "" ? (
        <FiSearch className="w-5 h-5 text-accent-foreground" />
      ) : (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            inputRef.current?.focus();
          }}
          className="p-0 m-0 transition-transform duration-300 hover:scale-120"
        >
          <FiX className="w-6 h-6 text-destructive" />
        </button>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search projects..."
        className="bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground flex-1 transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default SearchBar;

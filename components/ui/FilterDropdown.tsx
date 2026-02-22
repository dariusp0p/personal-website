import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface FilterDropdownProps {
  category: { name: string; fields: string[] };
  filters: { [category: string]: Set<string> };
  setFilters: React.Dispatch<
    React.SetStateAction<{ [category: string]: Set<string> }>
  >;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  category,
  filters,
  setFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCount = filters[category.name]?.size || 0;

  const handleCheckbox = (field: string) => {
    setFilters((prev) => {
      const updated = new Set(prev[category.name]);
      if (updated.has(field)) {
        updated.delete(field);
      } else {
        updated.add(field);
      }
      return { ...prev, [category.name]: updated };
    });
  };

  // Handle open/close with fade
  useEffect(() => {
    if (open) setVisible(true);
    else {
      const timeout = setTimeout(() => setVisible(false), 200); // match duration-200
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <span
        className={`flex items-center cursor-pointer select-none transition-colors group ${
          open ? "text-accent-foreground" : "text-foreground"
        } hover:text-accent-foreground`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </span>
        {selectedCount > 0 && (
          <span className="mx-1 font-semibold text-accent-foreground">
            {selectedCount}
          </span>
        )}
        <FiChevronDown
          className={`ml-1 w-4 h-4 transition-colors ${
            open ? "text-accent-foreground" : "text-muted-foreground"
          } group-hover:text-accent-foreground`}
        />
      </span>
      {visible && (
        <div
          className={`absolute left-0 mt-2 min-w-[220px] bg-background border border-muted rounded shadow-lg p-2 z-10 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {category.fields.map((field) => (
            <label key={field} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={filters[category.name]?.has(field) || false}
                onChange={() => handleCheckbox(field)}
              />
              <span className="text-sm">{field}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterModal from "./FilterModal";
import { FiFilter, FiX } from "react-icons/fi";

interface FilterCategory {
  name: string;
  fields: string[];
}

interface FilterCategoriesProps {
  categories: FilterCategory[];
  filters: { [category: string]: Set<string> };
  setFilters: React.Dispatch<
    React.SetStateAction<{ [category: string]: Set<string> }>
  >;
}

const FilterCategories: React.FC<FilterCategoriesProps> = ({
  categories,
  filters,
  setFilters,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const maxDropdowns = 3;

  // Responsive check (simple, replace with useMediaQuery or Tailwind's hidden classes as needed)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const shouldUseModal = isMobile || categories.length > 3;

  const hasActiveFilters = Object.values(filters || {}).some(
    (set) => set && set.size > 0,
  );

  const activeFilterCount = Object.values(filters || {}).reduce(
    (sum, set) => sum + (set ? set.size : 0),
    0,
  );

  // Split categories for dropdowns and modal
  const dropdownCategories = Array.isArray(categories)
    ? categories.slice(0, maxDropdowns)
    : [];
  const modalCategories = Array.isArray(categories)
    ? categories.slice(maxDropdowns)
    : [];

  const clearFilters = () => {
    setFilters((prev) => {
      const next: { [category: string]: Set<string> } = {};
      Object.keys(prev || {}).forEach((key) => {
        next[key] = new Set<string>();
      });
      return next;
    });
  };

  return (
    <div className="flex items-center gap-3">
      {shouldUseModal ? (
        <>
          <div className="relative inline-flex items-center">
            <button
              className="p-2 rounded text-accent-foreground transition-transform duration-300 hover:scale-120 cursor-pointer"
              onClick={() => setModalOpen(true)}
              aria-label="Open filters"
            >
              <FiFilter size={20} />
            </button>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 min-w-[0.9rem] px-1 rounded-full bg-primary text-primary-foreground text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label="Clear all filters"
              className="p-0 m-0 transition-transform duration-300 hover:scale-120"
            >
              <FiX className="w-6 h-6 text-destructive cursor-pointer" />
            </button>
          )}{" "}
          {modalOpen && (
            <FilterModal
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              onClose={() => setModalOpen(false)}
            />
          )}
        </>
      ) : (
        <>
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.name}>
              <FilterDropdown
                category={cat}
                filters={filters}
                setFilters={setFilters}
              />
              {idx < categories.length - 1 && (
                <div className="mx-3 h-6 border-l border-muted" />
              )}
            </React.Fragment>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label="Clear all filters"
              className="p-0 m-0 transition-transform duration-300 hover:scale-120"
            >
              <FiX className="w-6 h-6 text-destructive" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FilterCategories;

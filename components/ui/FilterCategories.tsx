import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterModal from "./FilterModal";
import { FiFilter } from "react-icons/fi";

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

  // Split categories for dropdowns and modal
  const dropdownCategories = Array.isArray(categories)
    ? categories.slice(0, maxDropdowns)
    : [];
  const modalCategories = Array.isArray(categories)
    ? categories.slice(maxDropdowns)
    : [];

  return (
    <div className="flex items-center gap-3">
      {isMobile ? (
        <>
          <button
            className="p-2 rounded text-accent-foreground"
            onClick={() => setModalOpen(true)}
          >
            <FiFilter size={20} />
          </button>
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
          {dropdownCategories.map((cat, idx) => (
            <React.Fragment key={cat.name}>
              <FilterDropdown
                category={cat}
                filters={filters}
                setFilters={setFilters}
              />
              {idx < dropdownCategories.length - 1 && (
                <div className="mx-3 h-6 border-l border-muted" />
              )}
            </React.Fragment>
          ))}
          {modalCategories.length > 0 && (
            <>
              <button
                className="p-2 rounded text-accent-foreground"
                onClick={() => setModalOpen(true)}
              >
                More Filters
              </button>
              {modalOpen && (
                <FilterModal
                  categories={modalCategories}
                  filters={filters}
                  setFilters={setFilters}
                  onClose={() => setModalOpen(false)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FilterCategories;

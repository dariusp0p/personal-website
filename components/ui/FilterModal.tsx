import React from "react";
import { FiArrowLeft } from "react-icons/fi";

interface FilterCategory {
  name: string;
  fields: string[];
}

interface FilterModalProps {
  categories: FilterCategory[];
  filters: { [category: string]: Set<string> };
  setFilters: React.Dispatch<
    React.SetStateAction<{ [category: string]: Set<string> }>
  >;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  categories,
  filters,
  setFilters,
  onClose,
}) => {
  const handleCheckbox = (categoryName: string, field: string) => {
    setFilters((prev) => {
      const updated = new Set(prev[categoryName]);
      if (updated.has(field)) {
        updated.delete(field);
      } else {
        updated.add(field);
      }
      return { ...prev, [categoryName]: updated };
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs mt-24 px-4">
      <div className="bg-primary rounded-lg shadow-lg p-6 w-full max-w-md border-2 border-border">
        <button
          className="mb-4 text-secondary-foreground flex items-center gap-1 transition-transform duration-200 hover:scale-105 hover:text-accent-foreground cursor-pointer"
          onClick={onClose}
        >
          <FiArrowLeft />
          Close
        </button>
        {categories.map((cat) => (
          <div key={cat.name} className="mb-4">
            <div className="text-secondary-foreground font-semibold mb-2">
              {cat.name}
            </div>
            {cat.fields.map((field) => (
              <label key={field} className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[cat.name]?.has(field) || false}
                  onChange={() => handleCheckbox(cat.name, field)}
                />
                <span className="text-primary-foreground text-sm cursor-pointer hover:text-accent-foreground transition-colors duration-100">
                  {field}
                </span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;

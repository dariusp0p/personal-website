import React from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          className="mb-4 px-3 py-1 rounded bg-accent-foreground text-background"
          onClick={onClose}
        >
          Close
        </button>
        {categories.map((cat) => (
          <div key={cat.name} className="mb-4">
            <div className="font-semibold mb-2">{cat.name}</div>
            {cat.fields.map((field) => (
              <label key={field} className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[cat.name]?.has(field) || false}
                  onChange={() => handleCheckbox(cat.name, field)}
                />
                <span className="text-sm">{field}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;

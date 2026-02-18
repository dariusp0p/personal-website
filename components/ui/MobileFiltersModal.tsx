import React, { useEffect, useRef, useState } from "react";
import ProjectFilters from "@/components/ui/ProjectFilters";

interface MobileFiltersModalProps {
  open: boolean;
  onClose: () => void;
  filters: {
    inProgress: boolean;
    deployed: boolean;
    tech: string[];
  };
  onStatusChange: (key: "inProgress" | "deployed") => void;
  onTechChange: (tech: string) => void;
  allTechs: string[];
}

const MODAL_TOP_OFFSET = 112; // px, adjust as needed
const MODAL_SIDE_MARGIN = 12; // px, adjust as needed

const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  open,
  onClose,
  filters,
  onStatusChange,
  onTechChange,
  allTechs,
}) => {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else if (visible) {
      setClosing(true);
      closeTimeout.current = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 300); // match animation duration
    }
    // Cleanup timeout on unmount
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
    // eslint-disable-next-line
  }, [open]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex md:hidden pointer-events-none">
      {/* Overlay with blur, visible but blurred */}
      <div
        className="fixed inset-0 transition-opacity pointer-events-auto"
        style={{
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />
      {/* Sidebar with slide-in/out animation, lower under navbar, with left margin */}
      <div
        className={`fixed z-50 pointer-events-auto overflow-y-auto`}
        style={{
          top: MODAL_TOP_OFFSET,
          left: MODAL_SIDE_MARGIN,
          width: "calc(75vw - 12px)",
          maxWidth: "320px",
          height: `calc(100vh - ${MODAL_TOP_OFFSET + MODAL_SIDE_MARGIN}px)`,
          background: "transparent",
          animation: `${
            closing ? "slideOutLeft" : "slideInLeft"
          } 0.3s cubic-bezier(0.4,0,0.2,1) forwards`,
        }}
      >
        <div className="h-full bg-card shadow-lg rounded-lg relative">
          <ProjectFilters
            filters={filters}
            onStatusChange={onStatusChange}
            onTechChange={onTechChange}
            allTechs={allTechs}
          />
          <button
            className="absolute top-2 right-2 text-lg font-bold text-neutral-700 dark:text-neutral-200"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
      </div>
      {/* Slide-in/out keyframes */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0.5;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileFiltersModal;

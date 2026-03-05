import React from "react";
import { FiGithub, FiGlobe } from "react-icons/fi";

export interface ProjectLink {
  type: string;
  value: string;
}

interface ProjectDetailsProps {
  title: string;
  description: string;
  tech: string[];
  inProgress: boolean;
  deployed: boolean;
  links?: ProjectLink[];
}

const linkIcon: Record<string, React.ReactNode> = {
  github: <FiGithub className="text-lg" />,
  website: <FiGlobe className="text-lg" />,
};

const linkLabel: Record<string, string> = {
  github: "GitHub",
  website: "Website",
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  description,
  tech,
  inProgress,
  deployed,
  links = [],
}) => {
  return (
    <section className="py-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border
                  text-sm font-medium text-card-foreground bg-transparent
                  hover:bg-muted transition-colors duration-200"
              >
                {linkIcon[link.type] || <FiGlobe className="text-lg" />}
                {linkLabel[link.type] || link.type}
              </a>
            ))}
          </div>
        )}
      </div>
      <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {tech.map((t, idx) => (
          <span
            key={idx}
            className="bg-muted text-xs text-card-foreground px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
      {(deployed || inProgress) && (
        <div className="flex gap-2">
          {deployed && (
            <span className="flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
              Deployed
            </span>
          )}
          {inProgress && (
            <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1.5"></span>
              In Progress
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectDetails;

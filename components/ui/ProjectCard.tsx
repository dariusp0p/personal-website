import React from "react";

interface ProjectCardProps {
  title: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
  inProgress: boolean;
  deployed: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  name,
  description,
  tech,
  link,
  inProgress,
  deployed,
}) => {
  return (
    <div
      className="relative bg-card rounded-xl shadow-xl p-4 flex flex-col max-w-xl mx-auto mb-8
        border-2 border-neutral-200 dark:border-neutral-700
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:border-blue-500 dark:hover:border-blue-500"
      style={{ borderStyle: "solid" }}
    >
      <div className="absolute bottom-4 right-4 flex gap-2">
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
      {/* <ThumbnailCarousel images={images} alt={title} /> */}
      <h3 className="text-2xl font-bold mb-1 text-card-foreground">{title}</h3>
      <h4 className="text-2xl mb-2 text-card-foreground">"{name}"</h4>
      <p className="text-base mb-3 text-card-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tech.map((t, idx) => (
          <span
            key={idx}
            className="bg-neutral-200 dark:bg-neutral-700 text-xs px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex-1" />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 underline decoration-transparent font-semibold hover:decoration-blue-600 decoration-1 underline-offset-2 transition-all duration-200"
        style={{ marginTop: "auto" }}
      >
        Go to page &rarr;
      </a>
    </div>
  );
};

export default ProjectCard;

import React from "react";

interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, name }) => (
  <div
    className="flex flex-col items-center justify-center bg-card rounded-lg shadow p-4 w-24 h-28
    border-2 border-neutral-200 dark:border-neutral-700
    transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
    style={{ borderStyle: "solid" }}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <span className="text-sm font-medium text-card-foreground">{name}</span>
  </div>
);

export default SkillCard;

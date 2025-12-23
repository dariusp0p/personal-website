import React from "react";
import SkillCard from "../SkillCard";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaPhp,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTailwindcss,
  SiQt,
  SiSelenium,
  SiMysql,
  SiSqlite,
} from "react-icons/si";

const skills = [
  { icon: <FaPython />, name: "Python" },
  { icon: <FaNodeJs />, name: "JavaScript" },
  { icon: <FaNodeJs />, name: "TypeScript" },
  { icon: <SiCplusplus />, name: "C++" },
  { icon: <FaPhp />, name: "PHP" },
  { icon: <FaReact />, name: "React" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <FaPython />, name: "Django" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <FaBootstrap />, name: "Bootstrap" },
  { icon: <SiQt />, name: "Qt" },
  { icon: <SiQt />, name: "PyQt" },
  { icon: <SiSelenium />, name: "Selenium" },
  { icon: <SiMysql />, name: "MySQL" },
  { icon: <SiSqlite />, name: "SQLite" },
  { icon: <FaDatabase />, name: "SQL Server" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center bg-background p-4 lg:p-64 lg:pt-10 lg:pb-16"
    >
      <h2 className="text-5xl font-bold mb-10 text-left w-full max-w-4xl mx-auto">
        Skills
      </h2>
      <div className="flex flex-wrap gap-6 justify-center max-w-4xl w-full mx-auto">
        {skills.map((skill, idx) => (
          <SkillCard key={idx} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

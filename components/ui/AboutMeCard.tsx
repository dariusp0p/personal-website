"use client";

import React, { useState, useRef, useEffect } from "react";

interface AboutMeCardProps {
  paragraphs: string[];
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({ paragraphs }) => {
  const [showMore, setShowMore] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const shortText = paragraphs[0];
  const moreText = paragraphs.slice(1);

  useEffect(() => {
    if (showMore && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else if (contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      setTimeout(() => setMaxHeight("0px"), 10);
    }
  }, [showMore, paragraphs]);

  return (
    <div className="container mx-auto px-4">
      <div className="bg-card rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-left text-card-foreground">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6 text-card-foreground text-justify hyphens-auto">
            {shortText}
            {!showMore && ".."}
          </p>

          <div
            ref={contentRef}
            style={{
              maxHeight,
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {moreText.map((text, idx) => (
              <p
                key={idx}
                className={`text-lg mb-4 text-card-foreground text-justify hyphens-auto transition-opacity duration-300`}
                style={{
                  opacity: showMore ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {moreText.length > 0 && (
            <button
              className="text-blue-600 underline decoration-transparent font-semibold hover:decoration-blue-600 decoration-1 underline-offset-2 transition-all duration-200 focus:outline-none cursor-pointer"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;

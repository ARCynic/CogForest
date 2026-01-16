import React from "react";
import { clsx } from "clsx";

/**
 * SectionGrid
 * - Sticky subsection headers
 * - Pure grid layout (no card styling)
 * - Sections = categories/subsections
 */
export function SectionGrid({
  sections,
  renderCard,
  keyExtractor,
  onSectionPress,
  contentPaddingClassName = "p-0",
  gridClassName = "grid-cols-1 lg:grid-cols-2",
  ListEmptyComponent
}) {
  return (
    <div className={clsx("w-full", contentPaddingClassName)}>
      {sections.map((section) => {
        const hasData = section.data?.length > 0;

        return (
          <div key={section.id} className="mb-10 last:mb-0">
            {/* Sticky Header */}
            <div className="sticky top-[92px] z-10 pb-4 pt-2">
              <header
                className={clsx(
                  "flex items-center justify-between rounded-2xl",
                  "bg-black/55 ring-1 ring-white/10 backdrop-blur",
                  "px-4 py-3",
                  onSectionPress ? "cursor-pointer hover:bg-black/65" : ""
                )}
                onClick={() => onSectionPress?.(section.id)}
                role={onSectionPress ? "button" : "heading"}
                tabIndex={onSectionPress ? 0 : -1}
                aria-level={2}
              >
                <div className="flex-1 mr-4 min-w-0">
                  <h2 className="text-sm sm:text-2xl font-semibold tracking-tight text-white">
                    {section.title}
                  </h2>
                  {section.subtitle ? (
                    <p className="text-s text-white/60 mt-0.5 ">
                      {section.subtitle}
                    </p>
                  ) : null}
                </div>
                {section.rightAccessory ? <div>{section.rightAccessory}</div> : null}
              </header>
            </div>

            {/* Grid Content */}
            {hasData ? (
              <div className={clsx("grid gap-4", gridClassName)}>
                {section.data.map((item, index) => {
                  const itemKey = keyExtractor
                    ? keyExtractor(item, index)
                    : item?.id || `${section.id}-${index}`;

                  return (
                    <div key={itemKey} className="min-w-0">
                      {renderCard(item, section)}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-4">
                {ListEmptyComponent || (
                  <p className="text-white/45 italic text-sm">No items in this section.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SectionGrid;
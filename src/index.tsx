import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
/**
 * Tracks the given element ids and returns the active section
 * @param elementIds
 * @returns the index of the selected id in the array
 */
export const useSimplyScrollSpy = (elementIds: string[]) => {
  const [activeSection, setActiveSection] = useState(() => {
    const currentHash = location.hash;
    const targetIndex = currentHash
      ? elementIds.findIndex((id) => `#${id}` === currentHash)
      : undefined;

    if (targetIndex && targetIndex > 0) {
      return targetIndex;
    }
    return 0;
  });

  // Sync the URL hash
  useEffect(() => {
    const currentHash = location.hash;
    const sectionHash = `#${elementIds[activeSection]}`;
    // If we have the updated hash just ignore
    if (currentHash === sectionHash) {
      return;
    }
    history.pushState(undefined, "", sectionHash);
  }, [activeSection]);

  const handle = throttle(() => {
    let currentSectionId = activeSection;
    const sectionElements: HTMLElement[] = [];
    for (const id of elementIds) {
      const ele = document.getElementById(id);
      if (ele) {
        sectionElements.push(ele);
      }
    }

    for (let i = 0; i < sectionElements.length; i++) {
      const section = sectionElements[i];
      // Needs to be a valid DOM Element
      if (!section || !(section instanceof Element)) continue;
      // GetBoundingClientRect returns values relative to viewport
      if (section.getBoundingClientRect().top + -80 < 0) {
        currentSectionId = i;
        continue;
      }
      // No need to continue loop, if last element has been detected
      break;
    }

    setActiveSection(currentSectionId);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handle);

    // Run initially
    handle();

    return () => {
      window.removeEventListener("scroll", handle);
    };
  }, [elementIds]);

  return activeSection;
};

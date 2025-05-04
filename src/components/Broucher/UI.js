"use client";
import { useState, useEffect } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

// Simple state management
const createState = (initialValue) => {
  let value = initialValue;
  const listeners = new Set();

  return {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      listeners.forEach((listener) => listener(value));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

const pageState = createState(0);

export function UI() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const unsubscribe = pageState.subscribe((newPage) => {
      setCurrentPage(newPage);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-auto select-none z-10">
      <nav className="flex flex-col justify-between h-full">
        <div className="buttons-container overflow-auto flex justify-center p-10">
          {pages.map((_, index) => (
            <button
              key={index}
              className={`page-button mx-2 px-4 py-2 rounded-full ${
                currentPage === index
                  ? "bg-white text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => pageState.set(index)}
            >
              {index === 0 ? "Cover" : `Page ${index}`}
            </button>
          ))}
          <button
            className={`page-button mx-2 px-4 py-2 rounded-full ${
              currentPage === pages.length
                ? "bg-white text-black"
                : "bg-black/30 text-white"
            }`}
            onClick={() => pageState.set(pages.length)}
          >
            Back Cover
          </button>
        </div>
      </nav>
    </div>
  );
}

export const getPageState = () => pageState.get();
export const setPageState = (page) => pageState.set(page);
export const subscribeToPageState = (listener) => pageState.subscribe(listener);

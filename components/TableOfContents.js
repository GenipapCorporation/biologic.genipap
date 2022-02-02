import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);
  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4")
    );
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);
  return { nestedHeadings };
}

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];
  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;
    if(heading.nodeName === "H1") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H2" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    } 
  });
  return nestedHeadings;
}

function Headings ({ headings }) {

  const [showList, setShowList] = useState(false);

  return (
    <div className="mt-16 bg-gray-50 max-w-xs lg:sticky lg:top-16 lg:flex-shrink-0 lg:w-[20rem]">
      <button className="text-lg font-bold p-6 py-4 w-full flex justify-between items-center" onClick={() => setShowList(priorState => !priorState)}>Table of contents
        { showList ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" /> }
      </button>
      {showList ? <ul className="list-decimal list-inside leading-loose p-6 pt-0 text-sm lg:max-h-[32rem] lg:overflow-y-scroll">
        {headings.map((heading) => (
          <li key={heading.title} className="list-item">
            <a href={`#${heading.id}`} className="text-blue-600 hover:underline">{heading.title}</a>
            {heading.items.length > 0 && (
              <ul className="list-disc">
                {heading.items.map((child) => (
                  <li key={child.id} className="list-item ml-8">
                    <a href={`#${child.id}`} className="text-blue-600 hover:underline">{child.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul> : null}
    </div>
  )
}

export default function TableOfContents() {
  const { nestedHeadings } = useHeadingsData();
  return (
      <nav aria-label="Table of contents">
          <Headings headings={nestedHeadings} />
      </nav>
  );
};
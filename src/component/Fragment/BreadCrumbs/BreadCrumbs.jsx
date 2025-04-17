// Breadcrumbs.js
import React from "react";
import PropTypes from "prop-types";

export const Breadcrumbs = ({ items }) => {
  return (
    <nav>
      <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        {items.map((item, index) => (
          <li
            key={index}
            class="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['']"
            aria-current="page"
          >
            {item.link ? (
              <a className="text-white opacity-50" href={item.link}>
                {index > 0 && <span>/</span>}
                {item.label}
              </a>
            ) : (
              <span
                className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <h6 class="mb-0 font-bold text-white capitalize">
        {items[items.length - 1]?.label}
      </h6>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

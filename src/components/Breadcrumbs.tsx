import * as React from "react";
import { v4 as uuid } from "uuid";
import { CategoryLink } from "../types/kg";
import { twMerge } from "tailwind-merge";

export interface BreadcrumbsProps {
  currentPage: string;
  links?: CategoryLink[];
  containerCss?: string;
}

const Breadcrumbs = ({
  links,
  currentPage,
  containerCss,
}: BreadcrumbsProps) => {
  return (
    <div className={twMerge("py-2 text-sm", containerCss)}>
      <span>
        <a className="text-dark-orange" href="/">
          Toast
        </a>
        {(currentPage || links) && <span className="px-2">/</span>}
      </span>
      {links?.map((link) => {
        return (
          <span key={uuid()}>
            <a className="text-dark-orange" href={link.slug}>
              {link.name}
            </a>
            <span className="px-2">/</span>
          </span>
        );
      })}
      {currentPage && <span>{currentPage}</span>}
    </div>
  );
};

export default Breadcrumbs;

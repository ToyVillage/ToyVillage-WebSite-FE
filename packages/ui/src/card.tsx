import { type JSX } from "react";

export function Card({
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      href={`${href}`}
      // rel="noopener noreferrer"
      // target="_blank"
    >
      <h2 style={{backgroundColor: "wheat"}}>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}

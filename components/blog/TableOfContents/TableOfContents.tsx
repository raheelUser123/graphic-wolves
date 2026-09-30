'use client';

import { useMemo, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<(h[23])[^>]*(?:id=["']([^"']+)["'])?[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  let counter = 0;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1].replace('h', ''), 10);
    const rawId = match[2];
    const text = match[3].replace(/<[^>]*>/g, '').trim();
    if (!text) continue;
    const id = rawId || `heading-${counter}`;
    headings.push({ id, text, level });
    counter++;
  }
  return headings;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [open, setOpen] = useState(true);
  const headings = useMemo(() => extractHeadings(content), [content]);

  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <button
        className={styles.tocHeader}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.tocTitle}>On this Page</span>
        <span
          className={`${styles.tocChevron} ${open ? styles.tocChevronOpen : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {open && (
        <ol className={styles.tocList}>
          {headings.map((h) => (
            <li
              key={h.id}
              className={`${styles.tocItem} ${h.level === 3 ? styles.tocItemNested : ''}`}
            >
              <a
                href={`#${h.id}`}
                className={styles.tocLink}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                  }
                  // Fallback: match the section by its heading text.
                  const target = Array.from(
                    document.querySelectorAll('h2, h3')
                  ).find(
                    (heading) =>
                      heading.textContent?.trim().toLowerCase() ===
                      h.text.toLowerCase()
                  );
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

import { useMemo, useCallback, useRef, useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        {lang && <span className="code-block-lang">{lang}</span>}
        <button
          onClick={handleCopy}
          className="code-block-copy"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-block">
        <code
          className={`language-${lang || "text"}`}
          dangerouslySetInnerHTML={{ __html: escapeHtml(code) }}
        />
      </pre>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface ParsedBlock {
  type: "code" | "html";
  lang?: string;
  code?: string;
  html?: string;
}

function parseMarkdown(md: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  let remaining = md;

  // Split on code fences
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(remaining)) !== null) {
    // Push HTML content before this code block
    const before = remaining.slice(lastIndex, match.index);
    if (before.trim()) {
      blocks.push({ type: "html", html: parseInlineMarkdown(before) });
    }
    // Push code block
    blocks.push({ type: "code", lang: match[1] || "text", code: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }

  // Push remaining HTML content
  const after = remaining.slice(lastIndex);
  if (after.trim()) {
    blocks.push({ type: "html", html: parseInlineMarkdown(after) });
  }

  return blocks;
}

function parseInlineMarkdown(md: string): string {
  let html = md;

  // Inline code (before other inline transforms)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|.*\|(?:\n|$))+)/g,
    (_match, tableContent: string) => {
      const rows = tableContent.trim().split("\n");
      if (rows.length < 2) return tableContent;

      const headerCells = rows[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");

      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<div class="table-wrapper"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
    }
  );

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Task lists
  html = html.replace(/^(\s*)- \[x\] (.+)$/gm, '$1<li class="task-done">✅ $2</li>');
  html = html.replace(/^(\s*)- \[ \] (.+)$/gm, '$1<li class="task-open">☐ $2</li>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Paragraphs — only wrap lines that aren't already HTML tags or blank
  html = html.replace(/^(?!<[a-z/]|\s*$)(.+)$/gm, "<p>$1</p>");

  // Clean up empty paragraphs and excess whitespace between block elements
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/(<\/(h[1-4]|ul|div|table|hr|p)>)\s*\n\s*\n+/g, "$1\n");

  return html;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="prose-content">
      {blocks.map((block, i) =>
        block.type === "code" ? (
          <CodeBlock key={i} lang={block.lang || "text"} code={block.code || ""} />
        ) : (
          <div key={i} dangerouslySetInnerHTML={{ __html: block.html || "" }} />
        )
      )}
    </div>
  );
}

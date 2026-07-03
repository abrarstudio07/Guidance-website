import { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
}

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="code-block"><code class="language-${lang || "text"}">${escapedCode.trim()}</code></pre>`;
  });

  // Inline code
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

  // Unordered lists (handle nested with indentation)
  html = html.replace(/^(\s*)- \[x\] (.+)$/gm, '$1<li class="task-done">✅ $2</li>');
  html = html.replace(/^(\s*)- \[ \] (.+)$/gm, '$1<li class="task-open">☐ $2</li>');
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs - wrap lines that aren't already wrapped in HTML
  html = html.replace(/^(?!<[a-z/]|\s*$)(.+)$/gm, "<p>$1</p>");

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

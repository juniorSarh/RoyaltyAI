import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for different markdown elements
          h1: ({ children }) => <h1 className="text-xl font-bold text-indigo-300 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold text-indigo-300 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold text-indigo-300 mb-1">{children}</h3>,
          p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-sm">{children}</li>,
          code: ({ className: codeClassName, children, ...props }) => {
            const isInline = !codeClassName?.includes('language-');
            return isInline ? (
              <code className="bg-indigo-900/50 text-indigo-300 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            ) : (
              <code className="block bg-[#0b0f1a] text-indigo-300 p-3 rounded-lg overflow-x-auto text-sm" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-[#0b0f1a] p-3 rounded-lg overflow-x-auto mb-2 border border-indigo-400/20">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-400 pl-4 py-2 mb-2 bg-indigo-900/20 rounded-r">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-indigo-400 hover:text-indigo-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold text-indigo-200">{children}</strong>,
          em: ({ children }) => <em className="italic text-indigo-200">{children}</em>,
          hr: () => <hr className="border-indigo-400/20 my-4" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-indigo-900/30">{children}</thead>,
          th: ({ children }) => (
            <th className="border border-indigo-400/20 px-3 py-2 text-left text-indigo-300 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-indigo-400/20 px-3 py-2 text-sm">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

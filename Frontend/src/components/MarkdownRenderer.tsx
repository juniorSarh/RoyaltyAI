import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "../styles/markdown.css";

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
          // Custom component styling
          h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
          h2: ({children}) => <h2 className="text-xl font-bold mb-3 text-gray-900">{children}</h2>,
          h3: ({children}) => <h3 className="text-lg font-bold mb-2 text-gray-900">{children}</h3>,
          p: ({children}) => <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>,
          ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-800 space-y-1">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-800 space-y-1">{children}</ol>,
          li: ({children}) => <li className="text-gray-800">{children}</li>,
          strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-800">{children}</em>,
          code: ({children, className}) => {
            const isInline = !className;
            return isInline ? 
              <code className="bg-gray-100 text-gray-900 px-1 py-0.5 rounded text-sm">{children}</code> :
              <code className="block bg-gray-100 text-gray-900 p-3 rounded text-sm font-mono overflow-x-auto">{children}</code>;
          },
          blockquote: ({children}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 bg-gray-50 text-gray-700 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

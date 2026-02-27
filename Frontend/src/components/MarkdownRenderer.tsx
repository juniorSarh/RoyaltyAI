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
          // Enhanced custom component styling
          h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-gray-200 pb-2">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-1 mt-6">{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-bold mb-3 text-gray-900 mt-4">{children}</h3>,
          h4: ({children}) => <h4 className="text-lg font-semibold mb-2 text-gray-900 mt-3">{children}</h4>,
          p: ({children}) => <p className="mb-4 text-gray-800 leading-relaxed text-base">{children}</p>,
          ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-800 space-y-2 bg-gray-50 rounded-lg p-4">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-800 space-y-2 bg-blue-50 rounded-lg p-4">{children}</ol>,
          li: ({children}) => <li className="text-gray-800 leading-relaxed">{children}</li>,
          strong: ({children}) => <strong className="font-bold text-gray-900 bg-yellow-100 px-1 rounded">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-800 underline decoration-2 decoration-blue-200">{children}</em>,
          code: ({children, className}) => {
            const isInline = !className;
            return isInline ? 
              <code className="bg-red-100 text-red-900 px-2 py-1 rounded-md text-sm font-mono font-semibold">{children}</code> :
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-gray-700">{children}</code>;
          },
          blockquote: ({children}) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-4 bg-blue-50 text-gray-700 italic rounded-r-lg">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-2 border-gray-200 my-8 rounded-full" />,
          table: ({children}) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({children}) => <thead className="bg-gray-100">{children}</thead>,
          th: ({children}) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">{children}</th>,
          td: ({children}) => <td className="border border-gray-300 px-4 py-2 text-gray-800">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

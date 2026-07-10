import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Message({ content }) {
  return (
    <div className="max-w-none text-[15px] leading-7 text-[#F2F1EC]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-8 mb-4 text-3xl font-bold text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mt-7 mb-3 text-2xl font-semibold text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mt-6 mb-3 text-xl font-semibold text-white">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-4 leading-8 text-[#E5E5E5]">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-7">
              {children}
            </li>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-[#D4AF37] pl-4 italic text-gray-400">
              {children}
            </blockquote>
          ),

          hr: () => (
            <hr className="my-8 border-[#2b2b2d]" />
          ),

          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse border border-[#2b2b2d]">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-[#18181b]">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th className="border border-[#2b2b2d] px-4 py-3 text-left font-semibold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-[#2b2b2d] px-4 py-3">
              {children}
            </td>
          ),

          img: ({ ...props }) => (
            <img
              className="my-5 rounded-xl"
              {...props}
            />
          ),

          a: ({ children, ...props }) => (
            <a
              className="text-[#D4AF37] underline underline-offset-4 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),

          code({ inline, className, children, ...props }) {
            return inline ? (
              <code
                className="rounded bg-[#1f1f23] px-1.5 py-1 font-mono text-[14px] text-[#F4C542]"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="my-5 overflow-x-auto rounded-xl bg-[#141416] p-5">
                <code
                  className={`${className ?? ""} text-[14px] leading-6`}
                  {...props}
                >
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface ReportDisplayProps {
  report: string;
}

const CodeSnippet: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative my-4 group">
            <pre className="bg-gray-900 rounded-md p-4 text-sm overflow-x-auto">
                <code>{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="copy-button absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md text-gray-400 hover:bg-gray-600 hover:text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label={copied ? "Copied" : "Copy code"}
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}
            </button>
        </div>
    );
};

// Component to parse and render markdown-like text with bold support
const FormattedLine: React.FC<{ line: string }> = ({ line }) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
        <p className="text-gray-300 leading-relaxed">
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-black-200">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </p>
    );
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                // End of code block
                elements.push(<CodeSnippet key={`code-${index}`} code={codeLines.join('\n')} />);
                codeLines = [];
                inCodeBlock = false;
            } else {
                // Start of code block
                inCodeBlock = true;
            }
        } else if (inCodeBlock) {
            codeLines.push(line);
        } else {
            // Regular line rendering
            if (line.startsWith('### ')) {
                elements.push(<h3 key={index} className="text-xl font-bold text-cyan-400 border-b border-gray-600 pb-2 mt-6 mb-3">{line.substring(4)}</h3>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={index} className="text-2xl font-bold text-cyan-300 border-b-2 border-gray-600 pb-2 mt-8 mb-4">{line.substring(3)}</h2>);
            } else if (line.startsWith('# ')) {
                elements.push(<h1 key={index} className="text-3xl font-extrabold text-cyan-200 border-b-2 border-gray-500 pb-3 mt-10 mb-5">{line.substring(2)}</h1>);
            } else if (line.startsWith('- ')) {
                elements.push(<li key={index} className="ml-5 list-disc"><FormattedLine line={line.substring(2)} /></li>);
            } else if (line.startsWith('---')) {
                elements.push(<hr key={index} className="border-gray-600 my-6" />);
            } else if (line.trim() !== '') {
                elements.push(<FormattedLine key={index} line={line} />);
            }
        }
    });
    
    // If the content ends while inside a code block, render it
    if(inCodeBlock && codeLines.length > 0) {
        elements.push(<CodeSnippet key={`code-final`} code={codeLines.join('\n')} />);
    }

    return <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-2">{elements}</div>;
};


export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  return (
    <div className="text-left">
      <MarkdownRenderer content={report} />
    </div>
  );
};
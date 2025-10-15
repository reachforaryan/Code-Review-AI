
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, FilePlus2 } from 'lucide-react';

import { FileUpload } from './components/FileUpload';
import { generateReview } from './services/geminiService';
import { FileContent, ReportHistoryItem } from './types';
import { ReportDisplay } from './components/ReportDisplay';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ReportHistory } from './components/ReportHistory';

type AppState = 'landing' | 'upload' | 'analyzing' | 'displaying' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [files, setFiles] = useState<FileContent[]>([]);
  const [report, setReport] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [history, setHistory] = useState<ReportHistoryItem[]>([]);
  const [currentReport, setCurrentReport] = useState<ReportHistoryItem | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleFileChange = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }

    setAppState('analyzing');
    setReport('');
    setCurrentReport(null);

    const fileContents: FileContent[] = await Promise.all(
      Array.from(fileList).map(file => {
        return new Promise<FileContent>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => resolve({ name: file.name, content: e.target?.result as string });
          reader.onerror = reject;
          reader.readAsText(file);
        });
      })
    );
    setFiles(fileContents);

    try {
      const responseStream = await generateReview(fileContents);
      let fullReport = '';
      setReport(''); // Clear previous report before streaming new one
      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullReport += chunkText;
          setReport(prev => prev + chunkText);
        }
      }
      
      const newHistoryItem: ReportHistoryItem = {
        id: new Date().toISOString(),
        files: fileContents,
        report: fullReport,
        timestamp: new Date(),
      };

      setHistory(prev => [newHistoryItem, ...prev]);
      setCurrentReport(newHistoryItem);
      setAppState('displaying');
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.");
      setAppState('error');
    }
  };
  
  const handleEnterApp = () => {
    setAppState('upload');
  };

  const handleNewReview = () => {
    setAppState('upload');
    setReport('');
    setFiles([]);
    setCurrentReport(null);
  }

  const handleSelectReport = (item: ReportHistoryItem) => {
    setCurrentReport(item);
    setReport(item.report);
    setFiles(item.files);
    setAppState('displaying');
  };

  const handleDownloadPdf = async () => {
    if (!report) return;
    setIsDownloadingPdf(true);

    const printableContainer = document.createElement('div');
    printableContainer.style.position = 'absolute';
    printableContainer.style.left = '-9999px';
    printableContainer.style.width = '800px';
    document.body.appendChild(printableContainer);

    const root = ReactDOM.createRoot(printableContainer);
    root.render(
      <div className="printable-report">
        <ReportDisplay report={report} />
      </div>
    );

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const canvas = await html2canvas(printableContainer, { scale: 2, useCORS: true });
        
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const contentWidth = pdfWidth - 80; // A4 width in points minus margins
        const scale = contentWidth / canvas.width;
        const contentHeight = canvas.height * scale;
        
        let heightLeft = contentHeight;
        let position = 40; // Top margin

        pdf.addImage(canvas, 'PNG', 40, position, contentWidth, contentHeight);
        heightLeft -= (pdfHeight - 80);

        while (heightLeft > 0) {
            position = -heightLeft + 40;
            pdf.addPage();
            pdf.addImage(canvas, 'PNG', 40, position, contentWidth, contentHeight);
            heightLeft -= (pdfHeight - 80);
        }
        
        pdf.save('code-review-report.pdf');
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        setErrorMessage("Could not generate PDF. Please try again.");
        setAppState('error');
    } finally {
        root.unmount();
        document.body.removeChild(printableContainer);
        setIsDownloadingPdf(false);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingPage onEnter={handleEnterApp} />;
      case 'upload':
        return (
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Upload Your Code</h2>
            <p className="text-gray-400 text-center mb-8">Select one or more source files for an expert AI-powered review.</p>
            <FileUpload onFileChange={handleFileChange} disabled={false} />
          </div>
        );
      case 'analyzing':
        return <Loader text="Analyzing your code... This may take a moment." />;
      case 'displaying':
        return (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">Code Review Report</h2>
                <div className="mt-2 text-sm text-gray-400">
                    <strong>Files Analyzed:</strong> {files.map(f => f.name).join(', ')}
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <button
                  onClick={handleNewReview}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold text-sm rounded-md hover:bg-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400/50 flex items-center"
                >
                  <FilePlus2 size={16} className="mr-2" />
                  New Review
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="px-4 py-2 bg-cyan-600 text-white font-semibold text-sm rounded-md hover:bg-cyan-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  {isDownloadingPdf ? 'Generating...' : 'Download PDF'}
                </button>
              </div>
            </div>
            <hr className="border-gray-600 my-4" />
            <ReportDisplay report={report} />
          </div>
        );
      case 'error':
        return (
          <div className="text-center text-red-400 bg-red-900/20 border border-red-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Analysis Failed</h2>
            <p>{errorMessage}</p>
            <button
              onClick={handleNewReview}
              className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (appState === 'landing') {
    return renderContent();
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ReportHistory history={history} onSelectReport={handleSelectReport} currentReportId={currentReport?.id} />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;

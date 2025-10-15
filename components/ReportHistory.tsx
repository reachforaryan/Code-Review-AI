
import React from 'react';
import { FileText, Clock } from 'lucide-react';
import { ReportHistoryItem } from '../types';

interface ReportHistoryProps {
  history: ReportHistoryItem[];
  onSelectReport: (item: ReportHistoryItem) => void;
  currentReportId?: string;
}

export const ReportHistory: React.FC<ReportHistoryProps> = ({ history, onSelectReport, currentReportId }) => {
  if (history.length === 0) {
    return (
      <aside className="w-64 bg-gray-900/80 border-r border-gray-800 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Review History</h2>
        <div className="p-4 text-center text-gray-500">
          <p>No review history yet.</p>
          <p className="text-sm mt-1">Your past analyses will appear here.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-900/80 border-r border-gray-800 p-2 space-y-2 overflow-y-auto">
      <h2 className="text-lg font-semibold text-white p-2">Review History</h2>
      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectReport(item)}
          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
            currentReportId === item.id ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-gray-700/50 text-gray-400'
          }`}
        >
          <div className="flex items-center mb-1">
            <FileText size={16} className="mr-2 flex-shrink-0" />
            <p className="font-semibold text-sm truncate text-gray-200">
              {item.files.length > 1 ? `${item.files.length} files` : item.files[0].name}
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1.5" />
            <span>{item.timestamp.toLocaleString()}</span>
          </div>
        </button>
      ))}
    </aside>
  );
};


export interface FileContent {
  name: string;
  content: string;
}

export interface ReportHistoryItem {
  id: string;
  files: FileContent[];
  report: string;
  timestamp: Date;
}

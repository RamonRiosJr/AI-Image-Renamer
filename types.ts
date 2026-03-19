export type ProcessingStatus = 'pending' | 'processing' | 'processed' | 'error';

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  originalName: string;
  newName: string;
  status: ProcessingStatus;
  errorMessage?: string;
}

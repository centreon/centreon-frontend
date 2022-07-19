import {
  ChangeEvent,
  DragEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';

import { all, isNil, not, path, pluck } from 'ramda';

import { labelInvalidFileType } from './translatedLabels';

import { transformFileListToArray } from '.';

export interface UseDropzoneState {
  dragOver: (dragOverValue: boolean) => (event: DragEvent) => void;
  dropFiles: (event: DragEvent<HTMLDivElement>) => void;
  error: string | null;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  getFilesName: (fileList: FileList) => Array<string>;
  handleChangeFiles: (event: ChangeEvent<HTMLInputElement>) => void;
  isDraggingOver: boolean;
  openFileExplorer: () => void;
}

interface UseDropzoneProps {
  allowedFilesExtensions: Array<string>;
  changeFiles: (files: FileList | null) => void;
  resetFilesStatusAndUploadData: () => void;
}

export const getFilesName = (fileList: FileList): Array<string> => {
  const files = transformFileListToArray(fileList);

  return pluck('name', files);
};

const useDropzone = ({
  changeFiles,
  resetFilesStatusAndUploadData,
  allowedFilesExtensions,
}: UseDropzoneProps): UseDropzoneState => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dragOver = useCallback(
    (dragOverValue: boolean): ((event: DragEvent) => void) =>
      (event: DragEvent): void => {
        event.stopPropagation();
        event.preventDefault();
        setIsDraggingOver(dragOverValue);
      },
    [isDraggingOver],
  );

  const openFileExplorer = (): void => {
    fileInputRef.current?.click();
  };

  const isFileExtensionValid = (fileName: string): boolean =>
    new RegExp(`.${allowedFilesExtensions.join('|')}$`).test(fileName);

  const areFileExtensionsValid = (fileList: FileList): boolean => {
    const filesName = getFilesName(fileList);

    return all(isFileExtensionValid, filesName);
  };

  const handleChangeFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    const newFiles: FileList | undefined = path(['target', 'files'], event);
    if (isNil(newFiles)) {
      return;
    }

    if (not(areFileExtensionsValid(newFiles as FileList))) {
      setError(labelInvalidFileType);
      changeFiles(null);

      return;
    }
    setError(null);
    resetFilesStatusAndUploadData();
    changeFiles(newFiles);
  };

  const dropFiles = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer?.files as FileList;
    setIsDraggingOver(false);
    if (not(areFileExtensionsValid(fileList))) {
      setError(labelInvalidFileType);
      changeFiles(null);

      return;
    }
    setError(null);
    resetFilesStatusAndUploadData();
    changeFiles(fileList);
  };

  return {
    dragOver,
    dropFiles,
    error,
    fileInputRef,
    getFilesName,
    handleChangeFiles,
    isDraggingOver,
    openFileExplorer,
  };
};

export default useDropzone;

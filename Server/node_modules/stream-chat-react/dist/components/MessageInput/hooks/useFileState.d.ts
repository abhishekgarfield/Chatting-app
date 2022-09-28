import type { FileUpload } from './useMessageInputState';
export declare const useFileState: <T extends Pick<FileUpload, "state">>(file: T) => {
    failed: boolean;
    finished: boolean;
    uploading: boolean;
};
//# sourceMappingURL=useFileState.d.ts.map
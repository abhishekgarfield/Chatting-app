import React from 'react';
import type { EmojiData, NimbleEmojiIndex } from 'emoji-mart';
import type { FileLike } from 'react-file-utils';
import type { Attachment, Message, UserResponse } from 'stream-chat';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../../types/types';
export declare type FileUpload = {
    file: {
        name: string;
        lastModified?: number;
        lastModifiedDate?: Date;
        size?: number;
        type?: string;
        uri?: string;
    };
    id: string;
    state: 'finished' | 'failed' | 'uploading';
    url?: string;
};
export declare type ImageUpload<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    file: {
        name: string;
        height?: number;
        lastModified?: number;
        lastModifiedDate?: Date;
        size?: number;
        type?: string;
        uri?: string;
        width?: number;
    };
    id: string;
    state: 'finished' | 'failed' | 'uploading';
    previewUri?: string;
    url?: string;
} & Pick<Attachment<StreamChatGenerics>, 'og_scrape_url' | 'title' | 'title_link' | 'author_name' | 'text'>;
export declare type MessageInputState<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachments: Attachment<StreamChatGenerics>[];
    emojiPickerIsOpen: boolean;
    fileOrder: string[];
    fileUploads: Record<string, FileUpload>;
    imageOrder: string[];
    imageUploads: Record<string, ImageUpload>;
    mentioned_users: UserResponse<StreamChatGenerics>[];
    setText: (text: string) => void;
    text: string;
};
declare type SetEmojiPickerIsOpenAction = {
    type: 'setEmojiPickerIsOpen';
    value: boolean;
};
declare type SetTextAction = {
    getNewText: (currentStateText: string) => string;
    type: 'setText';
};
declare type ClearAction = {
    type: 'clear';
};
declare type SetImageUploadAction = {
    id: string;
    type: 'setImageUpload';
    file?: File | FileLike;
    previewUri?: string;
    state?: string;
    url?: string;
};
declare type SetFileUploadAction = {
    id: string;
    type: 'setFileUpload';
    file?: File;
    state?: string;
    url?: string;
};
declare type RemoveImageUploadAction = {
    id: string;
    type: 'removeImageUpload';
};
declare type RemoveFileUploadAction = {
    id: string;
    type: 'removeFileUpload';
};
declare type AddMentionedUserAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    type: 'addMentionedUser';
    user: UserResponse<StreamChatGenerics>;
};
export declare type MessageInputReducerAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = SetEmojiPickerIsOpenAction | SetTextAction | ClearAction | SetImageUploadAction | SetFileUploadAction | RemoveImageUploadAction | RemoveFileUploadAction | AddMentionedUserAction<StreamChatGenerics>;
export declare type MessageInputHookProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    closeEmojiPicker: React.MouseEventHandler<HTMLElement>;
    emojiPickerRef: React.MutableRefObject<HTMLDivElement | null>;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleEmojiKeyDown: React.KeyboardEventHandler<HTMLSpanElement>;
    handleSubmit: (event: React.BaseSyntheticEvent, customMessageData?: Partial<Message<StreamChatGenerics>>) => void;
    insertText: (textToInsert: string) => void;
    isUploadEnabled: boolean;
    maxFilesLeft: number;
    numberOfUploads: number;
    onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    onSelectEmoji: (emoji: EmojiData) => void;
    onSelectUser: (item: UserResponse<StreamChatGenerics>) => void;
    openEmojiPicker: React.MouseEventHandler<HTMLSpanElement>;
    removeFile: (id: string) => void;
    removeImage: (id: string) => void;
    textareaRef: React.MutableRefObject<HTMLTextAreaElement | null | undefined>;
    uploadFile: (id: string) => void;
    uploadImage: (id: string) => void;
    uploadNewFiles: (files: FileList | File[]) => void;
    emojiIndex?: NimbleEmojiIndex;
};
export declare type CommandsListState = {
    closeCommandsList: () => void;
    openCommandsList: () => void;
    showCommandsList: boolean;
};
export declare type MentionsListState = {
    closeMentionsList: () => void;
    openMentionsList: () => void;
    showMentionsList: boolean;
};
/**
 * hook for MessageInput state
 */
export declare const useMessageInputState: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>) => MessageInputState<StreamChatGenerics> & MessageInputHookProps<StreamChatGenerics> & CommandsListState & MentionsListState;
export {};
//# sourceMappingURL=useMessageInputState.d.ts.map
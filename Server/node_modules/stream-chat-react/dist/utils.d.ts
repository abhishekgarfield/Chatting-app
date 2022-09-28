import React from 'react';
import { nanoid } from 'nanoid';
import type { UserResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from './types/types';
export declare const isOnlyEmojis: (text?: string) => boolean;
export declare const matchMarkdownLinks: (message: string) => (string | null)[];
export declare const messageCodeBlocks: (message: string) => RegExpMatchArray;
export declare const markDownRenderers: {
    [nodeType: string]: React.ElementType;
};
export declare const emojiMarkdownPlugin: () => <T extends unknown>(markdownAST: T) => T;
export declare const mentionsMarkdownPlugin: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(mentioned_users: UserResponse<StreamChatGenerics>[]) => () => <T extends unknown>(markdownAST: T) => T;
export declare type MentionProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    mentioned_user: UserResponse<StreamChatGenerics>;
};
export declare type RenderTextOptions = {
    customMarkDownRenderers?: {
        [nodeType: string]: React.ElementType;
    };
};
export declare const renderText: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(text?: string, mentioned_users?: UserResponse<StreamChatGenerics>[] | undefined, options?: RenderTextOptions) => JSX.Element | null;
export declare function escapeRegExp(text: string): string;
/**
 * @deprecated will be removed in the next major release
 */
export declare const generateRandomId: typeof nanoid;
export declare const getWholeChar: (str: string, i: number) => string;
//# sourceMappingURL=utils.d.ts.map
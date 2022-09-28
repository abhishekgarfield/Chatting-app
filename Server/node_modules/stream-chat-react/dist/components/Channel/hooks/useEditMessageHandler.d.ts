import type { StreamChat, UpdatedMessage } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
declare type UpdateHandler<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (cid: string, updatedMessage: UpdatedMessage<StreamChatGenerics>) => ReturnType<StreamChat<StreamChatGenerics>['updateMessage']>;
export declare const useEditMessageHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(doUpdateMessageRequest?: UpdateHandler<StreamChatGenerics> | undefined) => (updatedMessage: UpdatedMessage<StreamChatGenerics>) => Promise<import("stream-chat").UpdateMessageAPIResponse<StreamChatGenerics>>;
export {};
//# sourceMappingURL=useEditMessageHandler.d.ts.map
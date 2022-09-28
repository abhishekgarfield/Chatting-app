import { PropsWithChildren } from 'react';
import { DefaultGenerics } from 'stream-chat';
export declare const apiKey: string;
declare type LocalAttachmentType = Record<string, unknown>;
declare type LocalChannelType = Record<string, unknown>;
declare type LocalCommandType = string;
declare type LocalEventType = Record<string, unknown>;
declare type LocalMessageType = Record<string, unknown>;
declare type LocalReactionType = Record<string, unknown>;
declare type LocalUserType = Record<string, unknown>;
export declare type StreamChatGenerics = {
    attachmentType: LocalAttachmentType;
    channelType: LocalChannelType;
    commandType: LocalCommandType;
    eventType: LocalEventType;
    messageType: LocalMessageType;
    reactionType: LocalReactionType;
    userType: LocalUserType;
};
export declare type ConnectedUserProps = PropsWithChildren<{
    token: string;
    userId: string;
}>;
export declare const ConnectedUser: <SCG extends DefaultGenerics = StreamChatGenerics>({ children, token, userId, }: ConnectedUserProps) => JSX.Element;
export {};
//# sourceMappingURL=utils.d.ts.map
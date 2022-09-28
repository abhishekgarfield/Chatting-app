import React, { PropsWithChildren } from 'react';
import type { AppSettingsAPIResponse, Channel, Mute } from 'stream-chat';
import type { ChatProps } from '../components/Chat/Chat';
import type { DefaultStreamChatGenerics, UnknownType } from '../types/types';
import type { ChannelsQueryState } from '../components/Chat/hooks/useChannelsQueryState';
declare type CSSClasses = 'chat' | 'chatContainer' | 'channel' | 'channelList' | 'message' | 'messageList' | 'thread' | 'threadList' | 'virtualMessage' | 'virtualizedMessageList';
export declare type CustomClasses = Partial<Record<CSSClasses, string>>;
declare type ChannelCID = string;
export declare type ThemeVersion = '1' | '2';
export declare type ChatContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    channelsQueryState: ChannelsQueryState;
    closeMobileNav: () => void;
    getAppSettings: () => Promise<AppSettingsAPIResponse<StreamChatGenerics>> | null;
    latestMessageDatesByChannels: Record<ChannelCID, Date>;
    mutes: Array<Mute<StreamChatGenerics>>;
    openMobileNav: () => void;
    setActiveChannel: (newChannel?: Channel<StreamChatGenerics>, watchers?: {
        limit?: number;
        offset?: number;
    }, event?: React.BaseSyntheticEvent) => void;
    themeVersion: ThemeVersion;
    useImageFlagEmojisOnWindows: boolean;
    channel?: Channel<StreamChatGenerics>;
    customClasses?: CustomClasses;
    navOpen?: boolean;
} & Required<Pick<ChatProps<StreamChatGenerics>, 'theme' | 'client'>>;
export declare const ChatContext: React.Context<ChatContextValue<DefaultStreamChatGenerics> | undefined>;
export declare const ChatProvider: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ children, value, }: React.PropsWithChildren<{
    value: ChatContextValue<StreamChatGenerics>;
}>) => JSX.Element;
export declare const useChatContext: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(componentName?: string) => ChatContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference so if ChatContext
 * typing is desired while using the HOC withChatContext the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withChatContext: <P extends UnknownType, StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(Component: React.ComponentType<P>) => {
    (props: Omit<P, "channel" | "client" | "mutes" | "navOpen" | "latestMessageDatesByChannels" | "theme" | "channelsQueryState" | "closeMobileNav" | "customClasses" | "getAppSettings" | "openMobileNav" | "setActiveChannel" | "themeVersion" | "useImageFlagEmojisOnWindows">): JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=ChatContext.d.ts.map
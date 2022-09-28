import React, { PropsWithChildren } from 'react';
import type { Channel, ChannelConfigWithInfo, MessageResponse, Mute, ChannelState as StreamChannelState } from 'stream-chat';
import type { DefaultStreamChatGenerics, GiphyVersions, UnknownType } from '../types/types';
export declare type ChannelNotifications = Array<{
    id: string;
    text: string;
    type: 'success' | 'error';
}>;
export declare type StreamMessage<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = ReturnType<StreamChannelState<StreamChatGenerics>['formatMessage']> | MessageResponse<StreamChatGenerics>;
export declare type ChannelState<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    suppressAutoscroll: boolean;
    error?: Error | null;
    hasMore?: boolean;
    hasMoreNewer?: boolean;
    highlightedMessageId?: string;
    loading?: boolean;
    loadingMore?: boolean;
    loadingMoreNewer?: boolean;
    members?: StreamChannelState<StreamChatGenerics>['members'];
    messages?: StreamMessage<StreamChatGenerics>[];
    pinnedMessages?: StreamMessage<StreamChatGenerics>[];
    quotedMessage?: StreamMessage<StreamChatGenerics>;
    read?: StreamChannelState<StreamChatGenerics>['read'];
    thread?: StreamMessage<StreamChatGenerics> | null;
    threadHasMore?: boolean;
    threadLoadingMore?: boolean;
    threadMessages?: StreamMessage<StreamChatGenerics>[];
    threadSuppressAutoscroll?: boolean;
    typing?: StreamChannelState<StreamChatGenerics>['typing'];
    watcherCount?: number;
    watchers?: StreamChannelState<StreamChatGenerics>['watchers'];
};
export declare type ChannelStateContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<ChannelState<StreamChatGenerics>, 'typing'> & {
    channel: Channel<StreamChatGenerics>;
    channelCapabilities: Record<string, boolean>;
    channelConfig: ChannelConfigWithInfo<StreamChatGenerics> | undefined;
    multipleUploads: boolean;
    notifications: ChannelNotifications;
    acceptedFiles?: string[];
    dragAndDropWindow?: boolean;
    giphyVersion?: GiphyVersions;
    maxNumberOfFiles?: number;
    mutes?: Array<Mute<StreamChatGenerics>>;
    watcher_count?: number;
};
export declare const ChannelStateContext: React.Context<ChannelStateContextValue<DefaultStreamChatGenerics> | undefined>;
export declare const ChannelStateProvider: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ children, value, }: React.PropsWithChildren<{
    value: ChannelStateContextValue<StreamChatGenerics>;
}>) => JSX.Element;
export declare const useChannelStateContext: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(componentName?: string) => ChannelStateContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference, so if ChannelStateContext
 * typing is desired while using the HOC withChannelStateContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withChannelStateContext: <P extends UnknownType, StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(Component: React.ComponentType<P>) => {
    (props: Omit<P, "error" | "notifications" | "channel" | "loading" | "read" | "members" | "messages" | "watcher_count" | "watchers" | "mutes" | "suppressAutoscroll" | "hasMore" | "hasMoreNewer" | "highlightedMessageId" | "loadingMore" | "loadingMoreNewer" | "pinnedMessages" | "quotedMessage" | "thread" | "threadHasMore" | "threadLoadingMore" | "threadMessages" | "threadSuppressAutoscroll" | "watcherCount" | "channelCapabilities" | "channelConfig" | "multipleUploads" | "acceptedFiles" | "dragAndDropWindow" | "giphyVersion" | "maxNumberOfFiles">): JSX.Element;
    displayName: string;
};
//# sourceMappingURL=ChannelStateContext.d.ts.map
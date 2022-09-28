import React from 'react';
import { ScrollSeekConfiguration, ScrollSeekPlaceholderProps, VirtuosoProps } from 'react-virtuoso';
import { GroupStyle } from './utils';
import { MessageProps, MessageUIComponentProps } from '../Message';
import { ChannelActionContextValue } from '../../context/ChannelActionContext';
import { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics, UnknownType } from '../../types/types';
export declare type VirtualizedMessageListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Partial<Pick<MessageProps<StreamChatGenerics>, 'customMessageActions' | 'messageActions'>> & {
    /** Additional props to be passed the underlying [`react-virtuoso` virtualized list dependency](https://virtuoso.dev/virtuoso-api-reference/) */
    additionalVirtuosoProps?: VirtuosoProps<UnknownType, unknown>;
    /** If true, picking a reaction from the `ReactionSelector` component will close the selector */
    closeReactionSelectorOnClick?: boolean;
    /** Custom render function, if passed, certain UI props are ignored */
    customMessageRenderer?: (messageList: StreamMessage<StreamChatGenerics>[], index: number) => React.ReactElement;
    /** If set, the default item height is used for the calculation of the total list height. Use if you expect messages with a lot of height variance */
    defaultItemHeight?: number;
    /** Disables the injection of date separator components in MessageList, defaults to `true` */
    disableDateSeparator?: boolean;
    /** Callback function to set group styles for each message */
    groupStyles?: (message: StreamMessage<StreamChatGenerics>, previousMessage: StreamMessage<StreamChatGenerics>, nextMessage: StreamMessage<StreamChatGenerics>, noGroupByUser: boolean) => GroupStyle;
    /** Whether or not the list has more items to load */
    hasMore?: boolean;
    /** Whether or not the list has newer items to load */
    hasMoreNewer?: boolean;
    /** Element to be rendered at the top of the thread message list. By default, these are the Message and ThreadStart components */
    head?: React.ReactElement;
    /** Hides the `MessageDeleted` components from the list, defaults to `false` */
    hideDeletedMessages?: boolean;
    /** Hides the `DateSeparator` component when new messages are received in a channel that's watched but not active, defaults to false */
    hideNewMessageSeparator?: boolean;
    /** The id of the message to highlight and center */
    highlightedMessageId?: string;
    /** Whether or not the list is currently loading more items */
    loadingMore?: boolean;
    /** Whether or not the list is currently loading newer items */
    loadingMoreNewer?: boolean;
    /** Function called when more messages are to be loaded, defaults to function stored in [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/) */
    loadMore?: ChannelActionContextValue['loadMore'] | (() => Promise<void>);
    /** Function called when new messages are to be loaded, defaults to function stored in [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/) */
    loadMoreNewer?: ChannelActionContextValue['loadMore'] | (() => Promise<void>);
    /** Custom UI component to display a message, defaults to and accepts same props as [MessageSimple](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageSimple.tsx) */
    Message?: React.ComponentType<MessageUIComponentProps<StreamChatGenerics>>;
    /** The limit to use when paginating messages */
    messageLimit?: number;
    /** Optional prop to override the messages available from [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/) */
    messages?: StreamMessage<StreamChatGenerics>[];
    /** The amount of extra content the list should render in addition to what's necessary to fill in the viewport */
    overscan?: number;
    /**
     * Performance improvement by showing placeholders if user scrolls fast through list.
     * it can be used like this:
     * ```
     *  {
     *    enter: (velocity) => Math.abs(velocity) > 120,
     *    exit: (velocity) => Math.abs(velocity) < 40,
     *    change: () => null,
     *    placeholder: ({index, height})=> <div style={{height: height + "px"}}>{index}</div>,
     *  }
     *  ```
     */
    scrollSeekPlaceHolder?: ScrollSeekConfiguration & {
        placeholder: React.ComponentType<ScrollSeekPlaceholderProps>;
    };
    /** When `true`, the list will scroll to the latest message when the window regains focus */
    scrollToLatestMessageOnFocus?: boolean;
    /** If true, the Giphy preview will render as a separate component above the `MessageInput`, rather than inline with the other messages in the list */
    separateGiphyPreview?: boolean;
    /** If true, group messages belonging to the same user, otherwise show each message individually */
    shouldGroupByUser?: boolean;
    /** The scrollTo behavior when new messages appear. Use `"smooth"` for regular chat channels, and `"auto"` (which results in instant scroll to bottom) if you expect high throughput. */
    stickToBottomScrollBehavior?: 'smooth' | 'auto';
    /** stops the list from autoscrolling when new messages are loaded */
    suppressAutoscroll?: boolean;
    /** If true, indicates the message list is a thread  */
    threadList?: boolean;
};
/**
 * The VirtualizedMessageList component renders a list of messages in a virtualized list.
 * It is a consumer of the React contexts set in [Channel](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Channel/Channel.tsx).
 */
export declare function VirtualizedMessageList<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: VirtualizedMessageListProps<StreamChatGenerics>): JSX.Element;
//# sourceMappingURL=VirtualizedMessageList.d.ts.map
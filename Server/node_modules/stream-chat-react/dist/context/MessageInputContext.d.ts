import React, { PropsWithChildren } from 'react';
import type { TriggerSettings } from '../components/MessageInput/DefaultTriggerProvider';
import type { CooldownTimerState, MessageInputProps } from '../components/MessageInput';
import type { CommandsListState, MentionsListState, MessageInputHookProps, MessageInputState } from '../components/MessageInput/hooks/useMessageInputState';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../types/types';
export declare type MessageInputContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger> = MessageInputState<StreamChatGenerics> & MessageInputHookProps<StreamChatGenerics> & Omit<MessageInputProps<StreamChatGenerics, V>, 'Input'> & CooldownTimerState & {
    autocompleteTriggers?: TriggerSettings<StreamChatGenerics, V>;
} & CommandsListState & MentionsListState;
export declare const MessageInputContext: React.Context<(MessageInputState<DefaultStreamChatGenerics> & MessageInputHookProps<DefaultStreamChatGenerics>) | undefined>;
export declare const MessageInputContextProvider: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>({ children, value, }: React.PropsWithChildren<{
    value: MessageInputContextValue<StreamChatGenerics, V>;
}>) => JSX.Element;
export declare const useMessageInputContext: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(componentName?: string) => MessageInputContextValue<StreamChatGenerics, V>;
//# sourceMappingURL=MessageInputContext.d.ts.map
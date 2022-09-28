import type { Message } from 'stream-chat';
import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../../types/types';
export declare const useSubmitHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: import("react").Dispatch<MessageInputReducerAction<StreamChatGenerics>>, numberOfUploads: number) => {
    handleSubmit: (event: React.BaseSyntheticEvent, customMessageData?: Partial<Message<StreamChatGenerics>> | undefined) => Promise<void>;
};
//# sourceMappingURL=useSubmitHandler.d.ts.map
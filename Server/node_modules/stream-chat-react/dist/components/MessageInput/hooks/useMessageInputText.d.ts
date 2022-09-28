import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../../types/types';
export declare const useMessageInputText: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: import("react").Dispatch<MessageInputReducerAction<StreamChatGenerics>>) => {
    handleChange: import("react").ChangeEventHandler<HTMLTextAreaElement>;
    insertText: (textToInsert: string) => void;
    textareaRef: import("react").MutableRefObject<HTMLTextAreaElement | undefined>;
};
//# sourceMappingURL=useMessageInputText.d.ts.map
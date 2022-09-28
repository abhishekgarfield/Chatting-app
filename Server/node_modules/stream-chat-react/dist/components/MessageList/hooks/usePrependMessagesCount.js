import { useMemo, useRef } from 'react';
export function usePrependedMessagesCount(messages, hasDateSeparator) {
    var firstRealMessageIndex = hasDateSeparator ? 1 : 0;
    var firstMessageId = useRef();
    var earliestMessageId = useRef();
    var previousNumItemsPrepended = useRef(0);
    var numItemsPrepended = useMemo(function () {
        var _a;
        if (!messages || !messages.length) {
            previousNumItemsPrepended.current = 0;
            return 0;
        }
        var currentFirstMessageId = (_a = messages === null || messages === void 0 ? void 0 : messages[firstRealMessageIndex]) === null || _a === void 0 ? void 0 : _a.id;
        // if no new messages were prepended, return early (same amount as before)
        if (currentFirstMessageId === earliestMessageId.current) {
            return previousNumItemsPrepended.current;
        }
        if (!firstMessageId.current) {
            firstMessageId.current = currentFirstMessageId;
        }
        earliestMessageId.current = currentFirstMessageId;
        // if new messages were prepended, find out how many
        // start with this number because there cannot be fewer prepended items than before
        for (var i = previousNumItemsPrepended.current; i < messages.length; i += 1) {
            if (messages[i].id === firstMessageId.current) {
                previousNumItemsPrepended.current = i;
                return i;
            }
        }
        // if no match has found, we have jumped - reset the prepend item count.
        firstMessageId.current = currentFirstMessageId;
        previousNumItemsPrepended.current = 0;
        return 0;
        // TODO: there's a bug here, the messages prop is the same array instance (something mutates it)
        // that's why the second dependency is necessary
    }, [messages, messages === null || messages === void 0 ? void 0 : messages.length]);
    return numItemsPrepended;
}

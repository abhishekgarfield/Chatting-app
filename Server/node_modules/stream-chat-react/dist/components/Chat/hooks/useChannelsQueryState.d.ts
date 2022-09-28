import { Dispatch, SetStateAction } from 'react';
import type { APIErrorResponse, ErrorFromResponse } from 'stream-chat';
declare type ChannelQueryType = 'reload' | 'load-more';
export interface ChannelsQueryState {
    error: ErrorFromResponse<APIErrorResponse> | null;
    queryInProgress: ChannelQueryType | null;
    setError: Dispatch<SetStateAction<ErrorFromResponse<APIErrorResponse> | null>>;
    setQueryInProgress: Dispatch<SetStateAction<ChannelQueryType | null>>;
}
export declare const useChannelsQueryState: () => ChannelsQueryState;
export {};
//# sourceMappingURL=useChannelsQueryState.d.ts.map
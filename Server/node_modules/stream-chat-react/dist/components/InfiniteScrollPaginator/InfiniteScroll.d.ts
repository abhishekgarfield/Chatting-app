import React, { PropsWithChildren } from 'react';
export declare type InfiniteScrollProps = {
    className?: string;
    element?: React.ElementType;
    hasMore?: boolean;
    hasMoreNewer?: boolean;
    /** Element to be rendered at the top of the thread message list. By default Message and ThreadStart components */
    head?: React.ReactNode;
    initialLoad?: boolean;
    isLoading?: boolean;
    listenToScroll?: (offset: number, reverseOffset: number, threshold: number) => void;
    loader?: React.ReactNode;
    loading?: React.ReactNode;
    loadMore?: () => void;
    loadMoreNewer?: () => void;
    pageStart?: number;
    threshold?: number;
    useCapture?: boolean;
};
export declare const InfiniteScroll: (props: PropsWithChildren<InfiniteScrollProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=InfiniteScroll.d.ts.map
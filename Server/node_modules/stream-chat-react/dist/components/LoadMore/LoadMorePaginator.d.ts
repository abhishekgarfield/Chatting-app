import React, { PropsWithChildren } from 'react';
import { LoadMoreButtonProps } from './LoadMoreButton';
export declare type LoadMorePaginatorProps = {
    /** callback to load the next page */
    loadNextPage: () => void;
    hasNextPage?: boolean;
    LoadMoreButton?: React.ComponentType<LoadMoreButtonProps>;
    /** indicates if there there's currently any refreshing taking place */
    refreshing?: boolean;
    reverse?: boolean;
};
export declare const UnMemoizedLoadMorePaginator: (props: PropsWithChildren<LoadMorePaginatorProps>) => JSX.Element;
export declare const LoadMorePaginator: (props: PropsWithChildren<LoadMorePaginatorProps>) => JSX.Element;
//# sourceMappingURL=LoadMorePaginator.d.ts.map
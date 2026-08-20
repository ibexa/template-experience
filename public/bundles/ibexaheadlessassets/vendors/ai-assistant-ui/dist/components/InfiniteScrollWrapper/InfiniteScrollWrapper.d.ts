import { ElementType, ReactNode } from 'react';
import { PlainChildrenProps } from 'react-intersection-observer';
declare const LOAD_TYPE: {
    INITIAL: string;
    MORE: string;
};
interface InfiniteScrollWrapperProps {
    children: ReactNode;
    contentVersion: string;
    loadMore: (type: (typeof LOAD_TYPE)[keyof typeof LOAD_TYPE]) => Promise<{
        done: boolean;
    }>;
    className?: string;
    endOfResults?: boolean;
    endOfResultsMessage?: string;
    elementAs?: PlainChildrenProps['as'];
    listAs?: ElementType;
    listRef: React.RefObject<HTMLElement | null>;
    triggerPosition?: 'top' | 'bottom';
    initialPosition?: 'top' | 'bottom';
    isExternalLoading?: boolean;
    isLoadingInitially?: boolean;
}
declare const InfiniteScrollWrapper: ({ children, contentVersion, className, elementAs, listAs: ListTag, endOfResults, endOfResultsMessage, listRef: externalListRef, loadMore, triggerPosition, initialPosition, isExternalLoading, isLoadingInitially, }: InfiniteScrollWrapperProps) => import("react").JSX.Element;
export default InfiniteScrollWrapper;

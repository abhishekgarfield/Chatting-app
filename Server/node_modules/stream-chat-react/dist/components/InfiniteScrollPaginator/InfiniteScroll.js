var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useRef } from 'react';
/**
 * Prevents Chrome hangups
 * See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
 */
var mousewheelListener = function (event) {
    if (event instanceof WheelEvent && event.deltaY === 1) {
        event.preventDefault();
    }
};
export var InfiniteScroll = function (props) {
    var children = props.children, _a = props.element, element = _a === void 0 ? 'div' : _a, _b = props.hasMore, hasMore = _b === void 0 ? false : _b, _c = props.hasMoreNewer, hasMoreNewer = _c === void 0 ? false : _c, head = props.head, _d = props.initialLoad, initialLoad = _d === void 0 ? true : _d, _e = props.isLoading, isLoading = _e === void 0 ? false : _e, listenToScroll = props.listenToScroll, loader = props.loader, loadMore = props.loadMore, loadMoreNewer = props.loadMoreNewer, _f = props.threshold, threshold = _f === void 0 ? 250 : _f, _g = props.useCapture, useCapture = _g === void 0 ? false : _g, elementProps = __rest(props, ["children", "element", "hasMore", "hasMoreNewer", "head", "initialLoad", "isLoading", "listenToScroll", "loader", "loadMore", "loadMoreNewer", "threshold", "useCapture"]);
    var scrollComponent = useRef();
    var scrollListener = useCallback(function () {
        var element = scrollComponent.current;
        if (!element || element.offsetParent === null) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var parentElement = element.parentElement;
        var offset = element.scrollHeight - parentElement.scrollTop - parentElement.clientHeight;
        var reverseOffset = parentElement.scrollTop;
        if (listenToScroll) {
            listenToScroll(offset, reverseOffset, threshold);
        }
        if (reverseOffset < Number(threshold) && typeof loadMore === 'function' && hasMore) {
            loadMore();
        }
        if (offset < Number(threshold) && typeof loadMoreNewer === 'function' && hasMoreNewer) {
            loadMoreNewer();
        }
    }, [hasMore, hasMoreNewer, threshold, listenToScroll, loadMore, loadMoreNewer]);
    useEffect(function () {
        var _a;
        var scrollElement = (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (isLoading || !scrollElement) {
            return function () { return undefined; };
        }
        scrollElement.addEventListener('scroll', scrollListener, useCapture);
        scrollElement.addEventListener('resize', scrollListener, useCapture);
        return function () {
            scrollElement.removeEventListener('scroll', scrollListener, useCapture);
            scrollElement.removeEventListener('resize', scrollListener, useCapture);
        };
    }, [initialLoad, isLoading, scrollListener, useCapture]);
    useEffect(function () {
        var _a;
        var scrollElement = (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (scrollElement) {
            scrollElement.addEventListener('wheel', mousewheelListener, { passive: false });
        }
        return function () {
            if (scrollElement) {
                scrollElement.removeEventListener('wheel', mousewheelListener, useCapture);
            }
        };
    }, [useCapture]);
    var attributes = __assign(__assign({}, elementProps), { ref: function (element) {
            scrollComponent.current = element;
        } });
    var childrenArray = [loader, children];
    if (head) {
        childrenArray.unshift(head);
    }
    return React.createElement(element, attributes, childrenArray);
};

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
import React from 'react';
import { useChatContext } from '../../context/ChatContext';
import { useChannelSearch } from './hooks/useChannelSearch';
import { SearchBar as DefaultSearchBar } from './SearchBar';
import { SearchInput as DefaultSearchInput, } from './SearchInput';
import { SearchResults } from './SearchResults';
var UnMemoizedChannelSearch = function (props) {
    var AppMenu = props.AppMenu, ClearInputIcon = props.ClearInputIcon, ExitSearchIcon = props.ExitSearchIcon, MenuIcon = props.MenuIcon, placeholder = props.placeholder, _a = props.popupResults, popupResults = _a === void 0 ? false : _a, _b = props.SearchBar, SearchBar = _b === void 0 ? DefaultSearchBar : _b, SearchEmpty = props.SearchEmpty, _c = props.SearchInput, SearchInput = _c === void 0 ? DefaultSearchInput : _c, SearchLoading = props.SearchLoading, SearchInputIcon = props.SearchInputIcon, SearchResultItem = props.SearchResultItem, SearchResultsList = props.SearchResultsList, SearchResultsHeader = props.SearchResultsHeader, channelSearchParams = __rest(props, ["AppMenu", "ClearInputIcon", "ExitSearchIcon", "MenuIcon", "placeholder", "popupResults", "SearchBar", "SearchEmpty", "SearchInput", "SearchLoading", "SearchInputIcon", "SearchResultItem", "SearchResultsList", "SearchResultsHeader"]);
    var themeVersion = useChatContext('ChannelSearch').themeVersion;
    var _d = useChannelSearch(channelSearchParams), activateSearch = _d.activateSearch, clearState = _d.clearState, exitSearch = _d.exitSearch, inputIsFocused = _d.inputIsFocused, inputRef = _d.inputRef, onSearch = _d.onSearch, query = _d.query, results = _d.results, searchBarRef = _d.searchBarRef, searching = _d.searching, selectResult = _d.selectResult;
    var showSearchBarV2 = themeVersion === '2';
    return (React.createElement("div", { className: 'str-chat__channel-search', "data-testid": 'channel-search' },
        showSearchBarV2 ? (React.createElement(SearchBar, { activateSearch: activateSearch, AppMenu: AppMenu, ClearInputIcon: ClearInputIcon, clearState: clearState, disabled: channelSearchParams.disabled, exitSearch: exitSearch, ExitSearchIcon: ExitSearchIcon, inputIsFocused: inputIsFocused, inputRef: inputRef, MenuIcon: MenuIcon, onSearch: onSearch, placeholder: placeholder, query: query, searchBarRef: searchBarRef, SearchInput: SearchInput, SearchInputIcon: SearchInputIcon })) : (React.createElement(SearchInput, { clearState: clearState, disabled: channelSearchParams.disabled, inputRef: inputRef, onSearch: onSearch, placeholder: placeholder, query: query })),
        query && (React.createElement(SearchResults, { popupResults: popupResults, results: results, SearchEmpty: SearchEmpty, searching: searching, SearchLoading: SearchLoading, SearchResultItem: SearchResultItem, SearchResultsHeader: SearchResultsHeader, SearchResultsList: SearchResultsList, selectResult: selectResult }))));
};
/**
 * The ChannelSearch component makes a query users call and displays the results in a list.
 * Clicking on a list item will navigate you into a channel with the selected user. It can be used
 * on its own or added to the ChannelList component by setting the `showChannelSearch` prop to true.
 */
export var ChannelSearch = React.memo(UnMemoizedChannelSearch);

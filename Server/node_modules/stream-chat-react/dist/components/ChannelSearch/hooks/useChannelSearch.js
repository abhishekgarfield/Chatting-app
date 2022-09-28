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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import uniqBy from 'lodash.uniqby';
import { isChannel } from '../utils';
import { useChatContext } from '../../../context/ChatContext';
export var useChannelSearch = function (_a) {
    var _b = _a.channelType, channelType = _b === void 0 ? 'messaging' : _b, _c = _a.clearSearchOnClickOutside, clearSearchOnClickOutside = _c === void 0 ? true : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, onSearchCallback = _a.onSearch, onSearchExit = _a.onSearchExit, onSelectResult = _a.onSelectResult, _e = _a.searchForChannels, searchForChannels = _e === void 0 ? false : _e, searchFunction = _a.searchFunction, searchQueryParams = _a.searchQueryParams, setChannels = _a.setChannels;
    var _f = useChatContext('useChannelSearch'), client = _f.client, navOpen = _f.navOpen, setActiveChannel = _f.setActiveChannel, themeVersion = _f.themeVersion;
    var _g = useState(false), inputIsFocused = _g[0], setInputIsFocused = _g[1];
    var _h = useState(''), query = _h[0], setQuery = _h[1];
    var _j = useState([]), results = _j[0], setResults = _j[1];
    var _k = useState(false), searching = _k[0], setSearching = _k[1];
    var inputRef = useRef(null);
    var searchBarRef = useRef(null);
    var clearState = useCallback(function () {
        setQuery('');
        setResults([]);
        setSearching(false);
    }, []);
    var activateSearch = useCallback(function () {
        setInputIsFocused(true);
    }, []);
    var exitSearch = useCallback(function () {
        var _a;
        setInputIsFocused(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        clearState();
        onSearchExit === null || onSearchExit === void 0 ? void 0 : onSearchExit();
    }, [clearState, onSearchExit]);
    useEffect(function () {
        if (disabled)
            return;
        var clickListener = function (event) {
            var _a, _b;
            if (!(event.target instanceof HTMLElement))
                return;
            var isInputClick = themeVersion === '2'
                ? (_a = searchBarRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)
                : (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target);
            if (isInputClick)
                return;
            if ((inputIsFocused && (!query || navOpen)) || clearSearchOnClickOutside) {
                exitSearch();
            }
        };
        document.addEventListener('click', clickListener);
        return function () { return document.removeEventListener('click', clickListener); };
    }, [disabled, inputIsFocused]);
    useEffect(function () {
        if (!inputRef.current || disabled)
            return;
        var handleKeyDown = function (event) {
            if (event.key === 'Escape')
                return exitSearch();
        };
        inputRef.current.addEventListener('keydown', handleKeyDown);
        return function () {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    var selectResult = useCallback(function (result) { return __awaiter(void 0, void 0, void 0, function () {
        var selectedChannel, newChannel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!client.userID)
                        return [2 /*return*/];
                    if (!onSelectResult) return [3 /*break*/, 2];
                    return [4 /*yield*/, onSelectResult({
                            setQuery: setQuery,
                            setResults: setResults,
                            setSearching: setSearching,
                        }, result)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    if (!isChannel(result)) return [3 /*break*/, 3];
                    setActiveChannel(result);
                    selectedChannel = result;
                    return [3 /*break*/, 5];
                case 3:
                    newChannel = client.channel(channelType, { members: [client.userID, result.id] });
                    return [4 /*yield*/, newChannel.watch()];
                case 4:
                    _a.sent();
                    setActiveChannel(newChannel);
                    selectedChannel = newChannel;
                    _a.label = 5;
                case 5:
                    setChannels(function (channels) { return uniqBy(__spreadArray([selectedChannel], channels, true), 'cid'); });
                    if (clearSearchOnClickOutside) {
                        exitSearch();
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [clearSearchOnClickOutside, client, exitSearch, onSelectResult]);
    var getChannels = useCallback(function (text) { return __awaiter(void 0, void 0, void 0, function () {
        var userResponse, channelResponse, _a, channels, users_1, users, error_1;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!text || searching)
                        return [2 /*return*/];
                    setSearching(true);
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, client.queryUsers(__assign({ $or: [{ id: { $autocomplete: text } }, { name: { $autocomplete: text } }], id: { $ne: client.userID } }, (_b = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.userFilters) === null || _b === void 0 ? void 0 : _b.filters), __assign({ id: 1 }, (_c = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.userFilters) === null || _c === void 0 ? void 0 : _c.sort), __assign({ limit: 8 }, (_d = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.userFilters) === null || _d === void 0 ? void 0 : _d.options))];
                case 2:
                    userResponse = _h.sent();
                    if (!searchForChannels) return [3 /*break*/, 4];
                    channelResponse = client.queryChannels(__assign({ name: { $autocomplete: text } }, (_e = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.channelFilters) === null || _e === void 0 ? void 0 : _e.filters), ((_f = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.channelFilters) === null || _f === void 0 ? void 0 : _f.sort) || {}, __assign({ limit: 5 }, (_g = searchQueryParams === null || searchQueryParams === void 0 ? void 0 : searchQueryParams.channelFilters) === null || _g === void 0 ? void 0 : _g.options));
                    return [4 /*yield*/, Promise.all([channelResponse, userResponse])];
                case 3:
                    _a = _h.sent(), channels = _a[0], users_1 = _a[1].users;
                    setResults(__spreadArray(__spreadArray([], channels, true), users_1, true));
                    setSearching(false);
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, Promise.resolve(userResponse)];
                case 5:
                    users = (_h.sent()).users;
                    setResults(users);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _h.sent();
                    clearState();
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 7:
                    setSearching(false);
                    return [2 /*return*/];
            }
        });
    }); }, [client, searching]);
    var getChannelsThrottled = throttle(getChannels, 200);
    var onSearch = useCallback(function (event) {
        event.preventDefault();
        if (disabled)
            return;
        if (searchFunction) {
            searchFunction({
                setQuery: setQuery,
                setResults: setResults,
                setSearching: setSearching,
            }, event);
        }
        else {
            setQuery(event.target.value);
            getChannelsThrottled(event.target.value);
        }
        onSearchCallback === null || onSearchCallback === void 0 ? void 0 : onSearchCallback(event);
    }, [disabled, getChannelsThrottled, searchFunction]);
    return {
        activateSearch: activateSearch,
        clearState: clearState,
        exitSearch: exitSearch,
        inputIsFocused: inputIsFocused,
        inputRef: inputRef,
        onSearch: onSearch,
        query: query,
        results: results,
        searchBarRef: searchBarRef,
        searching: searching,
        selectResult: selectResult,
    };
};

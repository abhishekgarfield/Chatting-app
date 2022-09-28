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
import React from 'react';
import emojiRegex from 'emoji-regex';
import * as linkify from 'linkifyjs';
import { nanoid } from 'nanoid';
import { findAndReplace } from 'mdast-util-find-and-replace';
import RootReactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown/with-html';
import uniqBy from 'lodash.uniqby';
export var isOnlyEmojis = function (text) {
    if (!text)
        return false;
    var noEmojis = text.replace(emojiRegex(), '');
    var noSpace = noEmojis.replace(/[\s\n]/gm, '');
    return !noSpace;
};
var allowedMarkups = [
    'html',
    // @ts-expect-error
    'root',
    'text',
    'break',
    'paragraph',
    'emphasis',
    'strong',
    'link',
    'list',
    'listItem',
    'code',
    'inlineCode',
    'blockquote',
    'delete',
];
export var matchMarkdownLinks = function (message) {
    var regexMdLinks = /\[([^[]+)\](\(.*\))/gm;
    var matches = message.match(regexMdLinks);
    var singleMatch = /\[([^[]+)\]\((.*)\)/;
    var links = matches
        ? matches.map(function (match) {
            var i = singleMatch.exec(match);
            return i && [i[1], i[2]];
        })
        : [];
    return links.flat();
};
export var messageCodeBlocks = function (message) {
    var codeRegex = /```[a-z]*\n[\s\S]*?\n```|`[a-z]*[\s\S]*?`/gm;
    var matches = message.match(codeRegex);
    return matches || [];
};
var detectHttp = /(http(s?):\/\/)?(www\.)?/;
function formatUrlForDisplay(url) {
    try {
        return decodeURIComponent(url).replace(detectHttp, '');
    }
    catch (e) {
        return url;
    }
}
function encodeDecode(url) {
    try {
        return encodeURI(decodeURIComponent(url));
    }
    catch (error) {
        return url;
    }
}
export var markDownRenderers = {
    // eslint-disable-next-line react/display-name
    link: function (props) {
        var children = props.children, href = props.href;
        var isEmail = href === null || href === void 0 ? void 0 : href.startsWith('mailto:');
        var isUrl = href === null || href === void 0 ? void 0 : href.startsWith('http');
        if (!href || (!isEmail && !isUrl)) {
            return children;
        }
        return (React.createElement("a", { className: "".concat(isUrl ? 'str-chat__message-url-link' : ''), href: href, rel: 'nofollow noreferrer noopener', target: '_blank' }, children));
    },
    span: 'span',
};
export var emojiMarkdownPlugin = function () {
    function replace(match) {
        return {
            children: [{ type: 'text', value: match }],
            className: 'inline-text-emoji',
            type: 'span',
        };
    }
    var transform = function (markdownAST) {
        findAndReplace(markdownAST, emojiRegex(), replace);
        return markdownAST;
    };
    return transform;
};
export var mentionsMarkdownPlugin = function (mentioned_users) { return function () {
    var mentioned_usernames = mentioned_users
        .map(function (user) { return user.name || user.id; })
        .filter(Boolean)
        .map(escapeRegExp);
    function replace(match) {
        var usernameOrId = match.replace('@', '');
        var user = mentioned_users.find(function (_a) {
            var id = _a.id, name = _a.name;
            return name === usernameOrId || id === usernameOrId;
        });
        return {
            children: [{ type: 'text', value: match }],
            mentioned_user: user,
            type: 'mention',
        };
    }
    var transform = function (markdownAST) {
        if (!mentioned_usernames.length) {
            return markdownAST;
        }
        var mentionedUsersRegex = new RegExp(mentioned_usernames.map(function (username) { return "@".concat(username); }).join('|'), 'g');
        findAndReplace(markdownAST, mentionedUsersRegex, replace);
        return markdownAST;
    };
    return transform;
}; };
var Mention = function (props) { return React.createElement("span", { className: 'str-chat__message-mention' }, props.children); };
export var renderText = function (text, mentioned_users, options) {
    if (options === void 0) { options = {}; }
    // take the @ mentions and turn them into markdown?
    // translate links
    if (!text)
        return null;
    var newText = text;
    var markdownLinks = matchMarkdownLinks(newText);
    var codeBlocks = messageCodeBlocks(newText);
    // extract all valid links/emails within text and replace it with proper markup
    uniqBy(linkify.find(newText), 'value').forEach(function (_a) {
        var href = _a.href, type = _a.type, value = _a.value;
        var linkIsInBlock = codeBlocks.some(function (block) { return block === null || block === void 0 ? void 0 : block.includes(value); });
        // check if message is already  markdown
        var noParsingNeeded = markdownLinks &&
            markdownLinks.filter(function (text) {
                var strippedHref = href === null || href === void 0 ? void 0 : href.replace(detectHttp, '');
                var strippedText = text === null || text === void 0 ? void 0 : text.replace(detectHttp, '');
                if (!strippedHref || !strippedText)
                    return false;
                return strippedHref.includes(strippedText) || strippedText.includes(strippedHref);
            });
        if (noParsingNeeded.length > 0 || linkIsInBlock)
            return;
        try {
            // special case for mentions:
            // it could happen that a user's name matches with an e-mail format pattern.
            // in that case, we check whether the found e-mail is actually a mention
            // by naively checking for an existence of @ sign in front of it.
            if (type === 'email' && mentioned_users) {
                var emailMatchesWithName = mentioned_users.some(function (u) { return u.name === value; });
                if (emailMatchesWithName) {
                    newText = newText.replace(new RegExp(escapeRegExp(value), 'g'), function (match, position) {
                        var isMention = newText.charAt(position - 1) === '@';
                        // in case of mention, we leave the match in its original form,
                        // and we let `mentionsMarkdownPlugin` to do its job
                        return isMention ? match : "[".concat(match, "](").concat(encodeDecode(href), ")");
                    });
                    return;
                }
            }
            var displayLink = type === 'email' ? value : formatUrlForDisplay(href);
            newText = newText.replace(new RegExp(escapeRegExp(value), 'g'), "[".concat(displayLink, "](").concat(encodeDecode(href), ")"));
        }
        catch (e) {
            void e;
        }
    });
    var plugins = [emojiMarkdownPlugin];
    if (mentioned_users === null || mentioned_users === void 0 ? void 0 : mentioned_users.length) {
        plugins.push(mentionsMarkdownPlugin(mentioned_users));
    }
    var renderers = __assign(__assign({ mention: Mention }, markDownRenderers), options.customMarkDownRenderers);
    return (React.createElement(ReactMarkdown, { allowedTypes: allowedMarkups, escapeHtml: true, plugins: plugins, renderers: renderers, source: newText, transformLinkUri: function (uri) {
            return uri.startsWith('app://') ? uri : RootReactMarkdown.uriTransformer(uri);
        }, unwrapDisallowed: true }));
};
export function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}
/**
 * @deprecated will be removed in the next major release
 */
export var generateRandomId = nanoid;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt#getting_whole_characters
export var getWholeChar = function (str, i) {
    var code = str.charCodeAt(i);
    if (Number.isNaN(code))
        return '';
    if (code < 0xd800 || code > 0xdfff)
        return str.charAt(i);
    if (0xd800 <= code && code <= 0xdbff) {
        if (str.length <= i + 1) {
            throw 'High surrogate without following low surrogate';
        }
        var next = str.charCodeAt(i + 1);
        if (0xdc00 > next || next > 0xdfff) {
            throw 'High surrogate without following low surrogate';
        }
        return str.charAt(i) + str.charAt(i + 1);
    }
    if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
    }
    var prev = str.charCodeAt(i - 1);
    if (0xd800 > prev || prev > 0xdbff) {
        throw 'Low surrogate without preceding high surrogate';
    }
    return '';
};

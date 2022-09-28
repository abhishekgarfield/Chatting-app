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
import { useCallback, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useEmojiIndex } from './useEmojiIndex';
import { useAttachments } from './useAttachments';
import { useMessageInputText } from './useMessageInputText';
import { useEmojiPicker } from './useEmojiPicker';
import { useSubmitHandler } from './useSubmitHandler';
import { usePasteHandler } from './usePasteHandler';
var makeEmptyMessageInputState = function () { return ({
    attachments: [],
    emojiPickerIsOpen: false,
    fileOrder: [],
    fileUploads: {},
    imageOrder: [],
    imageUploads: {},
    mentioned_users: [],
    setText: function () { return null; },
    text: '',
}); };
/**
 * Initializes the state. Empty if the message prop is falsy.
 */
var initState = function (message) {
    var _a, _b, _c, _d, _e;
    if (!message) {
        return makeEmptyMessageInputState();
    }
    // if message prop is defined, get image uploads, file uploads, text, etc.
    var imageUploads = (_b = (_a = message.attachments) === null || _a === void 0 ? void 0 : _a.filter(function (_a) {
        var type = _a.type;
        return type === 'image';
    }).reduce(function (acc, _a) {
        var author_name = _a.author_name, _b = _a.fallback, fallback = _b === void 0 ? '' : _b, image_url = _a.image_url, og_scrape_url = _a.og_scrape_url, text = _a.text, title = _a.title, title_link = _a.title_link;
        var id = nanoid();
        acc[id] = {
            author_name: author_name,
            file: {
                name: fallback,
            },
            id: id,
            og_scrape_url: og_scrape_url,
            state: 'finished',
            text: text,
            title: title,
            title_link: title_link,
            url: image_url,
        };
        return acc;
    }, {})) !== null && _b !== void 0 ? _b : {};
    var fileUploads = (_d = (_c = message.attachments) === null || _c === void 0 ? void 0 : _c.filter(function (_a) {
        var type = _a.type;
        return type === 'file';
    }).reduce(function (acc, _a) {
        var asset_url = _a.asset_url, file_size = _a.file_size, mime_type = _a.mime_type, _b = _a.title, title = _b === void 0 ? '' : _b;
        var id = nanoid();
        acc[id] = {
            file: {
                name: title,
                size: file_size,
                type: mime_type,
            },
            id: id,
            state: 'finished',
            url: asset_url,
        };
        return acc;
    }, {})) !== null && _d !== void 0 ? _d : {};
    var imageOrder = Object.keys(imageUploads);
    var fileOrder = Object.keys(fileUploads);
    var attachments = ((_e = message.attachments) === null || _e === void 0 ? void 0 : _e.filter(function (_a) {
        var type = _a.type;
        return type !== 'file' && type !== 'image';
    })) || [];
    var mentioned_users = message.mentioned_users || [];
    return {
        attachments: attachments,
        emojiPickerIsOpen: false,
        fileOrder: fileOrder,
        fileUploads: fileUploads,
        imageOrder: imageOrder,
        imageUploads: imageUploads,
        mentioned_users: mentioned_users,
        setText: function () { return null; },
        text: message.text || '',
    };
};
/**
 * MessageInput state reducer
 */
var messageInputReducer = function (state, action) {
    var _a, _b;
    switch (action.type) {
        case 'setEmojiPickerIsOpen':
            return __assign(__assign({}, state), { emojiPickerIsOpen: action.value });
        case 'setText':
            return __assign(__assign({}, state), { text: action.getNewText(state.text) });
        case 'clear':
            return makeEmptyMessageInputState();
        case 'setImageUpload': {
            var imageAlreadyExists = state.imageUploads[action.id];
            if (!imageAlreadyExists && !action.file)
                return state;
            var imageOrder = imageAlreadyExists ? state.imageOrder : state.imageOrder.concat(action.id);
            var newUploadFields = __assign({}, action);
            delete newUploadFields.type;
            return __assign(__assign({}, state), { imageOrder: imageOrder, imageUploads: __assign(__assign({}, state.imageUploads), (_a = {}, _a[action.id] = __assign(__assign({}, state.imageUploads[action.id]), newUploadFields), _a)) });
        }
        case 'setFileUpload': {
            var fileAlreadyExists = state.fileUploads[action.id];
            if (!fileAlreadyExists && !action.file)
                return state;
            var fileOrder = fileAlreadyExists ? state.fileOrder : state.fileOrder.concat(action.id);
            var newUploadFields = __assign({}, action);
            delete newUploadFields.type;
            return __assign(__assign({}, state), { fileOrder: fileOrder, fileUploads: __assign(__assign({}, state.fileUploads), (_b = {}, _b[action.id] = __assign(__assign({}, state.fileUploads[action.id]), newUploadFields), _b)) });
        }
        case 'removeImageUpload': {
            if (!state.imageUploads[action.id])
                return state; // cannot remove anything
            var newImageUploads = __assign({}, state.imageUploads);
            delete newImageUploads[action.id];
            return __assign(__assign({}, state), { imageOrder: state.imageOrder.filter(function (_id) { return _id !== action.id; }), imageUploads: newImageUploads });
        }
        case 'removeFileUpload': {
            if (!state.fileUploads[action.id])
                return state; // cannot remove anything
            var newFileUploads = __assign({}, state.fileUploads);
            delete newFileUploads[action.id];
            return __assign(__assign({}, state), { fileOrder: state.fileOrder.filter(function (_id) { return _id !== action.id; }), fileUploads: newFileUploads });
        }
        case 'addMentionedUser':
            return __assign(__assign({}, state), { mentioned_users: state.mentioned_users.concat(action.user) });
        default:
            return state;
    }
};
/**
 * hook for MessageInput state
 */
export var useMessageInputState = function (props) {
    var additionalTextareaProps = props.additionalTextareaProps, closeEmojiPickerOnClick = props.closeEmojiPickerOnClick, message = props.message;
    var _a = useChannelStateContext('useMessageInputState'), _b = _a.channelCapabilities, channelCapabilities = _b === void 0 ? {} : _b, channelConfig = _a.channelConfig;
    var defaultValue = additionalTextareaProps === null || additionalTextareaProps === void 0 ? void 0 : additionalTextareaProps.defaultValue;
    var initialStateValue = message ||
        (Array.isArray(defaultValue)
            ? { text: defaultValue.join('') }
            : { text: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString() });
    var _c = useReducer(messageInputReducer, initialStateValue, initState), state = _c[0], dispatch = _c[1];
    var _d = useMessageInputText(props, state, dispatch), handleChange = _d.handleChange, insertText = _d.insertText, textareaRef = _d.textareaRef;
    var _e = useState(false), showCommandsList = _e[0], setShowCommandsList = _e[1];
    var _f = useState(false), showMentionsList = _f[0], setShowMentionsList = _f[1];
    var openCommandsList = function () {
        dispatch({
            getNewText: function () { return '/'; },
            type: 'setText',
        });
        setShowCommandsList(true);
    };
    var closeCommandsList = function () { return setShowCommandsList(false); };
    var openMentionsList = function () {
        dispatch({
            getNewText: function (currentText) { return currentText + '@'; },
            type: 'setText',
        });
        setShowMentionsList(true);
    };
    var closeMentionsList = function () { return setShowMentionsList(false); };
    var _g = useEmojiPicker(state, dispatch, insertText, textareaRef, closeEmojiPickerOnClick), closeEmojiPicker = _g.closeEmojiPicker, emojiPickerRef = _g.emojiPickerRef, handleEmojiKeyDown = _g.handleEmojiKeyDown, onSelectEmoji = _g.onSelectEmoji, openEmojiPicker = _g.openEmojiPicker;
    var _h = useAttachments(props, state, dispatch, textareaRef), maxFilesLeft = _h.maxFilesLeft, numberOfUploads = _h.numberOfUploads, removeFile = _h.removeFile, removeImage = _h.removeImage, uploadFile = _h.uploadFile, uploadImage = _h.uploadImage, uploadNewFiles = _h.uploadNewFiles;
    var handleSubmit = useSubmitHandler(props, state, dispatch, numberOfUploads).handleSubmit;
    var isUploadEnabled = (channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.uploads) !== false && channelCapabilities['upload-file'] !== false;
    var onPaste = usePasteHandler(uploadNewFiles, insertText, isUploadEnabled).onPaste;
    var onSelectUser = useCallback(function (item) {
        dispatch({ type: 'addMentionedUser', user: item });
    }, []);
    var setText = useCallback(function (text) {
        dispatch({ getNewText: function () { return text; }, type: 'setText' });
    }, []);
    return __assign(__assign({}, state), { closeCommandsList: closeCommandsList, 
        /**
         * TODO: fix the below at some point because this type casting is wrong
         * and just forced to not have warnings currently with the unknown casting
         */
        closeEmojiPicker: closeEmojiPicker, closeMentionsList: closeMentionsList, emojiIndex: useEmojiIndex(), emojiPickerRef: emojiPickerRef, handleChange: handleChange, handleEmojiKeyDown: handleEmojiKeyDown, handleSubmit: handleSubmit, insertText: insertText, isUploadEnabled: isUploadEnabled, maxFilesLeft: maxFilesLeft, numberOfUploads: numberOfUploads, onPaste: onPaste, onSelectEmoji: onSelectEmoji, onSelectUser: onSelectUser, openCommandsList: openCommandsList, openEmojiPicker: openEmojiPicker, openMentionsList: openMentionsList, removeFile: removeFile, removeImage: removeImage, setText: setText, showCommandsList: showCommandsList, showMentionsList: showMentionsList, textareaRef: textareaRef, uploadFile: uploadFile, uploadImage: uploadImage, uploadNewFiles: uploadNewFiles });
};

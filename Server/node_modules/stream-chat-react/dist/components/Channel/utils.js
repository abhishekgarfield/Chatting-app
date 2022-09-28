var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { nanoid } from 'nanoid';
export var makeAddNotifications = function (setNotifications, notificationTimeouts) { return function (text, type) {
    if (typeof text !== 'string' || (type !== 'success' && type !== 'error')) {
        return;
    }
    var id = nanoid();
    setNotifications(function (prevNotifications) { return __spreadArray(__spreadArray([], prevNotifications, true), [{ id: id, text: text, type: type }], false); });
    var timeout = setTimeout(function () {
        return setNotifications(function (prevNotifications) {
            return prevNotifications.filter(function (notification) { return notification.id !== id; });
        });
    }, 5000);
    notificationTimeouts.push(timeout);
}; };

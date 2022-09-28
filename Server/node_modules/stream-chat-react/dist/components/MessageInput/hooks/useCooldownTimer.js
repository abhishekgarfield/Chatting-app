import { useEffect, useState } from 'react';
import { useChatContext } from '../../../context/ChatContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
export var useCooldownTimer = function () {
    var latestMessageDatesByChannels = useChatContext('useCooldownTimer').latestMessageDatesByChannels;
    var channel = useChannelStateContext('useCooldownTimer').channel;
    var _a = (channel.data ||
        {}), cooldownInterval = _a.cooldown, own_capabilities = _a.own_capabilities;
    var _b = useState(), cooldownRemaining = _b[0], setCooldownRemaining = _b[1];
    var skipCooldown = !(own_capabilities === null || own_capabilities === void 0 ? void 0 : own_capabilities.includes('slow-mode'));
    useEffect(function () {
        var latestMessageDate = latestMessageDatesByChannels[channel.cid];
        if (!cooldownInterval || !latestMessageDate) {
            return;
        }
        var remainingCooldown = Math.round(cooldownInterval - (new Date().getTime() - latestMessageDate.getTime()) / 1000);
        if (remainingCooldown > 0 && !skipCooldown) {
            setCooldownRemaining(remainingCooldown);
        }
    }, [channel.id, cooldownInterval, latestMessageDatesByChannels[channel.cid]]);
    return {
        cooldownInterval: cooldownInterval || 0,
        cooldownRemaining: cooldownRemaining,
        setCooldownRemaining: setCooldownRemaining,
    };
};

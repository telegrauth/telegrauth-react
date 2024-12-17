import React from 'react';
import { TelegramAuthModalProps } from '../renders';
import { StateRequestFn } from '../types';
interface TelegramLoginModalProps {
    appId: string;
    requestId: string;
    botName: string;
    onStateRequest: StateRequestFn;
    modalComponent?: React.ComponentType<TelegramAuthModalProps>;
    onCancel?: (byUserRequest: boolean) => void;
    onLogin?: (code: string, state?: string) => void;
}
export declare const TelegramLoginModal: React.FC<TelegramLoginModalProps>;
export {};

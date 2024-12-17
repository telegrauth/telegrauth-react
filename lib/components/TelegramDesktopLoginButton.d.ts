import type { TelegramLoginButtonProps } from './TelegramLoginButton';
import { InitRequestFn, StateRequestFn } from '../types';
export interface TelegramDesktopLoginButtonProps extends Omit<TelegramLoginButtonProps, 'authServer'> {
    onInitRequest: InitRequestFn;
    onStateRequest: StateRequestFn;
}
export declare const TelegramDesktopLoginButton: React.FC<TelegramDesktopLoginButtonProps>;

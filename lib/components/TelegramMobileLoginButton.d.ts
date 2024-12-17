import type { TelegramLoginButtonProps } from './TelegramLoginButton';
import { InitRequestFn, StateRequestFn } from '../types';
export interface TelegramMobileLoginButtonProps extends Omit<TelegramLoginButtonProps, 'authServer'> {
    onInitRequest: InitRequestFn;
    onStateRequest: StateRequestFn;
}
export declare const TelegramMobileLoginButton: React.FC<TelegramMobileLoginButtonProps>;

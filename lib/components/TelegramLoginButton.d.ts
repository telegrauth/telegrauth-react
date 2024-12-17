import { InitRequestFn, StateRequestFn } from '../types';
export interface TelegramLoginButtonProps {
    appId: string;
    state?: string;
    simpleMobileFlowDisabled?: boolean;
    authServer?: string;
    onInitRequest?: InitRequestFn;
    onStateRequest?: StateRequestFn;
    onLogin?: (code: string, state?: string) => void;
}
export declare const TelegramLoginButton: React.FC<TelegramLoginButtonProps>;

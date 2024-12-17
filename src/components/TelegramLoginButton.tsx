import { TELEGRAUTH_SERVER_URL } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';
import { defaultInitRequest, defaultStateRequest } from '../requests';
import { InitRequestFn, StateRequestFn } from '../types';

import { TelegramDesktopLoginButton } from './TelegramDesktopLoginButton';
import { TelegramMobileLoginButton } from './TelegramMobileLoginButton';

export interface TelegramLoginButtonProps {
	appId: string;
	state?: string;
	simpleMobileFlowDisabled?: boolean;
	authServer?: string;
	onInitRequest?: InitRequestFn;
	onStateRequest?: StateRequestFn;
	onLogin?: (code: string, state?: string) => void;
}

export const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
	appId,
	state,
	simpleMobileFlowDisabled,
	authServer = TELEGRAUTH_SERVER_URL,
	onInitRequest = defaultInitRequest(authServer),
	onStateRequest = defaultStateRequest(authServer),
	onLogin,
}: TelegramLoginButtonProps) => {
	const isMobile = useIsMobile();

	if (isMobile && simpleMobileFlowDisabled !== true) {
		return (
			<TelegramMobileLoginButton
				appId={appId}
				state={state}
				onInitRequest={onInitRequest}
				onStateRequest={onStateRequest}
				onLogin={onLogin}
			/>
		);
	} else {
		return (
			<TelegramDesktopLoginButton
				appId={appId}
				onInitRequest={onInitRequest}
				onStateRequest={onStateRequest}
				onLogin={onLogin}
			/>
		);
	}
};

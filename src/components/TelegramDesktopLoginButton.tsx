import { useCallback, useState } from 'react';

import type { TelegramLoginButtonProps } from './TelegramLoginButton';

import { TelegramLoginModal } from './TelegramLoginModal';
import { LinkButton } from '../controls/LinkButton';

import { LoaderIcon } from '../icons/LoaderIcon';
import { TelegramIcon } from '../icons/TelegramIcon';

import { InitRequestFn, StateRequestFn } from '../types';

export interface TelegramDesktopLoginButtonProps extends Omit<TelegramLoginButtonProps, 'authServer'> {
	onInitRequest: InitRequestFn;
	onStateRequest: StateRequestFn;
}

export const TelegramDesktopLoginButton: React.FC<TelegramDesktopLoginButtonProps> = ({
	onInitRequest,
	onStateRequest,
	appId,
	onLogin,
}) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<{ requestId: string; botName: string } | null>(null);

	const handleClick = useCallback(async () => {
		setLoading(true);

		try {
			const response = await onInitRequest(appId);

			setData({
				requestId: response.authRequestId,
				botName: response.botName,
			});
		} catch (error: unknown) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [onInitRequest, appId]);

	const handleCancel = useCallback(() => {
		setData(null);
	}, []);

	return (
		<>
			<LinkButton onClick={handleClick} href="#" disabled={loading}>
				{loading ? (
					<>
						<LoaderIcon className="tauth-icon" />
						Login with Telegram
					</>
				) : (
					<>
						<TelegramIcon className="tauth-icon" />
						Login with Telegram
					</>
				)}
			</LinkButton>
			{data ? (
				<TelegramLoginModal
					appId={appId}
					requestId={data.requestId}
					botName={data.botName}
					onStateRequest={onStateRequest}
					onCancel={handleCancel}
					onLogin={onLogin}
				/>
			) : null}
		</>
	);
};

import { useState, useEffect, useCallback } from 'react';
import { TelegramIcon } from '../icons/TelegramIcon';
import { LoaderIcon } from '../icons/LoaderIcon';
import { LinkButton } from '../controls/LinkButton';
import type { TelegramLoginButtonProps } from './TelegramLoginButton';
import { InitRequestFn, StateRequestFn } from '../types';

export interface TelegramMobileLoginButtonProps extends Omit<TelegramLoginButtonProps, 'authServer'> {
	onInitRequest: InitRequestFn;
	onStateRequest: StateRequestFn;
}

export const TelegramMobileLoginButton: React.FC<TelegramMobileLoginButtonProps> = ({
	onInitRequest,
	onStateRequest,
	appId,
	onLogin,
}) => {
	const [data, setData] = useState<{ requestId: string; botName: string } | null>(null);
	const [polling, setPolling] = useState<boolean>(false);

	const init = useCallback(async () => {
		try {
			const response = await onInitRequest(appId);
			setData({
				requestId: response.authRequestId,
				botName: response.botName,
			});
		} catch (error) {
			console.error(error);
		}
	}, [appId, onInitRequest]);

	useEffect(() => {
		init();
	}, [init]);

	useEffect(() => {
		if (data && polling) {
			const startTime = Date.now();
			let timer: number | null = null;

			const TIME_TRESHOLD = 5 * 60 * 1000;

			const pollingTick = async () => {
				console.log(`Mobile button polling tick, requestId: ${data.requestId}`);

				try {
					const response = await onStateRequest(data.requestId);
					if (response) {
						if (timer) {
							clearInterval(timer);
							timer = null;
						}
						if (onLogin) {
							onLogin(response.code, response.state ?? undefined);
						} else {
							const successUrl = response.successUrl || response.fixedCallbackUrl;
							if (!successUrl) {
								throw new Error('onLogin handler or success URL is required');
							}

							const redirectUrl = new URL(successUrl);
							const redirectSearchParams = new URLSearchParams(redirectUrl.searchParams);

							redirectSearchParams.set('result', 'success');
							redirectSearchParams.set('code', response.code);
							if (typeof response.state !== 'undefined' && response.state !== null) {
								redirectSearchParams.set('state', response.state);
							}

							redirectUrl.search = redirectSearchParams.toString();
							document.location.href = redirectUrl.toString();
						}
					} else {
						if (Date.now() - startTime > TIME_TRESHOLD) {
							if (timer) {
								clearInterval(timer);
								timer = null;
							}
							return;
						}
					}
				} catch (error) {
					console.error(error);

					if (Date.now() - startTime > TIME_TRESHOLD) {
						if (timer) {
							clearInterval(timer);
							timer = null;
						}
						return;
					}
				}
			};

			timer = setInterval(pollingTick, 1000);

			return () => {
				if (timer) {
					clearInterval(timer);
					timer = null;
				}
			};
		}
	}, [data, polling, onStateRequest, onLogin]);

	const handleClick = () => {
		setPolling(true);
	};

	return !data ? (
		<LinkButton disabled={!data}>
			<LoaderIcon />
			Login with Telegram
		</LinkButton>
	) : (
		<LinkButton
			onClick={handleClick}
			href={`tg://resolve?domain=${encodeURIComponent(data.botName)}&start=tga_m_${appId}_${data.requestId}`}
			target="_blank"
		>
			<TelegramIcon />
			Login with Telegram
		</LinkButton>
	);
};

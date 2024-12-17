import { QRCodeSVG } from 'qrcode.react';

import { useIsMobile } from './hooks/useIsMobile';
import { Dialog } from './controls/Dialog';

export interface TelegramAuthModalProps {
	qrAuthUrl: string;
	desktopAuthUrl: string;
	mobileAuthUrl: string;

	onClose: () => void;
}

export const DefaultModal: React.FC<TelegramAuthModalProps> = ({
	qrAuthUrl,
	desktopAuthUrl,
	mobileAuthUrl,
	onClose,
}) => {
	const isMobile = useIsMobile();

	return (
		<Dialog onClose={onClose}>
			<div className="ta-col qr-col">
				<div className="ta-top">
					<h2 className="ta-title">Use Telegram on your phone</h2>
					<h3 className="ta-subtitle">You have Telegram on your phone</h3>
				</div>
				<div className="ta-main">
					<div className="ta-main-qr">
						<div className="ta-qr">
							<QRCodeSVG value={qrAuthUrl} width={196} height={196} />
						</div>
					</div>
					<div className="ta-main-subtitle">Scan QR, then tap "Start" in the opened bot</div>
				</div>
				<div className="ta-bottom">
					This QR code is secure and will expire after a short time for your safety.
				</div>
			</div>
			<div className="ta-col app-col">
				<div className="ta-top">
					<h2 className="ta-title ta-desktop">Use Telegram Desktop</h2>
					<h2 className="ta-title ta-mobile">Use Telegram App</h2>
					<h3 className="ta-subtitle ta-desktop">You have Telegram Desktop installed</h3>
					<h3 className="ta-subtitle ta-mobile">If you have Telegram App installed</h3>
				</div>
				<div className="ta-main">
					<a className="ta-main-link" id="b" href={isMobile ? mobileAuthUrl : desktopAuthUrl}>
						Open Telegram App
					</a>
					<div className="ta-main-subtitle">Open the link, then press "Start" in the opened bot</div>
				</div>
				<div className="ta-bottom">
					Your data is encrypted and the authentication process is completely secure.
				</div>
			</div>
		</Dialog>
	);
};

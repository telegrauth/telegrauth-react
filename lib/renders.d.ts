export interface TelegramAuthModalProps {
    qrAuthUrl: string;
    desktopAuthUrl: string;
    mobileAuthUrl: string;
    onClose: () => void;
}
export declare const DefaultModal: React.FC<TelegramAuthModalProps>;

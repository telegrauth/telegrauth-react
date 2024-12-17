import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect } from 'react';
import { DefaultModal } from '../renders';
export const TelegramLoginModal = ({ appId, requestId, botName, modalComponent = DefaultModal, onStateRequest, onCancel, onLogin, }) => {
    useEffect(() => {
        const startTime = Date.now();
        const TIME_THRESHOLD = 5 * 60 * 1000;
        const timer = setInterval(async () => {
            console.log(`Polling modal tick, requestId: ${requestId}`);
            try {
                const response = await onStateRequest(requestId);
                if (response) {
                    if (onLogin) {
                        onLogin(response.code, response.state ?? undefined);
                    }
                    else {
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
                }
                else {
                    if (Date.now() - startTime > TIME_THRESHOLD) {
                        onCancel?.(false);
                    }
                }
            }
            catch (error) {
                console.error(error);
                if (Date.now() - startTime > TIME_THRESHOLD) {
                    onCancel?.(false);
                }
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [requestId, onStateRequest, onCancel, onLogin]);
    const botNameCmp = encodeURIComponent(botName);
    const qrAuthUrl = `tg://resolve?domain=${botNameCmp}&start=tga_q_${appId}_${requestId}`;
    const desktopAuthUrl = `tg://resolve?domain=${botNameCmp}&start=tga_d_${appId}_${requestId}`;
    const mobileAuthUrl = `tg://resolve?domain=${botNameCmp}&start=tga_m_${appId}_${requestId}`;
    const handleUserClose = useCallback(() => {
        onCancel?.(true);
    }, [onCancel]);
    const ModalCmp = modalComponent;
    return (_jsx(ModalCmp, { qrAuthUrl: qrAuthUrl, desktopAuthUrl: desktopAuthUrl, mobileAuthUrl: mobileAuthUrl, onClose: handleUserClose }));
};
//# sourceMappingURL=TelegramLoginModal.js.map
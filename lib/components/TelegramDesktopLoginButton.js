import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { TelegramLoginModal } from './TelegramLoginModal';
import { LinkButton } from '../controls/LinkButton';
import { LoaderIcon } from '../icons/LoaderIcon';
import { TelegramIcon } from '../icons/TelegramIcon';
export const TelegramDesktopLoginButton = ({ onInitRequest, onStateRequest, appId, onLogin, }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const handleClick = useCallback(async () => {
        setLoading(true);
        try {
            const response = await onInitRequest(appId);
            setData({
                requestId: response.authRequestId,
                botName: response.botName,
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [onInitRequest, appId]);
    const handleCancel = useCallback(() => {
        setData(null);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(LinkButton, { onClick: handleClick, href: "#", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(LoaderIcon, { className: "tauth-icon" }), "Login with Telegram"] })) : (_jsxs(_Fragment, { children: [_jsx(TelegramIcon, { className: "tauth-icon" }), "Login with Telegram"] })) }), data ? (_jsx(TelegramLoginModal, { appId: appId, requestId: data.requestId, botName: data.botName, onStateRequest: onStateRequest, onCancel: handleCancel, onLogin: onLogin })) : null] }));
};
//# sourceMappingURL=TelegramDesktopLoginButton.js.map
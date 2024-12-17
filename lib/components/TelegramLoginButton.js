import { jsx as _jsx } from "react/jsx-runtime";
import { TELEGRAUTH_SERVER_URL } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';
import { defaultInitRequest, defaultStateRequest } from '../requests';
import { TelegramDesktopLoginButton } from './TelegramDesktopLoginButton';
import { TelegramMobileLoginButton } from './TelegramMobileLoginButton';
export const TelegramLoginButton = ({ appId, state, simpleMobileFlowDisabled, authServer = TELEGRAUTH_SERVER_URL, onInitRequest = defaultInitRequest(authServer), onStateRequest = defaultStateRequest(authServer), onLogin, }) => {
    const isMobile = useIsMobile();
    if (isMobile && simpleMobileFlowDisabled !== true) {
        return (_jsx(TelegramMobileLoginButton, { appId: appId, state: state, onInitRequest: onInitRequest, onStateRequest: onStateRequest, onLogin: onLogin }));
    }
    else {
        return (_jsx(TelegramDesktopLoginButton, { appId: appId, onInitRequest: onInitRequest, onStateRequest: onStateRequest, onLogin: onLogin }));
    }
};
//# sourceMappingURL=TelegramLoginButton.js.map
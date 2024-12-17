import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
export const Dialog = ({ children, onClose }) => {
    return ReactDOM.createPortal(_jsx("div", { className: "tauth-dialog-overlay", onClick: onClose, children: _jsxs("div", { className: "tauth-dialog-content", onClick: e => e.stopPropagation(), children: [_jsx("button", { className: "tauth-dialog-close", onClick: onClose, children: "\u00D7" }), children] }) }), document.body);
};
//# sourceMappingURL=Dialog.js.map
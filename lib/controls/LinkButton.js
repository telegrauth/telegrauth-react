import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
export const LinkButton = ({ children, className, disabled, ...props }) => {
    return (_jsx("a", { className: clsx('tauth-button', { disabled }, className), ...props, children: children }));
};
//# sourceMappingURL=LinkButton.js.map
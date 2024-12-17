import { AnchorHTMLAttributes } from 'react';
import clsx from 'clsx';

export const LinkButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean }> = ({
	children,
	className,
	disabled,
	...props
}) => {
	return (
		<a className={clsx('tauth-button', { disabled }, className)} {...props}>
			{children}
		</a>
	);
};

import React from 'react';
import ReactDOM from 'react-dom';

export const Dialog = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
	return ReactDOM.createPortal(
		<div className="tauth-dialog-overlay" onClick={onClose}>
			<div className="tauth-dialog-content" onClick={e => e.stopPropagation()}>
				<button className="tauth-dialog-close" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
};

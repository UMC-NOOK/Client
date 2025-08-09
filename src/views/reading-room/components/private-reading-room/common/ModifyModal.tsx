// components/common/Modal.tsx
import { ReactNode } from 'react';

export default function Modal({
    children
    }: { children: ReactNode; onClose: () => void }) {
        return (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center">
            <div className="w-462 h-280 backdrop-blur-md rounded-lg">
                {children}
            </div>
        </div>
    );
}

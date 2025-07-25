import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/10" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 z-10 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#F4F4F4] p-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">{children}</div>

        {footer && <div className="border-t border-gray-200 p-4">{footer}</div>}
      </div>
    </div>
  );
}

// src/components/DropdownPortal.tsx
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

interface DropdownPortalProps {
  isOpen: boolean;
  onClose: () => void;
  targetElement: HTMLElement | null;
  children: React.ReactNode;
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({ 
  isOpen, 
  onClose, 
  targetElement, 
  children 
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });

      // Tambahkan event listener untuk menutup dropdown ketika klik di luar
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
            !targetElement.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, targetElement, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1000
      }}
      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to parent elements
    >
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;
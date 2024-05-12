import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import './Modal.css';

type ModalProps = {
  onClose?: () => void,
  children?: ReactNode,
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen
      className='Modal'
      portalClassName='ModalPortal'
      overlayClassName='ModalOverlay'
      shouldCloseOnOverlayClick={false}
      onRequestClose={onClose}
    >
      {children}
    </ReactModal>
  );
}

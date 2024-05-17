import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import './Modal.css';

type ModalProps = {
  onClose?: () => void,
  children?: ReactNode,
};

export default function Modal({ children }: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [visibleChildren, setVisibleChildren] = useState(children);

  useEffect(() => {
    if (children) {
      setVisible(true);
      setVisibleChildren(children);
    }
    else {
      setVisible(false);
    }
  }, [children]);

  return (
    <ReactModal
      isOpen
      className={`Modal ${visible ? 'visible' : ''}`}
      portalClassName='ModalPortal'
      overlayClassName={`ModalOverlay ${visible ? 'visible' : ''}`}
      shouldCloseOnOverlayClick={false}
    >
      {visibleChildren}
    </ReactModal>
  );
}

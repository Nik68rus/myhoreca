import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  heading: string;
};

const Modal = ({ children, onClose, heading }: Props) => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  if (isBrowser) {
    return createPortal(
      <section className="modal">
        <div className="modal__overlay" onClick={onClose} />
        <div className="modal__content">
          <button
            aria-label="Закрыть модальное окно"
            onClick={onClose}
            className="modal__close-btn"
          >
            <FaTimes />
          </button>
          <h2 className="modal__heading">{heading}</h2>
          <div className="modal__body">{children}</div>
        </div>
      </section>,
      document.getElementById('modal-root')!
    );
  }

  return <></>;
};

export default Modal;

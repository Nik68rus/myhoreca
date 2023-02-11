import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Heading from '../ui/Heading';
import cx from 'classnames';
import useScrollLock from '../../hooks/useScrollLock';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  heading: string;
  className?: string;
};

const Modal = ({ children, onClose, heading, className }: Props) => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const [isBrowser, setIsBrowser] = useState(false);
  useScrollLock();

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
      <section className={cx('modal', className ? className : '')}>
        <div className="modal__overlay" onClick={onClose} />
        <div className="modal__content">
          <button
            aria-label="Закрыть модальное окно"
            onClick={onClose}
            className="modal__close-btn"
          >
            <FaTimes />
          </button>
          <Heading level={3} className={cx('modal__heading mb-8')}>
            {heading}
          </Heading>
          <div className="modal__body">{children}</div>
        </div>
      </section>,
      document.getElementById('modal-root')!
    );
  }

  return <></>;
};

export default Modal;

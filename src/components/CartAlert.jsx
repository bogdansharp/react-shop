import React, { useEffect } from 'react';
import './CartAlert.css';

export default function CartAlert({ text, closeAlert = Function.prototype }) {
  useEffect(() => {
    const timerId = setTimeout(closeAlert, 3000);
    return () => clearTimeout(timerId);
  }, [text, closeAlert]);

  return (
    <div id="toast-container" className="ease-in-out duration-300 fixed bg-amber-400 text-white right-14 sm:right-16 sm:top-20 py-2 px-2 cursor-pointer bottom-16 sm:bottom-auto z-30 sm:min-h-12 rounded-md">
      <div className="toast sm:mt-1">{text}</div>
    </div>
  );
}

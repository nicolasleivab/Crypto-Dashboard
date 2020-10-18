import React, { useContext } from 'react';
import ModalContext from '../../context/modal/modalContext';

export default function Copyright(props) {
  const { copyright, blurMode } = props;
  const modalContext = useContext(ModalContext);
  const { modal } = modalContext;

  return (
    <div className={modal ? blurMode : null}>
      <p
        style={{
          textAlign: 'center',
          marginBottom: 10,
          color: '#ccffff',
          fontSize: '1.3rem',
        }}
      >
        {'Copyright ©' + copyright + ' ' + new Date().getFullYear() + '.'}
      </p>
    </div>
  );
}

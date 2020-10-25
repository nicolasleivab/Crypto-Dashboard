import React, { useContext } from 'react';

export default function Copyright(props) {
  const { copyright, blurMode, modal } = props;

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

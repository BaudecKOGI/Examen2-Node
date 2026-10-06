import React from 'react';

const AlertMessage = ({ error, success }) => {
  if (!error && !success) return null;
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </>
  );
};

export default AlertMessage;
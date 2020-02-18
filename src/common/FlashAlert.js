import React from 'react';
import { Alert } from 'reactstrap';

const FlashAlert = (props) => {
  let alertColor;
  switch(props.type) {
    case 'success':
      alertColor = 'success';
      break;
    default:
      alertColor = 'danger';
  }

  return (
    <div>
      <Alert color={alertColor}>
        {props.message}
      </Alert>
    </div>
  );
};

export default FlashAlert;
import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const BallIcon = ( { fill }) => (
  <SvgIcon>
    <circle cx="12" cy="12" r="10" fill={fill} />
  </SvgIcon>
);

export default BallIcon;
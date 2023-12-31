import React from 'react';
import { Button } from 'antd';
import { ButtonSpinner } from '../common/Spinner';

const PrimaryButton = ({ title, size, onClick, disabled, loading, icon, htmlType, className }) => {
  return (
    <Button
      type="default"
      size={size}
      onClick={onClick}
      disabled={disabled}
      // loading={loading}
      icon={icon}
      className={`${className}  bg-green font-bold text-white hover:!text-white hover:!border-white hover:bg-pink`}
      htmlType={htmlType}
    >
      <div className='flex justify-evenly'>
        <span>{title}</span>
        {loading && <ButtonSpinner size="small" />}
      </div>
    </Button>
  );
};

export default PrimaryButton;

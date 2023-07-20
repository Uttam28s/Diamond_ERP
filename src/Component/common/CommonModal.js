import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const CommonModal = ({ title, content, buttonText }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <h1>hello</h1>
        {/* {content} */}
      </Modal>
    </div>
  );
};

export default CommonModal;

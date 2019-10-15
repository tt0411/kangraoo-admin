import { Modal } from 'antd';
import React from 'react';
import styles from './index.less';

const LargeImage = props => {
  const { onCancel, src } = props;
  return (
    <Modal title="" visible onCancel={onCancel} footer={null} width={800}>
      <div className={styles.modelImgBox}>
        <img src={src} alt="大图" />
      </div>
    </Modal>
  );
};

export default LargeImage;

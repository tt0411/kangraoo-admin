import React, { useState } from 'react';
import styles from './index.less';
import LargeImage from './LargeImage';

export default function ImageView(props) {
  const [showImg, setShowImg] = useState(false);
  const { imgSrc } = props;
  return (
    <div className={styles.imgBox}>
        { imgSrc ?
          (<img
            onClick={() => {
              setShowImg(true);
            }}
            src={imgSrc || ''}
            alt="小图"
          />) : null
        }
      {showImg && <LargeImage src={imgSrc || ''} onCancel={() => setShowImg(false)} />}
    </div>
  );
}

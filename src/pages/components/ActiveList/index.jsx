import React from 'react';
import { Avatar } from 'antd';
import Style from './index.less';

export default function ActiveList(props) {
  const { data } = props;
  return (
   <div className={Style.activeList}>
       {
        data.map((item, index) =>
        <div className={Style.listItem} key={item.id}>
        <div className={Style.left}>
         {index <= 2 ? (
        <div className={Style.sortNumfont}><span className={Style.number}>{index + 1}</span></div>
         ) : (
        <div className={Style.sortNum}>{index + 1} </div>
         )}
        { index >= 9 ? (<div className={Style.lastAvter}>
             <Avatar src={item.imgUrl} />
         </div>) : (<div className={Style.avter}>
             <Avatar src={item.imgUrl} />
         </div>)
         }
         <div className={Style.name}>{item.nickName}</div>
        </div>
        <div className={Style.right}>
         <div className={Style.active}>{item.active}</div>
         </div>
     </div>,
     )
    }
   </div>
  );
}

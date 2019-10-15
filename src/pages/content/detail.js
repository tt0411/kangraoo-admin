import React from 'react';
import { Row, Col, Modal, Avatar } from 'antd';
import moment from 'moment';
import ImageView from '@/components/ImageView';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import Styles from './style.less';
import 'video-react/dist/video-react.css';

export default function Detail(props) {
  const { detailData, onCancel } = props;
  const imgList = detailData.img;
  const { video } = detailData;
  const { audio } = detailData;
  return (
    <Modal
      visible
      title="内容详情"
      onCancel={onCancel}
      width="700px"
      maskClosable={false}
      footer={false}
    >
      <div className={Styles.contentBox}>
        <div className={Styles.user}>
          <div className={Styles.avter}>
            <Avatar src={detailData.imgUrl} className={Styles.img}/>
          </div>
          <div className={Styles.nameAndTime}>
            <div className={Styles.left}>
              <div className={Styles.name}>{detailData.nickName}</div>
              <div className={Styles.time}>发表于: {moment(detailData.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className={Styles.right}>所属主题: {detailData.name}</div>
          </div>
        </div>
        <div className={Styles.content}>
          {detailData.context}
        </div>
        <Row gutter={2}>
        { imgList.length === 1 ?
           imgList.map(item =>
           <Col span={24} key={item.id}>
           <ImageView imgSrc={item} />
          </Col>,
           ) : null
        }
         { imgList.length === 2 ?
           imgList.map(item =>
           <Col span={12} key={item.id}>
           <ImageView imgSrc={item} />
          </Col>,
           ) : null
        }
         { imgList.length >= 3 ?
           imgList.map(item =>
           <Col span={8} key={item.id}>
           <ImageView imgSrc={item} />
          </Col>,
           ) : null
        }
        </Row>
        <div className={Styles.video}>
          {
            video ? (
              <Player fluid={false} height={200} width={620}>
               <source src={video}/>
            </Player>
            ) : null
          }
        </div>
        <div className={Styles.audio}>
          {
            audio ? (
              <ReactAudioPlayer
              src={audio}
              autoPlay={false}
              controls
            />
            ) : null
          }
        </div>
         <div className={Styles.mood}>
          发表心情:&nbsp;&nbsp;
          { detailData.mood === 0 ? (<Avatar src="http://pyku15h15.bkt.clouddn.com/sad.png"/>) : null}
          { detailData.mood === 1 ? (<Avatar src="http://pyku15h15.bkt.clouddn.com/normal.png"/>) : null}
          { detailData.mood === 2 ? (<Avatar src="http://pyku15h15.bkt.clouddn.com/happy.png"/>) : null}
        </div>
      </div>
    </Modal>
  );
}

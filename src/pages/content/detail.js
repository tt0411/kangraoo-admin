import React from 'react';
import { Row, Col, Modal, Avatar, Icon, Empty, Tabs } from 'antd';
import moment from 'moment';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import ImageView from '@/components/ImageView';
import Styles from './style.less';
import 'video-react/dist/video-react.css';

const { TabPane } = Tabs;
export default function Detail(props) {
  const { detailData, onCancel, commentList, commentCount, saveCount, markCount,
    saveList, markList } = props;
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
            <div className={Styles.right}>
              <div>所属主题: {detailData.name}</div>
              <div className={Styles.mood}>
            发表时心情:&nbsp;&nbsp;
            { detailData.mood === 0 ? (<Avatar size="small" src="http://pyku15h15.bkt.clouddn.com/sad.png"/>) : null}
            { detailData.mood === 1 ? (<Avatar size="small" src="http://pyku15h15.bkt.clouddn.com/normal.png"/>) : null}
            { detailData.mood === 2 ? (<Avatar size="small" src="http://pyku15h15.bkt.clouddn.com/happy.png"/>) : null}
          </div>
          </div>
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
        <div className={Styles.threeType}>
             <Tabs defaultActiveKey="2" style={{ width: '100%', textAlign: 'center' }}>
              <TabPane
                tab={
                  <span>
                    <Icon type="heart" />
                    点赞 {markCount}次
                  </span>
                }
                key="1"
              >
               <div className={Styles.commentList}>
                <div className={Styles.commentAll}>全部点赞</div>
                { markCount > 0 ? markList.map(item =>
                    <div className={Styles.commentItem}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.marker_name}</div>
                        <div className={Styles.time}>点赞时间: {moment(item.updatetime).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                  <div className={Styles.commentBottom}></div>
                </div>,
                ) : (
                  <Empty />
                )
                }
              </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="message" />
                    评论 {commentCount}条
                  </span>
                }
                key="2"
              >
                <div className={Styles.commentList}>
                <div className={Styles.commentAll}>全部评论</div>
                { commentCount > 0 ? commentList.map(item =>
                    <div className={Styles.commentItem}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.comment_name}</div>
                        <div className={Styles.time}>评论时间: {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                  <div className={Styles.commentBottom}>
                  <div className={Styles.commentContent}>
                  {item.content}
                  </div>
                  </div>
                </div>,
                ) : (
                  <Empty />
                )
                }
              </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="star" />
                    收藏 {saveCount}次
                  </span>
                }
                key="3"
              >
                <div className={Styles.commentList}>
                <div className={Styles.commentAll}>全部收藏</div>
                { saveCount > 0 ? saveList.map(item =>
                    <div className={Styles.commentItem}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.saver_name}</div>
                        <div className={Styles.time}>收藏时间: {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                  <div className={Styles.commentBottom}></div>
                </div>,
                ) : (
                  <Empty />
                )
                }
              </div>
              </TabPane>
            </Tabs>,
        </div>
      </div>
    </Modal>
  );
}

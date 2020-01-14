import React, { Component } from 'react';
import { Row, Col, Modal, Avatar, Icon, Empty, Tabs, Radio, Input, message, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import ImageView from '@/components/ImageView';
import Styles from './style.less';
import 'video-react/dist/video-react.css';

const { TabPane } = Tabs;
const { TextArea } = Input;
@connect(({ content }) => ({ content }))
export default class Detail extends Component {
  state = {
     remarkValue: '',
     radioValue: null,
   }
  componentDidMount() {
      this.setState({
        radioValue: this.props.detailData.flag,
        remarkValue: this.props.detailData.remark,
      })
  }

  onRemarkChange = ({ target: { value } }) => {
    this.setState({ remarkValue: value })
  }
  onRadioChange = ({ target: { value } })  => {
    this.setState({ radioValue: value })
  }

  submitCheck = () => {
    const { radioValue, remarkValue } = this.state;
    if(radioValue === 0) {
      message.warning('请选择审核意见')
      return
    }
    const payload = {
      id: this.props.detailData.id,
      flag: radioValue,
      remark: remarkValue
    }
    this.props.dispatch({
      type: 'content/isStopContent',
      payload,
    })
  }

  render() {
    const { detailData, onCancel, commentList, commentCount, saveCount, markCount, saveList, markList } = this.props;
    const imgList = detailData.img;
    const { video } = detailData;
    const { audio } = detailData;
    let footerObj = null
    let readOnly = false
    if((detailData.flag === 1 && detailData.status === 1) || (detailData.flag === 2 && detailData.status === 1) || detailData.status === 0 || detailData.status === 2) {
      footerObj = null
      readOnly = true
    }else {
      footerObj = [
        <Button onClick={onCancel}>取消</Button>,
        <Button type="primary" onClick={this.submitCheck.bind(this)}>确认提交审核</Button>
      ]
      readOnly = false
    }

  return (
    <Modal
      visible
      title="内容详情"
      onCancel={onCancel}
      width="700px"
      maskClosable={false}
      footer={footerObj}
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
          </div>
           <div className={Styles.right}>
              <div>所属主题: {detailData.name}</div>
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
                    <div className={Styles.commentItem} key={item.id}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.nickName}</div>
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
                    <div className={Styles.commentItem} key={item.id}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.nickName}</div>
                        <div className={Styles.time}>评论时间: {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                  <div className={Styles.commentBottom}>
                  <div className={Styles.commentContent}>
                  {item.comment}
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
                    <div className={Styles.commentItem} key={item.id}>
                  <div className={Styles.commentTop}>
                    <div className={Styles.commentAvter}>
                      <Avatar src={item.imgUrl} size="default"/>
                    </div>
                    <div className={Styles.commentNameTime}>
                        <div className={Styles.name}>{item.nickName}</div>
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
        {  detailData.status !== 0  ?
          <div className={Styles.check} >
          <div className={Styles.checkRadio}>
            <div className={Styles.label}>审核意见: </div>
            <div className={Styles.radio}>
            <Radio.Group disabled={readOnly} onChange={this.onRadioChange} value={this.state.radioValue}>
              <Radio value={1}>审核通过</Radio>
              <Radio value={2}>审核不通过</Radio>
            </Radio.Group>
            </div>
          </div>
          <div className={Styles.remark}>
              <div className={Styles.label}>备注: </div>
              <div className={Styles.remarkContent}>
              <TextArea
                readOnly={readOnly}
                value={this.state.remarkValue}
                onChange={this.onRemarkChange}
                autosize={{ minRows: 3, maxRows: 5 }}
              />
              </div>
          </div>
        </div> : null
        }
      </div>
    </Modal>
  );
}
}

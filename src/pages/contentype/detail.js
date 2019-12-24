import React, {Component} from 'react'
import { connect } from 'dva'
import { Modal, Avatar, Icon, Radio, Input, message, Button } from 'antd';
import Styles from './style.less'

const {TextArea } = Input
@connect(({ contentype }) => ({contentype}))
export default class Detail extends Component {
    state = {
        remarkValue: '',
        radioValue: this.props.detailData.flag,
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
      type: 'contentype/changeContenTypeStatus',
      payload,
    })  
    }
   
    render() {
        const { detailData, onCancel } = this.props
        console.log(detailData)
        return (
         <Modal
            visible
            title="主题审核"
            onCancel={onCancel}
            width="700px"
            maskClosable={false}
            okText={'确认提交审核'}
            onOk={this.submitCheck.bind(this)}
          >
            <div className={Styles.detailBox}>
                <div className={Styles.theme}>
                    <div className={Styles.label}>主题: </div>
                    <div className={Styles.name}>{detailData.name}</div>
                </div>
                <div className={Styles.check}>
                 <div className={Styles.checkRadio}>
                  <div className={Styles.label}>审核意见: </div>
                    <div className={Styles.radio}>
                    <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio value={1}>审核通过</Radio>
                    <Radio value={2}>审核不通过</Radio>
                    </Radio.Group>
                    </div>
                </div>
                <div className={Styles.remark}>
                    <div className={Styles.label}>备注: </div>
                    <div className={Styles.content}>
                     <TextArea
                        value={this.state.remarkValue}
                        onChange={this.onRemarkChange}
                        autosize={{ minRows: 3, maxRows: 5 }}
                    />
                    </div>
                </div>
            </div>  
            </div>
        </Modal>
        )
    }
}
import React, { Component } from 'react';
import { Modal, Row, Col, Form, Input, Button, Radio } from 'antd'
import { connect } from 'dva';

const namespace = 'users'
@connect(({ users }) => ({ users }))
 // eslint-disable-next-line react/prefer-stateless-function
class AddUserForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
           this.props.form.validateFields((err, fieldsValue) => {
           if (!err) {
               const payload = Object.assign(fieldsValue, { imgUrl: 'https://i.loli.net/2019/12/24/xDIlgRtZfTqpmXJ.png' })
               this.props.dispatch({
                   type: `${namespace}/addTestUser`,
                   payload,
               }).then(res => {
                  if (res === 200) {
                     this.props.onCancel()
                  }
               })
            }
        })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { onCancel } = this.props;
      const formItemLayout = {
        labelCol: {
          xs: { span: 7 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 17 },
          sm: { span: 17 },
        },
      };

    return (
       <Modal
        visible
        title="添加测试用户"
        onCancel={onCancel}
        width="700px"
        maskClosable={false}
        footer={false}
        >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row>
         <Col span={12}>
         <Form.Item label="手机号(账号)">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入手机号',
              },
            ],
          })(<Input />)}
         </Form.Item>
        </Col>
        <Col span={12}>
         <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(<Input />)}
         </Form.Item>
        </Col>
        <Col span={12}>
         <Form.Item label="姓名">
          {getFieldDecorator('nickName', {
            rules: [
              {
                required: true,
                message: '请输入姓名',
              },
            ],
          })(<Input />)}
         </Form.Item>
        </Col>
        <Col span={12}>
         <Form.Item label="性别">
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: '请选择性别',
              },
            ],
          })(
            <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>,
          )}
         </Form.Item>
        </Col>
        <Col span={12}>
         <Form.Item label="年龄">
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '请填写年龄',
              },
            ],
          })(<Input type="number" min="1" />)}
         </Form.Item>
        </Col>
        </Row>
        <Form.Item>
        <Button type="default" onClick={onCancel} style={{ float: 'right', right: '-160px' }}>取消</Button>
        <Button type="primary" htmlType="submit" style={{ float: 'right', right: '-150px' }}>添加</Button>
        </Form.Item>
        </Form>
        </Modal>
      );
    }
}
const WrappedAddUserForm = Form.create({ name: 'add_user' })(AddUserForm);
export default WrappedAddUserForm;

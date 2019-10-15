import React from 'react';
import { connect } from 'dva'
import { Form, Icon, Input, Button } from 'antd';
import Styles from './style.less'

const namespace = 'login';
@connect(({ login, loading }) => ({
  login,
  dataLoading: loading.effects[`${namespace}/login`],
}))
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       this.props.dispatch({
         type: `${namespace}/login`,
         payload: values,
       })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={Styles.form} style={{ maxWidth: '300px' }}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请填写账号' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>登录</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;

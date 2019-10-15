import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva'
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const namespace = 'login';
@connect(({ login }) => ({ login }))
class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
       this.props.dispatch({ type: `${namespace}/logout` })
    }

    router.push('/user/login');
  };

  render() {
    const currentUser = {
      real_name: localStorage.getItem('userName'),
      head_img: null,
    }
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.real_name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {currentUser.head_img ? (
            <Avatar
              size="small"
              className={styles.avatar}
              src={currentUser.head_img}
              alt="avatar"
            />
          ) : (
            <Avatar
              size="small"
              className={styles.avatar}
              style={{ backgroundColor: '#cccccc' }}
              icon="user"
            />
          )}

          <span className={styles.name}>{currentUser.real_name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default AvatarDropdown;

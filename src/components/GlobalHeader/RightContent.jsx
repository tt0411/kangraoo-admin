// import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Tag } from 'antd';
// import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
// import SelectLang from '../SelectLang';

import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const {
    currentUser = {
      province_name: '',
      city_name: '',
      county_name: '',
    },
  } = props;
  return (
    <div className={className}>
      {/* <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip> */}
      <Tag color="#108ee9">
        {currentUser.province_name}
        {currentUser.city_name && `/${currentUser.city_name}`}
        {currentUser.county_name && `/${currentUser.county_name}`}
      </Tag>
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);

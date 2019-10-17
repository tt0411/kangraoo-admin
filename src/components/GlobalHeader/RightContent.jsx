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
  // const currentUser = {
  //     province_name: '',
  //     city_name: '',
  //     county_name: '',
  // }

  return (
    <div className={className}>
      {/* <Tag color="#108ee9">
        {currentUser.province_name}
        {currentUser.city_name && `/${currentUser.city_name}`}
        {currentUser.county_name && `/${currentUser.county_name}`}
      </Tag> */}
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);

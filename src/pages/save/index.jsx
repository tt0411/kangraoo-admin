// eslint-disable-next-line eslint-saves/disable-enable-pair
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Badge, Avatar } from 'antd';
import EllipsisTooltip from '@/components/EllipsisTooltip';
import moment from 'moment';
import CheckBox from '@/components/CheckBox';

const namespace = 'save';
@connect(({ save, loading }) => ({
  save,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Save extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/fetchList`,
    });
    this.props.dispatch({
        type: `${namespace}/fetchUserList`,
      });
  }

  searchSumbit = data => {
    const { searchCond } = this.props[namespace];
    Object.entries(data).forEach(([k, v]) => {
    searchCond[k] = v;
    searchCond.page = 1;
    this.props.dispatch({
      type: `${namespace}/changeSearchCond`,
      payload: searchCond,
    });
    this.props.dispatch({
      type: `${namespace}/fetchList`,
    });
  });
}

  handleTableChange = pagination => {
    const { searchCond } = this.props[namespace];
    searchCond.per = pagination.pageSize;
    searchCond.page = pagination.current;
    this.props.dispatch({
      type: `${namespace}/changeSearchCond`,
      payload: searchCond,
    });
    this.props.dispatch({
      type: `${namespace}/fetchList`,
    });
  };

  searchReset = () => {
    const defaultSearchCond = {
      page: 1,
      per: 10,
    };
    this.props.dispatch({
      type: `${namespace}/changeSearchCond`,
      payload: defaultSearchCond,
    });
  };


  render() {
    const {
      dataList,
      totalNum,
      searchCond,
      saveUserList,
    } = this.props[namespace];
    const { dataLoading } = this.props;
    // checkBox
    const searchList = [
      {
        name: '',
        key: 'content',
        type: 'INPUT',
        placeholder: '收藏内容关键字',
        width: '150px',
      },
      {
        name: '',
        key: 'status',
        type: 'SELECT',
        placeholder: '状态',
        width: '120px',
        options: [
          { id: '1', name: '收藏' },
          { id: '0', name: '取消收藏' },
        ],
      },
      {
        name: '',
        key: 'uid',
        type: 'SELECT',
        placeholder: '收藏者',
        width: '150px',
        options: saveUserList,
      },
    ];
    // Table
    const columns = [
        { title: '收藏内容',
        dataIndex: 'context',
        align: 'center',
        width: 200,
        onCell: () => ({
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 200,
            },
          }),
        render: text => (
          <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
        ),
      },
      {
        title: '收藏者头像',
        dataIndex: 'imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '收藏者', dataIndex: 'saver_name', align: 'center' },
      {
        title: '收藏时间',
        dataIndex: 'create_time',
        align: 'center',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        // eslint-disable-next-line consistent-return
        render: text => {
          if (text === 1) {
              return <span><Badge status="processing" />收藏</span>
          } if (text === 0) {
            return <span><Badge status="default" />取消收藏</span>
          }
      } },
    ];
    const pagination = {
      pageSize: searchCond.per,
      total: totalNum,
      showQuickJumper: true,
      current: searchCond.page,
      showTotal: (total, range) => (
        <span>
          目前显示{range[0]}-{range[1]} 条,共 {total} 条
        </span>
      ),
    };
    return (
      <div className="gobal-container">
        <CheckBox
          searchList={searchList}
          searchSumbit={this.searchSumbit}
          fields={searchCond}
          searchReset={this.searchReset}
        />
        <Table
          className="gobal-table"
          rowKey="id"
          columns={columns}
          dataSource={dataList}
          loading={dataLoading}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
export default Save;

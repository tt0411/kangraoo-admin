// eslint-disable-next-line eslint-marks/disable-enable-pair
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Badge, Avatar } from 'antd';
import moment from 'moment';
import EllipsisTooltip from '@/components/EllipsisTooltip';
import CheckBox from '@/components/CheckBox';

const namespace = 'mark';
@connect(({ mark, loading }) => ({
  mark,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Mark extends Component {
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
      markUserList,
    } = this.props[namespace];
    const { dataLoading } = this.props;
    // checkBox
    const searchList = [
      {
        name: '',
        key: 'content',
        type: 'INPUT',
        placeholder: '点赞内容关键字',
        width: '150px',
      },
      {
        name: '',
        key: 'status',
        type: 'SELECT',
        placeholder: '状态',
        width: '120px',
        options: [
          { id: '1', name: '点赞' },
          { id: '0', name: '取消点赞' },
        ],
      },
      {
        name: '',
        key: 'uid',
        type: 'SELECT',
        placeholder: '点赞者',
        width: '150px',
        options: markUserList,
      },
    ];
    // Table
    const columns = [
        { title: '点赞内容',
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
        title: '点赞者头像',
        dataIndex: 'imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '点赞者', dataIndex: 'marker_name', align: 'center' },
      {
        title: '点赞时间',
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
              return <span><Badge status="processing" />点赞</span>
          } if (text === 0) {
            return <span><Badge status="default" />取消点赞</span>
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
export default Mark;

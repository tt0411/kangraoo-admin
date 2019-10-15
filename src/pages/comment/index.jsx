// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Badge, Avatar } from 'antd';
import EllipsisTooltip from '@/components/EllipsisTooltip';
import moment from 'moment';
import CheckBox from '@/components/CheckBox';

const namespace = 'comment';
@connect(({ comment, loading }) => ({
  comment,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Comment extends Component {
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

  onAble = record => {
    // eslint-disable-next-line no-unused-expressions
    record.status === 0 ? record.status = 1 : record.status = 0;
    const payload = {
      id: record.id,
      status: record.status,
    }
    this.props.dispatch({
      type: `${namespace}/isStopcomment`,
      payload,
    })
  }

  render() {
    const {
      dataList,
      totalNum,
      searchCond,
      commentUserList,
    } = this.props[namespace];
    const { dataLoading } = this.props;
    // checkBox
    const searchList = [
      {
        name: '',
        key: 'content',
        type: 'INPUT',
        placeholder: '评论内容关键字',
        width: '150px',
      },
      {
        name: '',
        key: 'status',
        type: 'SELECT',
        placeholder: '状态',
        width: '150px',
        options: [
          { id: '1', name: '正常' },
          { id: '0', name: '被封禁' },
        ],
      },
      {
        name: '',
        key: 'from_uid',
        type: 'SELECT',
        placeholder: '评论者',
        width: '150px',
        options: commentUserList,
      },
    ];
    // Table
    const columns = [
        { title: '内容',
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
      { title: '评论内容',
        dataIndex: 'content',
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
        title: '评论者头像',
        dataIndex: 'comment_imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '评论者', dataIndex: 'comment_name', align: 'center' },
      {
        title: '评论时间',
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
              return <span><Badge status="processing" />正常</span>
          } if (text === 0) {
            return <span><Badge status="default" />评论违规被封禁</span>
          }
      } },
      {
        title: '操作',
        dataIndex: 'x',
        // eslint-disable-next-line consistent-return
        render: (text, record) => {
          // eslint-disable-next-line no-unused-expressions
          if (record.status === 0) {
            return <Button type="primary" ghost onClick ={() => { this.onAble(record) }}>恢复</Button>
          } if (record.status === 1) {
            return <Button type="primary" ghost onClick ={() => { this.onAble(record) }}>封禁</Button>
          }
        },
      },
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
export default Comment;

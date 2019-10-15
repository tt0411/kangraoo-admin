// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Avatar, Badge } from 'antd';
import moment from 'moment';
import CheckBox from '@/components/CheckBox';

const namespace = 'users';
@connect(({ users, loading }) => ({
  users,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Users extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/fetchList`,
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
    record.flag === 0 ? record.flag = 1 : record.flag = 0;
    const payload = {
      id: record.id,
      flag: record.flag,
    }
    this.props.dispatch({
      type: `${namespace}/changeUserFlag`,
      payload,
    })
  }

  render() {
    const {
      dataList,
      totalNum,
      searchCond,
    } = this.props[namespace];
    const { dataLoading } = this.props;
    // checkBox
    const searchList = [
      {
        name: '',
        key: 'nickName',
        type: 'INPUT',
        placeholder: '姓名',
        width: '120px',
      },
      {
        name: '',
        key: 'phone',
        type: 'INPUT',
        placeholder: '手机号',
        width: '180px',
      },
      {
        name: '',
        key: 'status',
        type: 'SELECT',
        placeholder: '在线状态',
        width: '120px',
        options: [
          { id: '1', name: '在线' },
          { id: '0', name: '离线' },
        ],
      },
      {
        name: '',
        key: 'flag',
        type: 'SELECT',
        placeholder: '禁用状态',
        width: '120px',
        options: [
          { id: '0', name: '禁用' },
          { id: '1', name: '启用' },
        ],
      },
      {
        name: '',
        key: 'gender',
        type: 'SELECT',
        placeholder: '性别',
        width: '120px',
        options: [
          { id: '1', name: '男' },
          { id: '2', name: '女' },
        ],
      },
    ];
    // Table
    const columns = [
      { title: '姓名', dataIndex: 'nickName', align: 'center' },
      {
        title: '头像',
        dataIndex: 'imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '手机号', dataIndex: 'phone', align: 'center' },
      {
        title: '性别',
        dataIndex: 'gender',
        align: 'center',
        render: text => <span>{text === 1 ? '男' : '女'}</span>,
      },
      { title: '年龄', dataIndex: 'age', align: 'center' },
      {
        title: '注册时间',
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
              return <span><Badge status="processing" />在线</span>
          } if (text === 0) {
              return <span><Badge status="default" />离线</span>
          }
      } },
      {
        title: '是否禁用',
        dataIndex: 'flag',
        // eslint-disable-next-line consistent-return
        render: text => {
          if (text === 1) {
              return <span><Badge status="processing" />启用</span>
          } if (text === 0) {
              return <span><Badge status="default" />禁用</span>
          }
      },
      },
      {
        title: '操作',
        dataIndex: 'x',
        render: (text, record) =>
          // eslint-disable-next-line no-unused-expressions
          <Button type="primary" ghost onClick ={() => { this.onAble(record) }}>{ record.flag === 0 ? '启用' : '禁用'}</Button>,
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
export default Users;

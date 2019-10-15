// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Badge, Avatar } from 'antd';
import moment from 'moment';
import CheckBox from '@/components/CheckBox';

const namespace = 'contentype';
@connect(({ contentype, loading }) => ({
  contentype,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Contentype extends Component {
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
    record.status === 2 ? record.status = 1 : record.status = 2;
    const payload = {
      id: record.id,
      status: record.status,
    }
    this.props.dispatch({
      type: `${namespace}/changeContenTypeStatus`,
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
        key: 'status',
        type: 'SELECT',
        placeholder: '状态',
        width: '150px',
        options: [
          { id: '0', name: '用户已删除' },
          { id: '1', name: '正常' },
          { id: '2', name: '被封禁' },
        ],
      },
    ];
    // Table
    const columns = [
      { title: '主题名称', dataIndex: 'name', align: 'center' },
      {
        title: '用户头像',
        dataIndex: 'imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '用户', dataIndex: 'nickName', align: 'center' },
      {
        title: '背景颜色',
        dataIndex: 'bgcolor',
        align: 'center',
        render: text => <span style={{ backgroundColor: text, padding: '10px', color: '#fff' }}>{text}</span>,
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        align: 'center',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
      }, {
        title: '上次修改时间',
        dataIndex: 'update_time',
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
              return <span><Badge status="error" />用户已删除</span>
          } if (text === 2) {
            return <span><Badge status="default" />主题违规被封禁</span>
          }
      } },
      {
        title: '操作',
        dataIndex: 'x',
        // eslint-disable-next-line consistent-return
        render: (text, record) => {
          // eslint-disable-next-line no-unused-expressions
          if (record.status === 2) {
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
export default Contentype;

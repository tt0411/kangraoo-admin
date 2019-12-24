// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Badge, Avatar, Tag } from 'antd';
import moment from 'moment';
import CheckBox from '@/components/CheckBox';
import Detail from './detail'

const namespace = 'contentype';
@connect(({ contentype, loading }) => ({
  contentype,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Contentype extends Component {
    state = {
       detailData: null,
       isShowBox: false
    }

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

  // onAble = record => {
  //   // eslint-disable-next-line no-unused-expressions
  //   record.status === 2 ? record.status = 1 : record.status = 2;
  //   const payload = {
  //     id: record.id,
  //     status: record.status,
  //   }
  //   this.props.dispatch({
  //     type: `${namespace}/changeContenTypeStatus`,
  //     payload,
  //   })
  // }

  toCheck = record => {
    this.setState({ isShowBox: true})
    this.setState({detailData: record}) 
  }

  onCancel = () => {
   this.setState({
        isShowBox: false
   })
  }

  render() {
    const { dataList, totalNum, searchCond, isShow } = this.props[namespace]
    const { detailData, isShowBox } = this.state
    const { dataLoading } = this.props
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
        placeholder: '公开状态',
        width: '120px',
        options: [
          { id: '0', name: '不公开' },
          { id: '1', name: '公开' },
          { id: '2', name: '用户删除' },
        ],
      },
      {
        name: '',
        key: 'flag',
        type: 'SELECT',
        placeholder: '审核状态',
        width: '120px',
        options: [
          { id: '0', name: '待审核' },
          { id: '1', name: '审核通过' },
          { id: '2', name: '审核不通过' },
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
        dataIndex: 'x1',
        align: 'center',
        render: (text, record) => {
          if (record.flag === 0 && record.status === 1) {
            return <span><Tag color="#87d068">待审核</Tag></span>
        } if (record.status === 2) {
            return <span><Tag color="#cfcfcf">用户已删除</Tag></span>
        } if (record.flag === 3 && record.status === 0) {
          return <span><Tag color="#666666">不公开</Tag></span>
        } if (record.flag === 1 && record.status === 1) {
          return <span><Tag color="#2db7f5">审核通过</Tag></span>
         }if (record.flag === 2 && record.status === 1) {
          return <span><Tag color="#f50">审核不通过</Tag></span>
         }
        }
      },
      {
        title: '操作',
        dataIndex: 'x',
        render: (text, record) => {
          if(record.status === 1 && record.flag === 0) {
            return <Button type="primary" ghost onClick={() => { this.toCheck(record) }}> 去审核 </Button>
          }
          if((record.status === 1 && record.flag === 1) || (record.status === 1 && record.flag === 2) ) {
            return <span>已审核</span>
          }
          if(record.status === 0) {
            return <span>无需审核</span>
          }
        }
      }
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
        {(isShow && isShowBox) && <Detail detailData={detailData} onCancel={this.onCancel}/>}
      </div>
    );
  }
}
export default Contentype;

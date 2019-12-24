// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Avatar, Badge, Tag, Divider } from 'antd';
import moment from 'moment';
import EllipsisTooltip from '@/components/EllipsisTooltip';
import CheckBox from '@/components/CheckBox';
import Detail from './detail';

const namespace = 'content';
@connect(({ content, loading }) => ({
  content,
  dataLoading: loading.effects[`${namespace}/fetchList`],
}))
class Content extends Component {
  state = {
    showDetail: false,
    detailData: null,
    commentsList: null,
    commentsCount: 0,
    savesCount: 0,
    savesList: null,
    marksCount: 0,
    marksList: null,
  };

  componentDidMount() {
    const { searchCond } = this.props[namespace];
    this.props.dispatch({
      type: `${namespace}/changeSearchCond`,
      payload: searchCond,
    });
    this.props.dispatch({
      type: `${namespace}/fetchList`,
    });
  }

  searchSumbit = data => {
    const { searchCond } = this.props[namespace];
    Object.entries(data).forEach(([k, v]) => {
      searchCond[k] = v;
    });
    searchCond.page = 1;
    this.props.dispatch({
      type: `${namespace}/changeSearchCond`,
      payload: searchCond,
    });
    this.props.dispatch({
      type: `${namespace}/fetchList`,
    });
  };

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

  onDetail = record => {
     const payload = {
       id: record.id,
     }
    this.props.dispatch({
      type: `${namespace}/changeCid`,
      payload,
    });
    this.props.dispatch({
      type: `${namespace}/fetchSaveList`,
    }).then(() => {
      const { saveCount, saveList } = this.props[namespace];
      this.setState({
        savesCount: saveCount,
        savesList: saveList,
      })
    })
    this.props.dispatch({
      type: `${namespace}/fetchMarkList`,
    }).then(() => {
      const { markCount, markList } = this.props[namespace];
      this.setState({
        marksCount: markCount,
        marksList: markList,
      })
    })
    this.props.dispatch({
      type: `${namespace}/fetchCommentList`,
    }).then(() => {
        const { commentList, commentCount } = this.props[namespace];
        this.setState({
          showDetail: true,
          detailData: record,
          commentsList: commentList,
          commentsCount: commentCount,
        });
      });
  };

  onCancelDetail = () => {
    this.setState({
      showDetail: false,
      detailData: null,
      commentsList: null,
      commentsCount: 0,
    });
  };

  render() {
    const { dataList, totalNum, searchCond, isShow } = this.props[namespace]
    const { dataLoading } = this.props;
    const { showDetail, detailData, commentsList, commentsCount, savesCount, marksCount, savesList, marksList } = this.state;
    const searchList = [
      {
        name: '',
        key: 'nickName',
        type: 'INPUT',
        placeholder: '创建者姓名',
        width: '120px',
      },
      {
        name: '',
        key: 'context',
        type: 'INPUT',
        placeholder: '内容关键字',
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
      { title: '用户', dataIndex: 'nickName', align: 'center' },
      {
        title: '用户头像',
        dataIndex: 'imgUrl',
        align: 'center',
        render: text => <Avatar src={text}/>,
      },
      { title: '所属主题', dataIndex: 'name', align: 'center' },
      { title: '内容',
        dataIndex: 'context',
        align: 'center',
        width: 400,
        onCell: () => ({
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 400,
            },
          }),
        render: text => (
          <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
        ),
      },
      {
        title: '发表时间',
        dataIndex: 'create_time',
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
         return  <Button type="primary" ghost onClick={() => { this.onDetail(record) }}> 查看 </Button>
        }
      }
    ]
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
        {(showDetail && isShow)  && <Detail onCancel={this.onCancelDetail} detailData={detailData}
        commentList={commentsList} commentCount={commentsCount} saveCount={savesCount}
         markCount={marksCount} markList={marksList} saveList={savesList} />}
      </div>
    );
  }
}
export default Content;

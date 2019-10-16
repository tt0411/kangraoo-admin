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
    marksCount: 0,
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
      const { saveCount } = this.props[namespace];
      this.setState({
        savesCount: saveCount,
      })
    })
    this.props.dispatch({
      type: `${namespace}/fetchMarkList`,
    }).then(() => {
      const { markCount } = this.props[namespace];
      this.setState({
        marksCount: markCount,
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

  onAble = record => {
    // eslint-disable-next-line no-unused-expressions
    record.flag === 1 ? record.flag = 2 : record.flag = 1;
    const payload = {
      id: record.id,
      flag: record.flag,
    }
    this.props.dispatch({
      type: `${namespace}/isStopContent`,
      payload,
    })
  }

  render() {
    const { dataList, totalNum, searchCond } = this.props[
      namespace
    ];
    const { dataLoading } = this.props;
    const { showDetail, detailData, commentsList, commentsCount, savesCount, marksCount } = this.state;
    // checkBox
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
        key: 'mood',
        type: 'SELECT',
        placeholder: '心情',
        width: '120px',
        options: [
          { id: '0', name: '难过' },
          { id: '1', name: '一般' },
          { id: '2', name: '开心' },
        ],
      },
      {
        name: '',
        key: 'flag',
        type: 'SELECT',
        placeholder: '状态',
        width: '120px',
        options: [
          { id: '1', name: '正常' },
          { id: '0', name: '用户已删除' },
          { id: '2', name: '被封禁' },
        ],
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
        title: '发表心情',
        dataIndex: 'mood',
        align: 'center',
        // eslint-disable-next-line consistent-return
        render: text => {
          if (text === 0) {
            return <Avatar src="http://pyku15h15.bkt.clouddn.com/sad.png"/>
          // eslint-disable-next-line no-empty
          } if (text === 1) {
            return <Avatar src="http://pyku15h15.bkt.clouddn.com/normal.png"/>
          // eslint-disable-next-line no-empty
          } if (text === 2) {
            return <Avatar src="http://pyku15h15.bkt.clouddn.com/happy.png"/>
          }
        },
      },
      {
        title: '发表时间',
        dataIndex: 'create_time',
        align: 'center',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '状态',
        dataIndex: 'flag',
        align: 'center',
        // eslint-disable-next-line consistent-return
        render: text => {
          if (text === 1) {
            return <span><Badge status="processing" />正常</span>
        } if (text === 0) {
            return <span><Badge status="error" />用户已删除</span>
        } if (text === 2) {
          return <span><Badge status="default" />内容违规被封禁</span>
        }
        },
      },
      {
        title: '公开状态',
        dataIndex: 'status',
        align: 'center',
        render: text => (
          <span>{text === 1 ? <Tag color="magenta">公开</Tag> : <Tag color="#cfcfcf">不公开</Tag>}</span>
        ),
      },
      {
        title: '操作',
        dataIndex: 'x',
        // eslint-disable-next-line consistent-return
        render: (text, record) => {
         // eslint-disable-next-line no-unused-expressions
          if (record.flag === 1) {
            return <span>
            <Button
              type="primary"
              ghost
              onClick={() => {
                this.onDetail(record);
              }}
            >
              查看
           </Button>
           <Divider type="vertical" />
          <Button type="primary" ghost onClick ={() => { this.onAble(record) }}>封禁</Button></span>
          } if (record.flag === 2) {
            return <span>
            <Button
              type="primary"
              ghost
              onClick={() => {
                this.onDetail(record);
              }}
            >
              查看
           </Button>
           <Divider type="vertical" />
          <Button type="primary" ghost onClick ={() => { this.onAble(record) }}>恢复</Button></span>
          } if (record.flag === 0) {
            return <span>
            <Button
              type="primary"
              ghost
              onClick={() => {
                this.onDetail(record);
              }}
            >
              查看
           </Button>
          </span>
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
        {showDetail && <Detail onCancel={this.onCancelDetail} detailData={detailData} commentList={commentsList} commentCount={commentsCount} saveCount={savesCount} markCount={marksCount} />}
      </div>
    );
  }
}
export default Content;

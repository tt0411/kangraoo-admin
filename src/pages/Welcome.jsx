import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Statistic, Icon, Empty, Spin, Tooltip } from 'antd';
import Styles from './welcome.less';
import BarChart from './components/BarChart';
import ActiveList from './components/ActiveList';
import GenderChart from './components/GenderChart';
import LiveChart from './components/LiveChart';

const namespace = 'global';
@connect(({ global, loading }) => ({
  global,
  dataLoading: loading.effects[`${namespace}/fetchWelcome`],
  chartLoading: loading.effects[`${namespace}/fetchChart`],
}))
class Welcome extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/fetchWelcome`,
    });
    this.props.dispatch({
      type: `${namespace}/fetchChart`,
    });
  }

  render() {
    const {
      totalUser,
      totalContent,
      sevenDaysData,
      todayActiveUser,
      genderRate,
      liveRate,
      liveCount,
      todayContentCount,
      todayContentRate,
      totalContentType,
      todayContentTypeRate,
      todayContentTypeCount,
    } = this.props[namespace];
    const { dataLoading, chartLoading } = this.props;
    const tips = (
      <div>
        <div>用户登录 +5活跃度 </div>
        <div>创建主题 +10活跃度</div>
        <div>发表内容 +10活跃度</div>
    </div>
    )
    return (
      <div className={Styles.welcomeBox}>
        <Spin spinning={dataLoading}>
          <Row gutter={16}>
            <Col xl={6} sm={12} span={24}>
              <div className={Styles.welcomeItem}>
              <div className={Styles.totalUser}>
                <Statistic
                  title="在线人数"
                  value={liveCount}
                  valueStyle={{ color: '#000000', marginTop: '20px', fontSize: '28px' }}
                  suffix="人"
                  prefix={<Icon style={{ marginRight: '10px' }} type="user" />}
                />
              </div>
              <div className={Styles.genderChart}>
                   <LiveChart data={liveRate}/>
                </div>
              </div>
            </Col>
            <Col xl={6} sm={12} span={24}>
              <div className={Styles.welcomeItem}>
                <div className={Styles.totalUser}>
                <Statistic
                  title="总用户"
                  value={totalUser}
                  valueStyle={{ color: '#000000', marginTop: '20px', fontSize: '28px' }}
                  suffix="人"
                  prefix={<Icon style={{ marginRight: '10px' }} type="team" />}
                />
                </div>
                <div className={Styles.genderChart}>
                   <GenderChart data={genderRate}/>
                </div>
              </div>
            </Col>
            <Col xl={6} sm={12} span={24}>
              <div className={Styles.welcomeItem}>
              <div className={Styles.totalUser}>
                <Statistic
                  title="总主题量"
                  value={totalContentType}
                  valueStyle={{ color: '#000000', marginTop: '20px', fontSize: '28px' }}
                  suffix="个"
                  prefix={<Icon style={{ marginRight: '10px' }} type="profile" />}
                />
              </div>
              <div className={Styles.totalRight}>
                      <Statistic
                        title="今日增长率"
                        value={todayContentTypeRate}
                        precision={2}
                        valueStyle={{ color: '#3f8600', marginRight: '30px' }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                      />
                       <Statistic
                        title="今日增长量"
                        value={todayContentTypeCount}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="plus" style={{ fontSize: 16 }}/>}
                        suffix="个"
                      />
                </div>
              </div>
            </Col>
            <Col xl={6} sm={12} span={24}>
              <div className={Styles.welcomeItem}>
              <div className={Styles.total}>
                <Statistic
                  title="总内容量"
                  value={totalContent}
                  valueStyle={{ color: '#000000', marginTop: '20px', fontSize: '28px' }}
                  suffix="条"
                  prefix={<Icon style={{ marginRight: '10px' }} type="profile" />}
                />
              </div>
              <div className={Styles.totalRight}>
                      <Statistic
                        title="今日增长率"
                        value={todayContentRate}
                        precision={2}
                        valueStyle={{ color: '#3f8600', marginRight: '30px' }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                      />
                       <Statistic
                        title="今日增长量"
                        value={todayContentCount}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="plus" style={{ fontSize: 16 }} />}
                        suffix="条"
                      />
                </div>
              </div>
            </Col>
          </Row>
        </Spin>
        <Spin spinning={chartLoading}>
            <Row gutter={16}>
              <Col xxl={18} span={24}>
                <div className={Styles.welcomeLineChart}>
                  <div className={Styles.title}>近七天新增用户统计图</div>
                  {sevenDaysData && sevenDaysData.length > 0 ? (
                    <BarChart data={sevenDaysData} height={600} width={800}/>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </Col>
              <Col xxl={6} span={24}>
                <div className={Styles.welcomeBarChart}>
                  <div className={Styles.rightContent}>
                  <div className={Styles.title}>今日用户活跃排名</div>
                  <div className={Styles.tips}>
                  <Tooltip title={tips}>
                       <Icon type="info-circle" />
                  </Tooltip>
                  </div>
                  </div>
                  {todayActiveUser && todayActiveUser.length > 0 ? (
                    <ActiveList data={todayActiveUser} />
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </Col>
            </Row>
        </Spin>
      </div>
    );
  }
}
export default Welcome;

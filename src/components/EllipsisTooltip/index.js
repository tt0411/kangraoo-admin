import React, { Component } from 'react';
import { Tooltip } from 'antd';

export default class EllipsisTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.node = React.createRef();
  }

  handleVisibleChange = visible => {
    if (this.node.current.clientWidth < this.node.current.scrollWidth) {
      this.setState({
        visible,
      });
    }
  };

  render() {
    return (
      <Tooltip
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        title={this.props.title}
      >
        <div
          ref={this.node}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {this.props.children ? this.props.children : '-'}
        </div>
      </Tooltip>
    );
  }
}

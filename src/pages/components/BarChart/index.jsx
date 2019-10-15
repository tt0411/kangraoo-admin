import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default function BarChart(props) {
  const { data, height, width } = props;
  const cols = {
    count: {
      tickInterval: 1,
      alias: '增长人数',
    },
    date: {
      alias: '日期',
    },
  }
  const tickLine = {
    lineWidth: 1, // 刻度线宽
    stroke: '#1890FF', // 刻度线的颜色
    length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
  }
  return (
    <Chart height={height} data={data} width={width} scale={cols} forceFit>
    <Axis name="date" tickLine={tickLine}/>
    <Axis name="count" tickLine={tickLine}/>
    <Tooltip />
    <Geom type="interval" position="date*count"></Geom>
  </Chart>
  );
}

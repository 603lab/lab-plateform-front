import React from 'react';
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

export default class CenterPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { DataView } = DataSet;
    const { skills = [] } = this.props;
    const dv = new DataView();
    dv.source(skills).transform({
      as: 'percent',
      type: 'percent',
      field: 'percent',
      dimension: 'item',
    });
    const cols = {
      percent: {
        formatter: val => `${val * 100}%`,
      },
    };
    return (
      <div>
        <Chart forceFit height={240} data={dv} scale={cols}>
          <Coord type="theta" scale={[1.3, 1.3]} />
          <Axis name="percent" />
          <Legend position="left" offsetY={-10} offsetX={-20} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              `item*percent`,
              (item, percent) => ({
                name: item,
                value: `${percent * 100}%`,
              }),
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                `${item.point.item}: ${val}`;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

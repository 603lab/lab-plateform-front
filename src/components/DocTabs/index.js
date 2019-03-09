import React, { PureComponent } from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
export default class DocTabsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const tempPanes = [...panes];
    const activeKey = `newTab${(this.newTabIndex += 1)}`;
    tempPanes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes: tempPanes, activeKey });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let lastIndex;
    let tempActiveKey = [...activeKey];
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tempPanes = panes.filter(pane => pane.key !== targetKey);
    if (panes.length && tempActiveKey === targetKey) {
      if (lastIndex >= 0) {
        tempActiveKey = panes[lastIndex].key;
      } else {
        tempActiveKey = panes[0].key;
      }
    }
    this.setState({ panes: tempPanes, activeKey: tempActiveKey });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

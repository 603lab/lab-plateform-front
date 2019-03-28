import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import styles from './index.less';

const GlobalFooter = ({ className, popUp, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {popUp && (
        <div className={styles.links}>
          {popUp.map(popItem => (
            <Tooltip key={popItem.key} title={popItem.content}>
              {popItem.title}
            </Tooltip>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export default GlobalFooter;

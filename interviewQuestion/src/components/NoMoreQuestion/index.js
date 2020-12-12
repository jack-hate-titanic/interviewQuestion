import React from 'react';
import styles from './index.less';
import sorry from '../../assets/sorry.jpg';
import { Button } from 'antd';

const NoMoreQuestion = props => {
  return (
    <div className="center">
      <img src={sorry} alt="sorry" />
      <p className={styles.noQuestion}>暂无更多题目，请添加试题</p>
      <Button onClick={props.toNumOne} type="primary">
        返回第一题
      </Button>
    </div>
  );
};

export default NoMoreQuestion;

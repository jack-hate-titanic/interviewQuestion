import React, { PureComponent } from 'react';
import styles from './index.less';
import sorry from '../../assets/sorry.jpg';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export default class Index extends PureComponent {

  static propTypes = {
    toNumOne: PropTypes.func,
  };

  render() {
    const { toNumOne } = this.props;
    return (
      <div className='center'>
        <img src={sorry}/>
        <p className={styles.noQuestion}>暂无更多题目，请添加试题</p>
        <Button onClick={toNumOne} type='primary'>返回第一题</Button>
      </div>
    );
  }
}

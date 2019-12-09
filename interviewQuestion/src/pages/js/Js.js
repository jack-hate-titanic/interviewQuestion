import React, { PureComponent } from 'react';
import { Button, Card, PageHeader } from 'antd';

export default class Js extends PureComponent {
  render() {
    return (
      <div>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            background: 'white',
          }}
          title="js面试题"
          extra={
            <Button type='primary'>添加试题</Button>
          }
        />
        <Card style={{ margin: 24 }}>
          <p>
            <span>1.</span>
            请解释什么是原型链？
          </p>
          <p>
            解析：
          </p>
          <Button type='primary' style={{ float: 'right' }}>下一题</Button>
        </Card>
      </div>
    );
  }
}

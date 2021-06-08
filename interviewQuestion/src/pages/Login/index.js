import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Login } from '@/services/api';
import { toHomePage } from '@/utils/routers';
import styles from './index.less';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password, remember } = values;
        const params = {
          username,
          password,
        };
        Login(params).then(result => {
          localStorage.setItem('jwt_token', result);
          toHomePage();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          欢迎来到<span className={styles.name}>记忆魔法书</span>
        </div>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;

import './index.less';
import { Layout } from 'antd';
import { PureComponent } from 'react';
import { getUser } from '@/utils/utils';
import { toLoginPage } from '@/utils/routers';

const { Content, Footer } = Layout;

class BasicLayout extends PureComponent {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['js']} mode="inline">
            <Menu.Item key="js">
              <Link to="/">
                <IconFont type="iconjs" />
                <span>js</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="react">
              <Link to="/react">
                <IconFont type="iconreact" />
                <span>react</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Layout className="components-layout-demo-custom-trigger">
          <Content>{this.props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              style={{ color: '#bbb', fontSize: 12 }}
            >
              京ICP备 2020044007号-1
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;

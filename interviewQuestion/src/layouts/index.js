import './index.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { PureComponent } from 'react';
import Link from 'umi/link';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends PureComponent {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo"/>
          <Menu theme="dark" defaultSelectedKeys={['js']} mode="inline">
            <Menu.Item key="js">
              <Link to='/'>
                <Icon type="pie-chart"/>
                <span>js</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="react">
              <Link to='/react'>
                <Icon type="desktop"/>
                <span>react</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='components-layout-demo-custom-trigger'>

          <Content>
              {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;

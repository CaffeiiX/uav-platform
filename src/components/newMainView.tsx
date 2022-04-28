import { Layout, Menu} from "antd";
import { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileFilled
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./newMainView.css";
import NewMapViewer from "./map/newMapViewer";
import SiderContent from "./siderContent";
import { useRecoilState} from "recoil";
import { isSiderShow } from "../store/view";
import PureTask from "./pureTask/pureTask";
const { SubMenu } = Menu;
const {Content, Sider } = Layout;

const NewMainView: React.FC<{}> = () => {
  const [collapsed, setCollapse] = useState<boolean>(false);
  // const [visible, setVisible] = useState<boolean>(false);
  const [visible, setVisible] = useRecoilState(isSiderShow);

  const onCollapse = () => {
    setCollapse(!collapsed);
  };
  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={150}>
          <div className="logo" >
            {/* <div style={{color: "white"}} >无人机平台</div> */}
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<ProfileFilled />} onClick={showDrawer}>
              任务信息
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined/>}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <SiderContent>
          <PureTask></PureTask>
        </SiderContent>
        <Layout className="site-layout">
          <Content style={{ margin: '0' }}>
            <NewMapViewer></NewMapViewer>
          </Content>
        </Layout>
      </Layout>
  );
};

export default NewMainView;

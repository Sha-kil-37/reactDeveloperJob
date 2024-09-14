import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useOutlet } from "react-router-dom";
import ProductsTable from "../components/ProductsTable";
const { Header, Sider, Content } = Layout;

//
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isOutlate = useOutlet();
  //

  //
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Home",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0 20px",
            padding: "0 15px 0 0",
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isOutlate ? <Outlet /> : <ProductsTable />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

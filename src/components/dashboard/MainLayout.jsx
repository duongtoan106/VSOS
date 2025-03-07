import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import AllAccount from "./AllAccount";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedKey") || "1"
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("role") || ""); // ✅ Sử dụng state

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Cập nhật userType khi component mount
  useEffect(() => {
    const role = localStorage.getItem("role") || "";
    setUserType(role);
    console.log("User Role cập nhật:", role);

    // Nếu role không hợp lệ, có thể redirect về login
    if (
      !["ADMIN", "MANAGER", "STAFF", "CUSTOMER"].includes(role.toUpperCase())
    ) {
      console.warn("Role không hợp lệ:", role);
    }
  }, []);

  const menuItems = [
    { key: "1", label: "All Account", roles: ["ADMIN"] },
    { key: "2", label: "All Account", roles: ["ADMIN"] },
  ];

  // Kiểm tra xem user có quyền hiển thị menu không
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userType.toUpperCase())
  );

  useEffect(() => {
    if (!localStorage.getItem("selectedKey")) {
      if (userType === "ADMIN") setSelectedKey("1");
      else if (userType === "MANAGER") setSelectedKey("2");
    }

    setMenuVisible(
      ["ADMIN", "MANAGER", "STAFF", "CUSTOMER"].includes(userType.toUpperCase())
    );
  }, [userType]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    localStorage.setItem("selectedKey", e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <AllAccount />;
      default:
        return <AllAccount />;
    }
  };

  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "white" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        {menuVisible && (
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={filteredMenuItems}
          />
        )}
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              padding: "20px",
              height: 64,
            }}
          >
            Nav
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

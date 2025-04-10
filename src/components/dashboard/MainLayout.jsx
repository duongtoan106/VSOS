import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import AllAccount from "./AllAccount";
import ProductList from "./ProductList";
import PendingList from "./PendingList";
import SalePromotionList from "./SalePromotionList";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("2");
  const [menuVisible, setMenuVisible] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("role") || "");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const role = localStorage.getItem("role") || "";
    setUserType(role);
    console.log("User Role cập nhật:", role);

    if (
      !["ADMIN", "MANAGER", "STAFF", "CUSTOMER"].includes(role.toUpperCase())
    ) {
      console.warn("Role không hợp lệ:", role);
    }
  }, []);

  useEffect(() => {
    if (userType === "STAFF") {
      setSelectedKey("2");
    } else if (userType === "ADMIN") {
      setSelectedKey("1");
    } else if (userType === "MANAGER") {
      setSelectedKey("2");
    }

    setMenuVisible(
      ["ADMIN", "MANAGER", "STAFF", "CUSTOMER"].includes(userType.toUpperCase())
    );
  }, [userType]);

  const menuItems = [
    { key: "1", label: "DS tài khoản", roles: ["ADMIN"] },
    { key: "2", label: "DS sản phẩm", roles: ["ADMIN", "MANAGER", "STAFF"] },
    { key: "3", label: "DS sản phẩm đợi duyệt", roles: ["ADMIN", "MANAGER"] },
    { key: "4", label: "DS khuyến mãi", roles: ["ADMIN", "MANAGER", "STAFF"] },
    // { key: "5", label: "Pending Sale Promotion", roles: ["ADMIN", "MANAGER"] },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userType.toUpperCase())
  );

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    localStorage.setItem("selectedKey", e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <AllAccount />;
      case "2":
        return <ProductList />;
      case "3":
        return <PendingList />;
      case "4":
        return <SalePromotionList />;
      default:
        return <ProductList />;
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
            style={{ textAlign: "left", paddingLeft: "2px" }}
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

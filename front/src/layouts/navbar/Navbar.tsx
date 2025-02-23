import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Badge } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; 
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { getCartById } from "../../api/cart/api"; 
import { CartItem } from "../../utils/types/api.types";

const { Header } = Layout;
const { Title } = Typography;
type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  hiddenOnAuthPages?: boolean;
};

const menuItems: MenuItem[] = [
  { key: "1", label: "Home", icon: <HomeOutlined />, path: "/" },
  {
    key: "2",
    label: "Favoris",
    icon: <HeartOutlined />,
    path: "/favoris",
    hiddenOnAuthPages: true,
  },
  {
    key: "3",
    label: "Profile",
    icon: <UserOutlined />,
    path: "/profile",
    hiddenOnAuthPages: true,
  },
  {
    key: "4",
    label: "Mon panier",
    icon: <ShoppingCartOutlined />,
    path: "/cart",
    hiddenOnAuthPages: true,
  },
  { key: "5", label: "Contact", icon: <MailOutlined />, path: "/contact" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ["/signin", "/signup"].includes(location.pathname);
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const userCartId =
          storedUser && JSON.parse(storedUser).cart?.id
            ? JSON.parse(storedUser).cart.id
            : null;

        if (userCartId) {
          const response = await getCartById({ id: userCartId });
          if (response.status === 200 && response.data) {
            const totalItems = response.data.items.reduce(
              (sum, item: CartItem) => sum + item.quantity,
              0
            );
            setCartItemCount(totalItems);
          }
        }
      } catch (error) {
        console.error("Error fetching cart item count:", error);
      }
    };

    fetchCartItemCount();
  }, [location.pathname]);
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/src/assets/pictures/alten-logo.png"
          alt="Logo"
          style={{ height: "40px" }}
        />
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          AltenEcom
        </Title>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{
          flex: 1,
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "0 16px",
          justifyContent: "flex-end",
        }}
        items={menuItems
          .filter((item) => !item.hiddenOnAuthPages || !isAuthPage)
          .map((item) => {
            if (item.key === "4") {
              return {
                key: item.key,
                label: (
                  <Link to={item.path}>
                    <span style={{ padding: "0 8px" }}>{item.label}</span>
                  </Link>
                ),
                icon: (
                  <Badge
                    count={cartItemCount}
                    style={{ minWidth: "15px", maxHeight: "15px" }}
                    offset={[10, 0]}
                    showZero
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                ),
              };
            }

            return {
              key: item.key,
              label: (
                <Link to={item.path}>
                  <span style={{ padding: "0 8px" }}>{item.label}</span>
                </Link>
              ),
              icon: item.icon,
            };
          })}
      />
    </Header>
  );
};

export default Navbar;

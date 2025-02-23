import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Tag,
  Typography,
  InputNumber,
  Spin,
  message,
  Card,
  Row,
  Col,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getCartById,
  updateProductItem,
  removeProductItem,
} from "../../api/cart/api";
import { CartItem } from "../../utils/types/api.types";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const storedUser = localStorage.getItem("user");
  const userCartId =
    storedUser && JSON.parse(storedUser).cart?.id
      ? JSON.parse(storedUser).cart.id
      : null;

  useEffect(() => {
    if (!userCartId) {
      messageApi.error("Veuillez vous connecter pour accéder à votre panier.");
      window.location.href = "/signin";
    }
  }, [userCartId, messageApi]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userCartId) return;

        setLoading(true);
        const response = await getCartById({ id: userCartId });

        if (response.status === 200 && response.data) {
          setCartItems(response.data.items || []);
        } else {
          setError("Échec du chargement du panier.");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du panier:", err);
        setError("Une erreur est survenue lors du chargement de votre panier.");
      } finally {
        setLoading(false);
      }
    };

    if (userCartId) {
      fetchCart();
    }
  }, [userCartId]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = async (
    itemId: number,
    newQuantity: number,
    quantity: number
  ) => {
    if (newQuantity <= 0) return;
    if (newQuantity === quantity) {
      messageApi.error("Cette quantité n'est pas disponible en stock.");
      return;
    }
    try {
      if (!userCartId) return;
      const response = await updateProductItem(
        { cartId: userCartId, productId: itemId },
        newQuantity
      );

      if (response.status === 200 && response.data) {
        const updatedCartItems = cartItems.map((item) =>
          item.product.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        messageApi.success("Quantité mise à jour avec succès !");
      } else {
        messageApi.error("Échec de la mise à jour de la quantité.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité:", error);
      messageApi.error(
        "Une erreur est survenue lors de la mise à jour de la quantité."
      );
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      if (!userCartId) return;
      const response = await removeProductItem({
        cartId: userCartId,
        productId: itemId,
      });

      if (response.status === 200 && response.data) {
        const updatedCartItems = cartItems.filter(
          (item) => item.product.id !== itemId
        );
        setCartItems(updatedCartItems);
        messageApi.success("Produit retiré du panier avec succès !");
      } else {
        messageApi.error("Échec du retrait du produit du panier.");
      }
    } catch (error) {
      console.error("Erreur lors du retrait du produit du panier:", error);
      messageApi.error("Une erreur est survenue lors du retrait du produit.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Chargement du panier..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "red",
        }}
      >
        <Typography.Text>{error}</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <h1>Mon panier</h1>
      {cartItems.length === 0 ? (
        <Tag color="warning">Votre panier est vide.</Tag>
      ) : (
        <Row gutter={16}>
          {cartItems.map((item) => (
            <Col key={item.id} span={8}>
              <Card
                title={item.product.name}
                style={{ width: "100%", marginBottom: 16 }}
                extra={
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    Supprimer
                  </Button>
                }
              >
                <Typography.Text strong>
                  Prix: {item.product.price.toFixed(2)} MAD
                </Typography.Text>
                <br />
                <Typography.Text strong>
                  Quantité:
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>{
                      handleQuantityChange(
                        item.product.id,
                        value || item.quantity,
                        item.quantity
                      )}
                    }
                    style={{ marginLeft: 8, width: "80px" }}
                  />
                </Typography.Text>
                <br />
                <Typography.Text strong>
                  Total: {(item.product.price * item.quantity).toFixed(2)} MAD
                </Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {cartItems.length > 0 && (
        <Space direction="vertical" style={{ marginTop: 20 }}>
          <Typography.Title level={3}>
            Total Prix: <strong>{totalAmount.toFixed(2)} MAD</strong>
          </Typography.Title>
          <Button type="primary" size="large" block>
            Payer Maintenant
          </Button>
        </Space>
      )}
    </div>
  );
};

export default CartPage;

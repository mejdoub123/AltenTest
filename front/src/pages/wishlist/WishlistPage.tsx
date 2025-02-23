import React, { useState, useEffect } from "react";
import {
  Tag,
  Typography,
  Spin,
  message,
  Row,
  Col,
} from "antd";
import { getWishlistById} from "../../api/wishlist/api";
import { Product } from "../../utils/types/api.types";
import ProductCard from "../../components/card/ProductCard";

interface WishlistPageProps {}

const WishlistPage: React.FC<WishlistPageProps> = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [messageApi, contextHolder] = message.useMessage();
  
  const storedUser = localStorage.getItem("user");
  const userWishlistId =
    storedUser && JSON.parse(storedUser).wishlist?.id ? JSON.parse(storedUser).wishlist.id : null;

  useEffect(() => {
    if (!userWishlistId) {
      messageApi.error("Veuillez vous connecter pour accéder à votre liste de souhaits.");
      window.location.href = "/signin"; 
    }
  }, [userWishlistId, messageApi]);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!userWishlistId) return; 

        setLoading(true);
        const response = await getWishlistById({ id: userWishlistId });

        if (response.status === 200 && response.data) {
          setWishlistItems(response.data.products || []); 
        } else {
          setError("Échec du chargement de la liste de souhaits.");
        }
      } catch (err) {
        console.error("Erreur lors du chargement de la liste de souhaits:", err);
        setError("Une erreur est survenue lors du chargement de votre liste de souhaits.");
      } finally {
        setLoading(false);
      }
    };

    if (userWishlistId) {
      fetchWishlist();
    }
  }, [userWishlistId]);

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
        <Spin size="large" tip="Chargement de la liste de souhaits..." />
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
      <h1>Mes favoris</h1>
      {wishlistItems.length === 0 ? (
        <Tag color="warning">Votre liste de souhaits est vide.</Tag>
      ) : (
        <Row gutter={16}>
          {wishlistItems.map((product) => (
            <Col key={product.id} span={8}>
              <ProductCard
                product={product}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default WishlistPage;
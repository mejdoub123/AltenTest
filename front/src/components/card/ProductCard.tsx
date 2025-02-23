import React, { useState } from "react";
import {
  Card,
  InputNumber,
  Button,
  Typography,
  Tooltip,
  Tag,
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Product } from "../../utils/types/api.types";
import { addProductItem } from "../../api/cart/api";
import { addProductItem as addProductItemWishlist, removeProductItem } from "../../api/wishlist/api";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const storedUser = localStorage.getItem("user");
  const userCartId =
    storedUser && JSON.parse(storedUser).cart?.id
      ? JSON.parse(storedUser).cart.id
      : null;

  const userWishlistId =
    storedUser && JSON.parse(storedUser).wishlist?.id
      ? JSON.parse(storedUser).wishlist.id
      : null;


  const handleQuantityChange = (value: number | null) => {
    if (value !== null && value >= 0) {
      setQuantity(value);
    }
  };

  const getInventoryStatusTag = (status: string) => {
    switch (status) {
      case "INSTOCK":
        return (
          <Tag
            color="success"
            style={{
              textTransform: "uppercase",
              position: "absolute",
              bottom: 8,
              right: 8,
              borderRadius: 4,
            }}
          >
            En stock
          </Tag>
        );
      case "LOWSTOCK":
        return (
          <Tag
            color="warning"
            style={{
              textTransform: "uppercase",
              position: "absolute",
              bottom: 8,
              right: 8,
              borderRadius: 4,
            }}
          >
            Stock bas
          </Tag>
        );
      case "OUTOFSTOCK":
        return (
          <Tag
            color="error"
            style={{
              textTransform: "uppercase",
              position: "absolute",
              bottom: 8,
              right: 8,
              borderRadius: 4,
            }}
          >
            Épuisé
          </Tag>
        );
      default:
        return null;
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!userCartId) {
        messageApi.error("Veuillez vous connecter pour accéder à votre panier.");
        return;
      }

      if (product.quantity < quantity) {
        messageApi.error("Cette quantité n'est pas disponible en stock.");
        return;
      }

      if (product.inventoryStatus === "OUTOFSTOCK") {
        messageApi.error("Ce produit n'est pas disponible en stock.");
        return;
      }

      const response = await addProductItem(
        { cartId: userCartId, productId: product.id },
        quantity
      );

      if (response.status === 200) {
        messageApi.success("Produit ajouté au panier avec succès !");
      } else {
        messageApi.error("Échec de l'ajout du produit au panier.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      messageApi.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      if (!userWishlistId) {
        messageApi.error("Veuillez vous connecter pour accéder à vos favoris.");
        return;
      }

      if (!isInWishlist) {
        const response = await addProductItemWishlist({
          wishlistId: userWishlistId,
          productId: product.id,
        });

        if (response.status === 200) {
          setIsInWishlist(true);
          messageApi.success("Produit ajouté à vos favoris !");
        } else {
          messageApi.error("Échec de l'ajout du produit aux favoris.");
        }
      } else {
        const response = await removeProductItem({
          wishlistId: userWishlistId,
          productId: product.id,
        });

        if (response.status === 200) {
          setIsInWishlist(false);
          messageApi.success("Produit retiré de vos favoris !");
        } else {
          messageApi.error("Échec du retrait du produit des favoris.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la manipulation des favoris:", error);
      messageApi.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <Card
      style={{ width: "95%", margin: "16px", position: "relative" }}
      cover={
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            alt={product.name}
            src={product.image}
            style={{ width: "100%", objectFit: "cover", borderRadius: 4 }}
          />
          {getInventoryStatusTag(product.inventoryStatus)}
        </div>
      }
    >
      {contextHolder}

      <Typography.Title level={5} style={{ marginBottom: 8 }}>
        {product.name}
      </Typography.Title>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Typography.Text>Quantité</Typography.Text>
        <InputNumber
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
          controls={
            <div>
              <MinusCircleOutlined
                onClick={() => handleQuantityChange(quantity - 1)}
              />
              <PlusOutlined
                onClick={() => handleQuantityChange(quantity + 1)}
              />
            </div>
          }
          disabled={product.inventoryStatus === "OUTOFSTOCK"}
        />
      </div>
      
      <Typography.Title
        level={5}
        style={{
          color: "#D02626",
          fontWeight: "500",
          fontSize: "20px",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {product.price.toFixed(2)} MAD
      </Typography.Title>

      <Button
        type="primary"
        block
        onClick={handleAddToCart}
        disabled={product.inventoryStatus === "OUTOFSTOCK" || !userCartId}
      >
        <span role="img" aria-label="cart">
          <ShoppingCartOutlined />
        </span>
        Ajouter au panier
      </Button>
      <Tooltip
        title={isInWishlist ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
      >
        <Button
          type="default"
          block
          style={{ marginTop: 8 }}
          onClick={handleAddToWishlist}
          icon={
            isInWishlist ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined style={{ color: "red" }} />
            )
          }
          disabled={!userWishlistId}
        >
          {isInWishlist ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
        </Button>
      </Tooltip>
    </Card>
  );
};

export default ProductCard;
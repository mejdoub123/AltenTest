import React from "react";
import { Row, Col} from "antd";
import ProductCard from "../card/ProductCard";
import { Product } from "../../utils/types/api.types";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
}) => {
  return (
      <Row gutter={[16, 16]} justify="center" style={{ margin: 0 }}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={5}>
            <ProductCard
              product={product}
            />
          </Col>
        ))}
      </Row>
  );
};

export default ProductList;

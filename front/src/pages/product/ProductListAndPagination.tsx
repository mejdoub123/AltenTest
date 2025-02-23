import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { getProductsPeagableList } from "../../api/product/api";
import {
  Product,
  ProductListPageableRequest,
} from "../../utils/types/api.types";
import ProductList from "../../components/list/ProductList";

interface ProductListAndPaginationProps {
  searchParams: {
    searchTerm: string;
    minPrice: string;
    maxPrice: string;
    currentPage: number;
    pageSize: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ProductListAndPagination: React.FC<ProductListAndPaginationProps> = ({
  searchParams,
  onPageChange,
  onPageSizeChange,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRequest: ProductListPageableRequest = {
        category: searchParams.searchTerm,
        name: searchParams.searchTerm,
        page: searchParams.currentPage,
        size: searchParams.pageSize,
        minPrice: searchParams.minPrice,
        maxPrice: searchParams.maxPrice,
      };

      const response = await getProductsPeagableList(productsRequest);

      if (response && response.data.content) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        setError("Aucun produit trouvé.");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err);
      setError(
        "Échec du chargement des produits. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    searchParams
  ]);

  const handlePageChange = (page: number) => {
    onPageChange(page - 1);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    console.log("handlePageSizeChange", current, size);
    onPageSizeChange(size);
    onPageChange(0);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <Spin size="large" tip="Loading cart..." />
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
          height: "40vh",
          color: "red",
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <ProductList products={products} />
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <Pagination
            current={searchParams.currentPage + 1}
            pageSize={searchParams.pageSize}
            total={searchParams.pageSize * totalPages}
            onChange={handlePageChange}
            showSizeChanger
            onShowSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </>
  );
};

export default ProductListAndPagination;

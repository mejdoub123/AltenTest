import { Input } from "antd";
import { useState } from "react";
import ProductListAndPagination from "./ProductListAndPagination";

interface SearchParams {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  currentPage: number; 
  pageSize: number;
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    currentPage: 0,
    pageSize: 10,
  });

  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      searchTerm: value,
      currentPage: 0, 
    }));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      minPrice: e.target.value,
      currentPage: 0, 
    }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      maxPrice: e.target.value,
      currentPage: 0, 
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({
      ...prev,
      currentPage: page, 
    }));
  };

  const handlePageSizeChange = (size: number) => {
    setSearchParams((prev) => ({
      ...prev,
      pageSize: size,
      currentPage: 0,
    }));
  };

  return (
    <>
      <div style={{ margin: 16, display: "flex", justifyContent: "center" }}>
        <Input.Search
          placeholder="Rechercher un produit"
          value={searchParams.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          enterButton
          style={{ width: "50%", alignSelf: "center" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          margin: "16px 0",
        }}
      >
        <Input
          placeholder="Prix Min"
          value={searchParams.minPrice}
          onChange={handleMinPriceChange}
          style={{ width: "150px" }}
        />
        <Input
          placeholder="Prix Max"
          value={searchParams.maxPrice}
          onChange={handleMaxPriceChange}
          style={{ width: "150px" }}
        />
      </div>

      <ProductListAndPagination
        searchParams={searchParams}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default ProductsPage;
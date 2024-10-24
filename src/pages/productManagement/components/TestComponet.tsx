import { useFetchProducts } from "@/lib/product/hooks/useFetchProducts";
import { useEffect } from "react";

const TestComponent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchProducts();

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    console.log("Data update:", {
      pagesCount: data?.pages.length,
      productsPerPage: data?.pages.map((page) => page.products.length),
      totalProducts: allProducts.length,
      hasNextPage,
      isFetchingNextPage,
    });
  }, [data, allProducts.length, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Products Count: {allProducts.length}</h2>
      <div style={{ margin: "20px 0" }}>
        {allProducts.map((product) => (
          <div
            key={product.docId}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Created: {product.createdAt}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{
          padding: "10px 20px",
          backgroundColor: hasNextPage ? "#007bff" : "#ccc",
          color: "white",
          cursor: hasNextPage ? "pointer" : "not-allowed",
        }}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more products"}
      </button>
    </div>
  );
};

export default TestComponent;

import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCT_KEY } from "../key";
import { deleteProductAPI } from "../api";
import { useProductStore } from "@/store/product/useProductStore";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  return useMutation<void, Error, string>({
    mutationFn: deleteProductAPI, // 상품 삭제 API 호출
    onSuccess: (_, deletedProductId: string) => {
      addToast("상품이 삭제되었습니다.", "success");

      // Zustand 상태 업데이트
      const updatedProducts = products.filter(
        (product) => product.id !== deletedProductId
      );
      setProducts(updatedProducts);

      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] }); // 성공 시 상품 목록 갱신
    },
    onError: (error: Error) => {
      addToast("상품 삭제에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};

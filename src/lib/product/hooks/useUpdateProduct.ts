import { NewProductDTO } from "@/lib/product/types";
import { useToastStore } from "@/store/toast/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";
import { PRODUCT_KEY } from "../key";
import { useProductStore } from "@/store/product/useProductStore";
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const updateProductInStore = useProductStore(
    (state) => state.updateProductInStore
  );

  return useMutation<void, Error, { id: string } & NewProductDTO>({
    mutationFn: ({ id, ...data }) => updateProductAPI(id, data),
    onSuccess: (data, variables) => {
      addToast("상품 수정 성공", "success");
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] }); // 수정 후 UI 업데이트를 위한 invalidate

      // 상태 관리 내 제품 수정 (Firebase 업데이트 후 Zustand 상태 반영)
      const updatedProduct = {
        ...variables,
        docId: variables.id,
        image: typeof variables.image === "string" ? variables.image : "",
        createdAt: new Date().toISOString(), // 수정 시 등록일과 수정일을 동일하게 설정
        updatedAt: new Date().toISOString(), // 서버 시간 대신 클라이언트 측에서 설정된 수정일 적용
      };

      updateProductInStore(updatedProduct);
    },
    onError: (error: Error) => {
      addToast("상품 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};

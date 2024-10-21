// 상품 등록 모달 구현
// 파일 업로드, 상품 등록 그리고 firebase와 연동하여 데이터를 저장

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ALL_CATEGORY_ID, categories } from "@/constants";
import { createNewProduct } from "@/helpers/product";
import { useAddProduct } from "@/lib/product/hooks/useAddProduct";
import { NewProductDTO } from "@/lib/product/types";
import { uploadImage } from "@/lib/utils/imageUpload";
import { useToastStore } from "@/store/toast/useToastStore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormInputs {
  title: string;
  author: string;
  publishedDate: Date;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  image: FileList;
  sellerId: string;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending: isLoading } = useAddProduct();
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormInputs>();

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: ProductFormInputs) => {
    setSubmissionError(null);
    try {
      if (!data.image || data.image.length === 0) {
        throw new Error("이미지를 선택해야 합니다.");
      }
      const imageFile = data.image[0];

      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const selectedCategory = categories.find(
        (category) => category.id === data.categoryId
      );

      if (!selectedCategory) {
        throw new Error("유효한 카테고리를 선택해주세요.");
      }

      const newProductData: NewProductDTO = {
        sellerId: data.sellerId,
        title: data.title,
        price: Number(data.price),
        quantity: data.stock,
        description: data.description,
        category: { id: selectedCategory.id, name: selectedCategory.name },
        image: imageFile,
      };

      const newProduct = createNewProduct(newProductData, imageUrl);

      await mutateAsync(newProduct);
      reset();
      onClose();
    } catch (error: unknown) {
      addToast("상품 등록에 실패했습니다.", "error");

      if (error instanceof Error) {
        console.error("상품 등록에 실패 했습니다", error);
        setSubmissionError(error.message || "상품 등록에 실패했습니다.");
      } else {
        console.error("알 수 없는 오류 발생", error);
        setSubmissionError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register("title", { required: "상품명을 입력해주세요." })}
              placeholder="상품명"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Input
              type="number"
              {...register("price", { required: "가격을 입력해주세요." })}
              placeholder="가격"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
            <Textarea
              {...register("description", {
                required: "상품 설명을 입력해주세요.",
              })}
              className="resize-none"
              placeholder="상품 설명"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{ required: "카테고리를 선택해주세요." }}
              render={({ field }) => (
                <>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((category) => category.id !== ALL_CATEGORY_ID)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {errors.categoryId.message}
                    </p>
                  )}
                </>
              )}
            />
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              {...register("image", { required: "이미지를 선택해주세요." })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          {submissionError && (
            <p className="text-red-500 text-sm">{submissionError}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "등록 중..." : "등록"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

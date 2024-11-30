import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ALL_CATEGORY_ID, categories } from "@/constants";
import { useAddProduct } from "@/lib/product/hooks/useAddProduct";
import { useUpdateProduct } from "@/lib/product/hooks/useUpdateProduct";

import { NewProductDTO } from "@/lib/product/types";
import { uploadImage } from "@/lib/utils/imageUpload";
import { useProductStore } from "@/store/product/useProductStore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId: string;
}

interface ProductFormInputs {
  title: string;
  author: string;
  publishedDate: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  image: FileList;
  sellerId: string;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose, sellerId }) => {
  const { mutateAsync: addProductMutate, isPending: isLoading } =
    useAddProduct();
  const { mutateAsync: updateProductMutate, isPending: isUpdating } =
    useUpdateProduct();
  const editableProduct = useProductStore((state) => state.editableProduct);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: editableProduct?.title || "",
      author: editableProduct?.author || "",
      price: editableProduct?.price,
      stock: editableProduct?.stock,
      description: editableProduct?.description || "",
      publishedDate: editableProduct?.publishedDate || "",
      categoryId: editableProduct?.category.id || "",
    },
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    if (editableProduct) {
      setIsEditMode(true);
      setValue("title", editableProduct.title);
      setValue("author", editableProduct.author);
      setValue("price", editableProduct.price);
      setValue("stock", editableProduct.stock);
      setValue("description", editableProduct.description || "");
      setValue("publishedDate", editableProduct.publishedDate);
      setValue("categoryId", editableProduct.category.id);
      console.log("Editable product loaded into form:", editableProduct);
    } else {
      setIsEditMode(false);
      reset();
    }
  }, [editableProduct, setValue, reset]);

  const onSubmit = async (data: ProductFormInputs) => {
    setSubmissionError(null);
    try {
      if (!data.image || data.image.length === 0) {
        throw new Error("이미지를 선택해야 합니다.");
      }
      const imageFile = data.image[0];

      const imageUrls = await uploadImage(imageFile);
      if (!imageUrls) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const selectedCategory = categories.find(
        (category) => category.id === data.categoryId
      );

      if (!selectedCategory) {
        throw new Error("유효한 카테고리를 선택해주세요.");
      }

      const newProductData: NewProductDTO = {
        sellerId: sellerId,
        title: data.title,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
        category: { id: selectedCategory.id, name: selectedCategory.name },
        author: data.author,
        publishedDate: data.publishedDate,
        image: imageUrls,
      };

      const newProduct = {
        id: editableProduct?.id || `${Date.now()}`,
        ...newProductData,
        createdAt: editableProduct?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEditMode && editableProduct) {
        await updateProductMutate(newProduct);
      } else {
        await addProductMutate(newProduct);
      }
      reset();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmissionError(error.message || "상품 등록에 실패 했습니다");
      } else {
        setSubmissionError("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "상품 수정" : "상품 등록"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register("title", { required: "상품명을 입력해주세요." })}
              placeholder="상품명"
              className="placeholder:text-gray-600"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Input
              {...register("author", { required: "저자를 입력해주세요." })}
              placeholder="저자"
              className="placeholder:text-gray-600"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
            <div className="relative">
              <div className="flex items-center w-full border border-solid border-black overflow-hidden">
                <Label className="px-3 min-w-16 text-gray-600">출판일</Label>
                <Input
                  type="date"
                  {...register("publishedDate", {
                    required: "출판일을 입력해주세요.",
                  })}
                  className="border-none"
                />
              </div>
              {errors.publishedDate && (
                <p className="text-destructive text-sm mt-1">
                  {errors.publishedDate.message}
                </p>
              )}
            </div>
            <Input
              type="number"
              {...register("price", { required: "가격을 입력해주세요." })}
              placeholder="가격"
              className="placeholder:text-gray-600"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
            <Input
              type="number"
              {...register("stock", { required: "재고를 입력해주세요." })}
              placeholder="재고"
              className="placeholder:text-gray-600"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
            <Textarea
              {...register("description", {
                required: "상품 설명을 입력해주세요.",
              })}
              className="resize-none placeholder:text-gray-600"
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
                    <SelectContent className="bg-white">
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
            <Button type="submit" disabled={isLoading || isUpdating}>
              {isLoading || isUpdating
                ? isEditMode
                  ? "수정 중..."
                  : "등록 중..."
                : isEditMode
                ? "수정"
                : "등록"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

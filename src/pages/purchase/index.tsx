import { useAuthStore } from "@/store/auth/useAuthStore";
import { OrderItems } from "./components/OrderItems";
import { PaymentInfo } from "./components/PaymentInfo";
import { ShippingInfo } from "./components/ShippingInfo";
import { useCartStore } from "@/store/cart/useCartStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { useMakePurchase } from "@/lib/purchase/hooks/useMakePurchase";
import { Loader2 } from "lucide-react";
import { useOrderStore } from "@/store/order/useOrderStore";
import { calculateTotal } from "@/store/order/orderUtils";
import { authStatusType, Layout } from "../common/components/Layout";

export interface FormData {
  name: string;
  address: string;
  phone: string;
  requests: string;
  payment: string;
  form?: string;
}

export interface FormErrors {
  phone?: string;
  form?: string;
}

export const Purchase: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { product, initOrder, resetOrder } = useOrderStore();
  const { initCart } = useCartStore();

  const methods = useForm<FormData>({
    defaultValues: {
      name: user?.displayName,
      address: "",
      phone: "",
      requests: "",
      payment: "accountTransfer",
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (user?.id) {
      initCart(user.id);
    }
  }, [user, initCart]);

  useEffect(() => {
    // 페이지 진입 시 주문 정보 초기화
    initOrder();

    // 페이지 떠날 때 로컬스토리지 초기화
    return () => {
      resetOrder();
    };
  }, [initOrder, resetOrder]);

  const { mutate: makePurchaseMutation, isPending: isLoading } =
    useMakePurchase();

  const onSubmit: SubmitHandler<FormData> = useCallback(() => {
    if (!user) return;

    const total = calculateTotal(product);
    const totalAmount = total.totalPrice;

    // 배송비 계산
    const shippingFee = totalAmount >= 50000 ? 0 : 3000;
    const totalPayment = totalAmount + shippingFee;

    const purchaseData = {
      totalAmount,
      shippingFee,
      totalPayment,
      items: product?.map((item) => ({
        productId: item.id,
        sellerId: item.sellerId,
        quantity: item.count,
        price: item.price,
        title: item.title,
        image: item.image,
      })),
    };

    makePurchaseMutation({
      purchaseData,
      userId: user.id,
      orderData: product,
    });
  }, [product, makePurchaseMutation, user]);

  return (
    <FormProvider {...methods}>
      <Layout authStatus={authStatusType.NEED_BUYER}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold">주문/결제</p>
            <ShippingInfo />
            <OrderItems product={product} />
            <PaymentInfo product={product} />
            <div className="flex justify-end mb-10">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-[200px] px-12 py-3 rounded-lg bg-[#5055B1] text-white font-medium hover:bg-[#2C307B]"
              >
                {isLoading ? (
                  <div className="flex gap-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    처리 중...
                  </div>
                ) : (
                  "구매하기"
                )}
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </FormProvider>
  );
};

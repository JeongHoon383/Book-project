import { useAuthStore } from "@/store/auth/useAuthStore";
import { OrderItems } from "./components/OrderItems";
import { PaymentInfo } from "./components/PaymentInfo";
import { ShippingInfo } from "./components/ShippingInfo";
import { useCartStore } from "@/store/cart/useCartStore";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { useMakePurchase } from "@/lib/purchase/hooks/useMakePurchase";
import { calculateTotal } from "@/store/cart/cartUtils";
import { Loader2 } from "lucide-react";
import { useOrderStore } from "@/store/order/useOrderStore";

// orderStore 데이터 초기화

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
  const { product, isDirectPurchase, initOrder, resetOrder } = useOrderStore();
  const { cart, totalCount, totalPrice, initCart } = useCartStore();

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

  // 주문 데이터를 서버 데이터에 저장해야됨
  //

  const { mutate: makePurchaseMutation, isPending: isLoading } =
    useMakePurchase();

  const onSubmit: SubmitHandler<FormData> = useCallback(() => {
    if (!user) return;

    const cartItems = Object.values(cart);
    const total = calculateTotal(cart);
    const totalAmount = total.totalPrice;

    const purchaseData = {
      totalAmount,
      items: cartItems.map((item) => ({
        productId: item.id,
        sellerId: item.sellerId,
        quantity: item.count,
        price: item.price,
        title: item.title,
      })),
    };

    makePurchaseMutation({
      purchaseData,
      userId: user.id,
      orderData: cartItems,
    });
  }, [cart, makePurchaseMutation, user]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold">주문/결제</p>
          <ShippingInfo />
          <OrderItems
            product={product}
            totalCount={totalCount}
            isDirectPurchase={isDirectPurchase}
          />
          <PaymentInfo
            product={product}
            totalPrice={totalPrice}
            isDirectPurchase={isDirectPurchase}
          />
          <div className="flex justify-end mb-10">
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-3 rounded bg-[#5055B1] text-white font-medium hover:bg-[#2C307B]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                "구매하기"
              )}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

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
  const cart = useCartStore((state) => state.cart);
  const initCart = useCartStore((state) => state.initCart);

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
      cartData: cartItems,
    });
  }, [cart, makePurchaseMutation, user]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold">주문/결제</p>
          <ShippingInfo />
          <OrderItems />
          <PaymentInfo />
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

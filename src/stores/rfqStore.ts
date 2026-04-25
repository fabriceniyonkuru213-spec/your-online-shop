import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RfqItem {
  productId: string;
  handle: string;
  title: string;
  image: string | null;
  price: { amount: string; currencyCode: string };
  quantity: number;
  notes?: string;
}

interface RfqStore {
  items: RfqItem[];
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCompany: string;
  message: string;
  addItem: (item: Omit<RfqItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setBuyer: (data: Partial<Pick<RfqStore, "buyerName" | "buyerEmail" | "buyerPhone" | "buyerCompany" | "message">>) => void;
}

export const useRfqStore = create<RfqStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      buyerCompany: "",
      message: "",
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: item.quantity ?? 10 }] });
        }
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({ items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)) });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [], message: "" }),
      setBuyer: (data) => set(data),
    }),
    {
      name: "rwanda-rfq",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

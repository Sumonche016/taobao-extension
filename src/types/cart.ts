export interface ProductDetails {
  name: string;
  price: string;
  distribution: string;
  guarantee: string;
  quantity: number;
  classification: string;
  size: string;
  color: string;
  imageUrl: string;
  currentUrl: string;
}

export interface ProductModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  cartItems: ProductDetails[];
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  getTotalPrice: () => string;
  handlePlaceOrder: () => void;
}

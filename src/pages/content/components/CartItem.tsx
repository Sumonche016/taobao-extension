import { ProductDetails } from "@src/types/cart";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


interface CartItemProps {
    item: ProductDetails;
    index: number;
    updateQuantity: (index: number, quantity: number) => void;
    removeFromCart: (index: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    index,
    updateQuantity,
    removeFromCart,
}) => {
    return (
        <div className="cart-item-container">
            <div className="cart-item-image-container">
                <img
                    src={`https:${item.imageUrl}`}
                    alt={item.name}
                    loading="lazy"
                />
            </div>
            <div className="cart-item-content">
                <div className="flex justify-between items-center">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <button
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(index)}
                        aria-label="Remove item"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex gap-2 cart-item-info text-sm">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size}</span>
                    <span>Guarantee: {item.guarantee}</span>
                    <span>Classification: {item.classification}</span>
                    <span>Distribution: {item.distribution}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="cart-item-price text-lg font-semibold">
                        ¥ {item.price}
                    </span>
                    <div className="quantity-controls flex items-center gap-2">
                        <button
                            onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                            className="quantity-btn"
                            aria-label="Decrease quantity"
                        >
                            <AiOutlineMinus />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="quantity-btn"
                            aria-label="Increase quantity"
                        >
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

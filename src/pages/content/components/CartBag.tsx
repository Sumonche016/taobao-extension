import { BsCartCheckFill } from 'react-icons/bs';

const CartBag = ({ setVisible, cartItems }) => {
    return (
        <div
            onClick={() => setVisible(true)}
            className="cart-items cart-container"
        >
            <BsCartCheckFill className="cart-icon" />
            <div className="notification-badge">
                <input type="number" value={cartItems.length} readOnly />
            </div>
            <span className="cart-title">My Cart</span>
        </div>
    );
};

export default CartBag;


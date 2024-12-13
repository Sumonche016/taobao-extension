import { Modal, Button } from 'antd';
import SimpleBar from 'simplebar-react';

import './ProductModal.styles.scss';
import { CartItem } from './CartItem';
import { ProductModalProps } from '@src/types/cart';

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  setVisible,
  cartItems,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handlePlaceOrder,
}) => {
  return (
    <Modal
      title="Your Cart"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={
        <div className="modal-footer">
          <div className="total-price">
            <span>Total Price: </span>
            <span className="font-semibold">¥ {getTotalPrice()}</span>
          </div>
          <Button
            className="order-button"
            type="primary"
            onClick={handlePlaceOrder}
          >
            Create Order
          </Button>
        </div>
      }
      className="cart-modal"
    >
      <SimpleBar style={{ maxHeight: '70vh' }}>
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={`${item.name}-${index}`}
                item={item}
                index={index}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </div>
      </SimpleBar>
    </Modal>
  );
};
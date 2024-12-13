import { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { message } from 'antd';
import { MemoryRouter as Router } from "react-router-dom";
import './content.css';
import Sidebar from "./Sidebar";
import CartBag from "./components/CartBag";
import './content-style.scss';
import { FaCartPlus } from "react-icons/fa";
import 'simplebar-react/dist/simplebar.min.css';
import { ProductModal } from "./components/ProductModal";

interface ProductDetails {
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

const Content = () => {
  const [visible, setVisible] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const showDrawer = () => setVisibleDrawer(true);
  const onCloseDrawer = () => setVisibleDrawer(false);

  const scrapeProductDetails = useCallback((): ProductDetails => {
    const getSelectedClassification = () => {
      const contentDiv = document.querySelector('.SkuContent--content--2UKSo-9');
      if (contentDiv) {
        const selectedItem = contentDiv.querySelector('.SkuContent--isSelected--tfxz6VP span');
        return selectedItem?.textContent?.trim() || 'No classification selected';
      }
      return 'Classification not found';
    };

    const getImageUrl = () => {
      const imgElement = document.querySelector('.PicGallery--mainPicWrap--juPDFPo img');
      return imgElement ? imgElement.getAttribute('src') || 'Image URL Not Found' : 'Image Not Found';
    };

    const getSelectedColor = () => {
      const contentDivs = document.querySelectorAll('.SkuContent--content--2UKSo-9');
      for (const contentDiv of contentDivs) {
        const selectedItem = contentDiv.querySelector('.SkuContent--isSelected--tfxz6VP span');
        if (selectedItem) {
          return selectedItem.textContent?.trim() || 'No color selected';
        }
      }
      return 'Color not found';
    };

    const getSelectedSize = () => {
      const contentDiv = document.querySelectorAll('.SkuContent--content--2UKSo-9')[1];
      if (contentDiv) {
        const selectedItem = contentDiv.querySelector('.SkuContent--isSelected--tfxz6VP span');
        return selectedItem?.textContent?.trim() || 'No Size selected';
      }
      return 'Size not found';
    };

    return {
      name: document.querySelector('.PurchasePanel--contentWrap--3APbL7v .ItemTitle--root--3V3R5Y_ h1')?.textContent || 'Product Name Not Found',
      price: document.querySelector('.PurchasePanel--contentWrap--3APbL7v .Price--priceText--1oEHppn')?.textContent || 'Price Not Found',
      distribution: document.querySelector('.PurchasePanel--contentWrap--3APbL7v .f-els-1')?.textContent || 'Distribution Not Found',
      guarantee: document.querySelector('.PurchasePanel--contentWrap--3APbL7v .GuaranteeInfo--guaranteeText--293JmPS')?.textContent || 'Guarantee Not Found',
      quantity: parseInt((document.querySelector('.Operation--countValue--3VF_tPH') as HTMLInputElement)?.value) || 1,
      classification: getSelectedClassification(),
      size: getSelectedSize(),
      color: getSelectedColor(),
      imageUrl: getImageUrl(),
      currentUrl: window.location.href,
    };
  }, []);

  useEffect(() => {
    const setupObserver = () => {
      const targetNode = document.querySelector('.PurchasePanel--contentWrap--3APbL7v');
      if (!targetNode) {
        console.log("Target node not found, retrying in 500ms");
        setTimeout(setupObserver, 500);
        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'subtree' || mutation.type === 'attributes') {
            const details = scrapeProductDetails();
            setProductDetails(details);
          }
        });
      });

      const config = { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] };
      observer.observe(targetNode, config);

      const initialDetails = scrapeProductDetails();
      setProductDetails(initialDetails);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupObserver);
    } else {
      setupObserver();
    }

    if (chrome.storage) {
      chrome.storage.local.get(['cartItems'], (result) => {
        if (result.cartItems) {
          setCartItems(result.cartItems);
        }
      });
    }

    return () => {
      const targetNode = document.querySelector('.PurchasePanel--contentWrap--3APbL7v');
      if (targetNode) {
        const observer = new MutationObserver(() => { });
        observer.disconnect();
      }
    };
  }, [scrapeProductDetails]);

  const addToCart = () => {
    if (productDetails) {
      const updatedCart = [...cartItems, productDetails];
      setCartItems(updatedCart);
      if (chrome.storage) {
        chrome.storage.local.set({ cartItems: updatedCart }).then(() => {
          message.success('Product added successfully');
        });
      }
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    if (chrome.storage) {
      chrome.storage.local.set({ cartItems: updatedCart });
    }
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    if (chrome.storage) {
      chrome.storage.local.set({ cartItems: updatedCart });
    }
  };

  const handlePlaceOrder = () => {
    setVisible(false);
    showDrawer();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="z-[99999]" style={{ zIndex: '9999' }}>
      <div className="cart-button-conatiner" style={{
        position: 'fixed',
        top: "40%",
        right: '0px',
        backgroundColor: '#bea4ce',
        borderColor: '#c34cdb',
        color: 'white',
        zIndex: 99999,
      }}>
        <div className="logo">
          <img src='https://i.ibb.co/pvdYYhb/image0.png' alt="logo" />
        </div>

        <CartBag setVisible={setVisible} cartItems={cartItems} />

        <div onClick={addToCart} className="cart-plus">
          <FaCartPlus className="cart-icon" />
          <span className="cart-title">Add to Cart</span>
        </div>
      </div>

      <Sidebar
        cartItems={cartItems}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
        productDetails={productDetails}
      />

      <ProductModal
        visible={visible}
        setVisible={setVisible}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        handlePlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

const div = document.createElement("div");
document.body.appendChild(div);

const root = createRoot(div);
root.render(
  <Router>
    <Content />
  </Router>
);

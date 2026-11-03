
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/paintings";

export default function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is still empty.</p>
            <button className="primary-button" onClick={onClose}>
              Explore Artwork
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>{formatPrice(item.price)}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>

              <button
                className="checkout-button"
                onClick={() =>
                  alert("Checkout akan dikembangkan pada tahap berikutnya.")
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

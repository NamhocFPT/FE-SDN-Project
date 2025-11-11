import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCart } from '../services/CartService';

/**
 * CartBadge shows a cart icon with total selected item count.
 * Auto refreshes when pathname changes (simple heuristic after add/remove actions).
 */
const CartBadge = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const load = async () => {
    try {
      setLoading(true);
      const items = await getCart();
      if (Array.isArray(items)) {
        const totalQty = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
        setCount(totalQty);
      }
    } catch (_) {
      // ignore (not logged in or error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Link to="/cart" className="cart-badge" aria-label="Giỏ hàng" title="Giỏ hàng">
      <span className="cart-badge__icon">🛒</span>
      <span className="cart-badge__count">{loading ? '…' : count}</span>
    </Link>
  );
};

export default CartBadge;

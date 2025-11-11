import React, { useEffect, useState } from 'react';
import { get } from '../../../ultils/request';

const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n || 0);

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await get('order/my-orders'); // GET /api/order/my-orders
        setOrders(res?.orders || []);
      } catch (e) {
        setError(e?.message || 'Không thể tải lịch sử đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="status-message">Đang tải lịch sử đơn hàng...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  if (!orders.length) {
    return <div className="status-message">Bạn chưa có đơn hàng nào.</div>;
  }

  return (
    <div className="order-history">
      <h1>Lịch sử đơn hàng</h1>
      <div className="order-list">
        {orders.map((o) => (
          <div key={o.id} className="order-card" style={{border:'1px solid #eee', borderRadius:8, padding:16, marginBottom:12, background:'#fff'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <div><strong>Mã đơn:</strong> {o.code}</div>
                <div><strong>Trạng thái:</strong> {o.status}</div>
              </div>
              <div>
                <div><strong>Số sản phẩm:</strong> {o.itemCount}</div>
                <div><strong>Thành tiền:</strong> {fmt(o.amounts?.grandTotal)}</div>
              </div>
            </div>
            <div style={{marginTop:8, color:'#777'}}>Ngày tạo: {new Date(o.createdAt).toLocaleString('vi-VN')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;

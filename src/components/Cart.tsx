interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  removeFromCart: (id: number) => void;
  increaseItem: (item: CartItem) => void;
  decreaseItem: (item: CartItem) => void;
  removeAll: () => void;
}

function Cart({items, removeFromCart, increaseItem, decreaseItem, removeAll}: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <div>
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} VNĐ (Số lượng: {item.quantity})
                <button onClick={() => increaseItem(item)}>+</button>
                <button onClick={() => decreaseItem(item)}>-</button>
                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
              </li>
            ))}
          </ul>
          <p>Tổng giá: {totalPrice} VNĐ</p>
          <button onClick={() => removeAll()}>Xoá tất cả</button>
        </>
      )}
    </div>
  );
}

export default Cart;
export type {CartItem};
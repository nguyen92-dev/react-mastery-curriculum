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
}

function Cart({ items, removeFromCart, increaseItem, decreaseItem }: CartProps) {
    return (
        <div>
            <h2>Giỏ hàng</h2>
            {items.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price} VNĐ - {item.quantity} cái
                            <button onClick={() => increaseItem(item)}>Tăng</button>
                            <button onClick={() => decreaseItem(item)}>Giảm</button>
                            <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export type { CartItem };
export default Cart;
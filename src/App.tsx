import { useState, useCallback } from "react";
import ProductList from "./components/ProductList";
import { Product } from "./components/ProductList";
import Cart, { CartItem } from "./components/Cart"; // Sửa tên file nếu cần

const products: Product[] = [
    { id: 1, name: "Bánh mì", price: 20000 },
    { id: 2, name: "Bánh ngọt", price: 30000 },
    { id: 3, name: "Bánh kem", price: 150000 },
];

function App() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const removeAll = () => setCartItems([]);

    // Tách logic thêm sản phẩm để không phụ thuộc cartItems trong useCallback
    const addToCart = useCallback((product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    }, []); // Dependency rỗng vì không cần cartItems trực tiếp

    const increaseItem = (item: CartItem) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )
        );
    };

    const decreaseItem = (item: CartItem) => {
        setCartItems((prevItems) => {
            if (item.quantity > 1) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                );
            }
            return prevItems.filter((cartItem) => cartItem.id !== item.id);
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div>
            <h1>Website Tiệm Bánh</h1>
            <ProductList products={products} addToCart={addToCart} />
            <Cart
                items={cartItems}
                removeFromCart={removeFromCart}
                increaseItem={increaseItem}
                decreaseItem={decreaseItem}
                removeAll={removeAll}
            />
        </div>
    );
}

export default App;
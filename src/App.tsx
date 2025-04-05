import { useState } from "react";
import ProductList from "./components/ProductList";
import { Product } from "./components/ProductList";
import Cart, {CartItem} from "./components/CartItem.tsx";

function App() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const products = [
        { id: 1, name: "Bánh mì", price: 20000 },
        { id: 2, name: "Bánh ngọt", price: 30000 },
        { id: 3, name: "Bánh kem", price: 150000 },
    ];

    const increaseItem = (item: CartItem) => {
        item.quantity += 1;
        setCartItems(
            cartItems.map((cartItem) =>
            cartItem.id === item.id ? item : cartItem)
        )
    }

    const decreaseItem = (item: CartItem) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id ? item : cartItem)
            )
        } else {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        }
    }

    const addToCart = (product: Product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id: number) => {
        const existingItem = cartItems.find((item) => item.id === id);
        if (existingItem) {
            setCartItems(cartItems.filter((item) => item.id !== id));
        }
    }

    return (
        <div>
            <h1>Website Tiệm Bánh</h1>
            <ProductList products={products} addToCart={addToCart} />
            <Cart items={cartItems}
                  removeFromCart={removeFromCart}
                  increaseItem = {increaseItem}
                  decreaseItem={decreaseItem}/>
        </div>
    );
}

export default App;
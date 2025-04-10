import {memo} from "react";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
    addToCart: (product: Product) => void;
}

const ProductList
    = memo(function ProductList({ products, addToCart }: ProductListProps) {
        console.log("ProductList render");
    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} VNĐ
                        <button onClick={() => addToCart(product)}>Thêm vào giỏ</button>
                    </li>
                ))}
            </ul>
        </div>
    )
})
export type {Product};
export default ProductList;

export interface ProductFilter {
    category?: string;
    price?: number;
    brand?: string;
    sort?: "price-asc" | "price-desc" | "createdAt-asc" | "createdAt-desc";
    page?: number;
    limit?: number;
}
export interface Product {
    _id: string;
    name: string;
    description: string;
    images: {
        public_id: string;
        url: string;
    }[];
    category: string;
    brand: string;
    price: number;
    rating: number;
    numReviews: number;
    stock: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

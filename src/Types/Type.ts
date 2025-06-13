// Định nghĩa kiểu dữ liệu cho Image
export interface Image {
    id: number;
    url: string;
    publicId: string;
  }
  
  // Định nghĩa kiểu dữ liệu cho ProductImage
  export interface ProductImage {
    id: number;
    image: Image;
  }
  
  // Định nghĩa kiểu dữ liệu cho Product
  export interface Product {
    id: number;
    title: string;
    category: string;
    body: string | null;
    status: string | null;
    provider: string | null;
    author: string | null;
    publisher: string | null;
    yearPublic: number;
    language: string | null;
    weight: string | null;
    other: string | null;
    discount: number;
    quantity: number;
    rating: number;
    price: number;
    sold: number;
    productImages: ProductImage[];
  }
  export interface CartItem {
    user: { id: number };
    product: { id: number };
    quantity: number;
  }
  
  export interface CartItemDTO {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
  }
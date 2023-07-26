export interface ICategory {
  id?: string;
  brand: string;
  description: string;
  images: string[];
  price: number;
  SellerId: string;
  uid?:string,
  rating: number;
  stock: number;
  title: string;
  thumbnail: string;
  color?:string;
}

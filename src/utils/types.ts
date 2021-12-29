export type CartRequestType = {
  userId: number;
  productId: number;
  productCount: number;
};

export type ResponseType = {
  success: boolean;
  message: string;
};

export type ProductReqType = {
  name: string;
  description: string;
  price: number;
  count: number;
};

export type UserReqType = {
  name: string;
  email: string;
  address: string;
};

export type UpdateOneUserReqType = {
  userId: number;
  email: string;
  address: string;
};

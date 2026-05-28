export interface ProductCategory {
    id: number,
    name: string
}

export interface ProductInterface {
     id: number,
      value: string,
      name: string,
      description: string,
      photo: string,
      height: string,
      width: string,
      weight: string,
      averageRating: number,
      views: number,
      ratingCount: number,
      categoryId: number,
      category: ProductCategory,
      createdAt: string,
      updatedAt: string,
      deletedAt: string
    }

export interface ProductHttpRequest {
    pagination: Pagination;
    filters?: Filters;
    sort?: Sort;
}

export interface Pagination {
    page: number;
    perPage: number;
}

export interface Filters {
    from?: string;
    to?: string;
    categoryIds?: number[];
    searchText?: string;
    minValue?: number;
    maxValue?: number;
}

export interface Sort {
    averageRating?: "ASC" | "DESC";
}

export interface ProductCommentsHttpRequest {
    productId: number;
    pagination: Pagination;
}

export interface CommentUserAvatar {
    url: string;
}

export interface CommentUserRating {
    value: number;
}

export interface CommentUser {
    id: number;
    name: string;
    email: string;
    avatar: CommentUserAvatar;
    rating: CommentUserRating;
}

export interface ProductComment {
    id: number;
    content: string;
    productId: number;
    userId: string;
    createdAt: string;
    user: CommentUser;
}

export interface ProductCommentsResponse {
    data: ProductComment[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

export interface ProductUserCommentResponse {
    comment: string | null;
    rating: string | null;
}
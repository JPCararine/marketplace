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
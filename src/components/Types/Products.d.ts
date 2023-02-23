export interface ProductsType {
  products: {
      id: number,
      title: string,
      image: string,
      price: number,
      rating: {
          rate: number,
          count: number
      },
      description: string,
      category: string,
      map: Function
  }
}


export interface ProductByCategoryType {
  productByCategory: {
      id: number,
      title: string,
      image: string,
      price: number,
      rating: {
          rate: number,
          count: number
      },
      description: string,
      category: string,
      map: Function
  }
}
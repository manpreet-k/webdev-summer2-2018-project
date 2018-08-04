

export class ProductsServiceClient {
  URL = 'https://api.otreeba.com/v1/products?count=50';
  findAllProducts() {
    return fetch(this.URL)
      .then(response => response.json());
  }

}

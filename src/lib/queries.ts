export const getProductsQuery = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        description
        
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`;

export const cartCreateMutation = `
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
`;

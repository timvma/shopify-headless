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

export const getProductByHandle = `
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    title
    description
    id
    variants(first: 250) {
      nodes {
        id
        availableForSale
        sku
        quantityAvailable
        selectedOptions {
          name
          value
        }
        title
        unitPrice {
          amount
          currencyCode
        }
        image {
          url
          height
          altText
        }
        price {
          amount
          currencyCode
        }
        product {
          handle
        }
        currentlyNotInStock
        quantityRule {
          increment
          maximum
          minimum
        }
      }
    }
    media(first: 250) {
      nodes {
        mediaContentType
        alt
        ... on MediaImage {
          id
          alt
          image {
            height
            url
            width
          }
        }
        ... on Video {
          id
          mediaContentType
          alt
          sources {
            format
            height
            mimeType
            url
            width
          }
          previewImage {
            altText
            height
            url
          }
        }
        ... on Model3d {
          id
          alt
          mediaContentType
          sources {
            filesize
            format
            mimeType
            url
          }
        }
      }
    }
    vendor
  }
}`;

// CART ===== START

export const getCartQuery = `
query getCart($id: ID!) {
  cart(id: $id) {
    id
    lines(first: 250) {
      nodes {
        quantity
        merchandise {
          ... on ProductVariant {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
            quantityAvailable
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
            image {
              url
              height
              altText
            }
            product {
              handle
              title
              tags
              vendor
            }
          }
        }
        cost {
          amountPerQuantity {
            amount
            currencyCode
          }
          compareAtAmountPerQuantity {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        id
        ... on CartLine {
          id
          quantity
        }
      }
    }
    note
    totalQuantity
    updatedAt
  }
}`;

export const createCartInit = `
mutation {
  cartCreate {
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

export const cartLinesAdd = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines (first: 100){
        nodes {
          quantity
        }
      }
      checkoutUrl
      updatedAt
    }
    userErrors {
      field
      message
    }
  }
}`;

export const cartLinesRemove = `
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      # Cart fields
    }
    userErrors {
      field
      message
    }
    warnings {
      # CartWarning fields
    }
  }
}
`;

export const cartLinesUpdate = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      # Cart fields
    }
    userErrors {
      field
      message
    }
    warnings {
      # CartWarning fields
    }
  }
}`;

// CART ===== END

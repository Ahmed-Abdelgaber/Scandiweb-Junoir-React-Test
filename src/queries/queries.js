import { gql } from 'apollo-boost';

const getCategories = gql`
    {
        categories {
            name
            products {
                id
                name
                inStock
                gallery
                category
                attributes {
                    name
                    type
                    items {
                        displayValue
                        value
                    }
                }
                prices {
                    currency {
                        symbol
                        label
                    }
                    amount
                }
            }
        }
    }
`;

const firstTimeItems = gql`
    {
        category {
            name
            products {
                id
                name
                inStock
                gallery
                category
                attributes {
                    name
                    type
                    items {
                        displayValue
                        value
                    }
                }
                prices {
                    currency {
                        symbol
                        label
                    }
                    amount
                }
            }
        }
    }
`;

const getCurrencies = gql`
    {
        currencies {
            label
            symbol
        }
    }
`;

const getProduct = gql`
    query product($id: String!) {
        product(id: $id) {
            id
            name
            gallery
            description
            attributes {
                name
                type
                items {
                    displayValue
                    value
                }
            }
            prices {
                currency {
                    symbol
                    label
                }
                amount
            }
        }
    }
`;
export { getCategories, firstTimeItems, getCurrencies, getProduct };

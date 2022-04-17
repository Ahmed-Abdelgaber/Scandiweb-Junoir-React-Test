import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPrice } from '../../Helpers/Helpers';
import Attribute from '../Attribute/Attribute';
import { cartActions } from '../../store/cartSlice';
import './ProductDetails.css';

let attributes = [];

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            buttonText: 'ADD TO CART'
        }
    }

    addToCartHandler() {
        const product = this.props.product;
        const price = getPrice(product, this.props.curr);

        const productId = `${product.id}-${attributes.map((el) => {
            return `${el.name}${el.value}`
        })
            }`

        this.props.addToCart({
            id: productId,
            name: product.name,
            price: {
                amount: price.amount,
                symbol: price.currency.symbol,
                label: price.currency.label
            },
            attributes,
            img: product.gallery[0]
        });

        attributes = []

        this.setState({ buttonText: 'DONE  ❤️' })

        setTimeout(() => {
            this.setState({ buttonText: 'ADD TO CART' })
        }, 1000)
    }

    addAttributesHandler(attribute) {
        let existingAttribute = attributes.find((el) => el.name === attribute.name)
        if (existingAttribute) {
            existingAttribute.value = attribute.value
        } else {
            attributes.push(attribute)
        }
    }

    render() {
        const product = this.props.product;

        const price = getPrice(product, this.props.curr);

        return (
            <div className="product-body__details">
                <h3 className="product-body__details-name">
                    <span>{product.name.split(' ')[0]}</span>
                    {product.name.split(' ').slice(1).join(' ')}
                </h3>
                {product.attributes.map((attribute) => {
                    return (
                        <Attribute
                            key={attribute.name}
                            sizes={attribute.items}
                            name={attribute.name}
                            type={attribute.type}
                            onClick={this.addAttributesHandler}
                        />
                    );
                })}
                <p className="product-body__details-price">
                    <span>Price:</span>
                    <span>
                        {price.currency.symbol} {price.amount}
                    </span>
                </p>
                <button
                    className="product-body__details-add"
                    onClick={this.addToCartHandler.bind(this)}
                >
                    {this.state.buttonText}
                </button>
                <div
                    className="product-body__details-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) =>
            dispatch(
                cartActions.updateCart(product)
            ),
    };
};

const mapStateToProps = (state) => {
    return {
        curr: state.items.curr,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

import React, { Component, Fragment } from 'react';
import { getParamByIndex } from '../Helpers/Helpers';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { getProduct } from '../queries/queries';
import Gallery from '../components/Gallery/Gallery';
import ProductDetails from '../components/ProductDetails/ProductDetails';

import './Product.css';

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

class Product extends Component {
    renderProduct() {
        const data = this.props.data;
        if (!data.loading) {
            return (
                <Fragment>
                    <Gallery imgs={data.product.gallery} />
                    <ProductDetails product={data.product} />
                </Fragment>
            );
        }
    }
    render() {
        const id = getParamByIndex(1);
        return <div className="product-body">{this.renderProduct()}</div>;
    }
}

// export default Product;

export default compose(
    graphql(getProduct, {
        options: (props) => {
            const id = getParamByIndex(1);
            return {
                variables: {
                    id,
                },
            };
        },
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Product);

import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsActions } from '../../store/itemsSlice';
import { firstTimeItems } from '../../queries/queries';
import { getPrice } from '../../Helpers/Helpers';
import './Items.css';
import Card from '../Card/Card';

class Items extends Component {
    renderItems(items) {
        return items.map((item) => {
            let price = getPrice(item, this.props.curr);
            return (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    img={item.gallery[0]}
                    price={price.amount}
                    curr={price.currency.symbol}
                    inStock={item.inStock}
                    attributes={item.attributes}
                />
            );
        });
    }

    displayItems() {
        let data = this.props.data;
        if (!this.props.items || this.props.items.length === 0) {
            if (!data.loading) {
                this.props.updateItems(data.category.products, 'All');
            }
        } else {
            return this.renderItems(this.props.items);
        }
    }

    render() {
        return (
            <Fragment>
                <h2 className="items-header">{this.props.cat}</h2>
                <div className="items">{this.displayItems()}</div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItems: (items, cat, curr) =>
            dispatch(
                itemsActions.updateItems({
                    items,
                    cat,
                })
            ),
    };
};

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        cat: state.items.cat,
        curr: state.items.curr,
    };
};

export default compose(
    graphql(firstTimeItems),
    connect(mapStateToProps, mapDispatchToProps)
)(Items);

// export default connect(mapStateToProps, mapDispatchToProps)(Items);

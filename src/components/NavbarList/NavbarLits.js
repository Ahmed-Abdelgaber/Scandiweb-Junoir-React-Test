import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../queries/queries';
import { itemsActions } from '../../store/itemsSlice';
import { capitalizeFirstLetter, getAllSiblings } from '../../Helpers/Helpers';
import './NavbarList.css';

class NavbarList extends Component {
    constructor() {
        super();
        this.state = {
            selectedCategory: null,
            selectedItems: [],
        };
    }

    filterItems(category) {
        let data = this.props.data;
        return data.categories.filter((el) => {
            return capitalizeFirstLetter(el.name) === category;
        })[0].products;
    }

    chooseCategoryHandler(event) {
        // const siblings = getAllSiblings(event.target);
        // console.log(siblings);
        // siblings.map((el) => el.classList.remove('nav-list__clicked'));
        // event.target.classList.add('nav-list__clicked');
        const selectedItems = this.filterItems(event.target.innerHTML);
        this.setState({
            selectedCategory: event.target.innerHTML,
            selectedItems,
        });

        this.props.updateItems(selectedItems, event.target.innerHTML);
    }

    displayCategories() {
        let data = this.props.data;
        if (!data.loading) {
            return (
                <div className="nav-list">
                    <ul className="nav-list__body">
                        {data.categories.map((category, i) => {
                            return (
                                <NavLink
                                    className={(navData) =>
                                        navData.isActive
                                            ? 'nav-list__clicked'
                                            : ''
                                    }
                                    to={'/home/' + category.name}
                                    key={`c-${i}`}
                                >
                                    <li
                                        className={`nav-list__item`}
                                        onClick={this.chooseCategoryHandler.bind(
                                            this
                                        )}
                                    >
                                        {capitalizeFirstLetter(category.name)}
                                    </li>
                                </NavLink>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }

    render() {
        return this.displayCategories();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItems: (items, cat) =>
            dispatch(
                itemsActions.updateItems({
                    items,
                    cat,
                })
            ),
    };
};

const mapStateToProps = (state) => {
    return {};
};

export default compose(
    graphql(getCategories),
    connect(mapStateToProps, mapDispatchToProps)
)(NavbarList);

import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { itemsActions } from '../../store/itemsSlice';
import { getCurrencies } from '../../queries/queries';
import './NavbarDropdown.css';

class NavbarDropdown extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            showDropDown: false,
        };
    }

    dropDownHandler() {
        this.setState((curState) => {
            return {
                isOpen: !curState.isOpen,
                showDropDown: !curState.showDropDown,
            };
        });
    }

    changeCurrencyHandler(event) {
        this.setState((curState) => {
            return {
                isOpen: false,
                showDropDown: false,
            };
        });

        const currency = `${event.target.getAttribute('id')}`.split('-')
        this.props.updateCurrency(currency[0], currency[1]);
    }

    renderCurrencies() {
        let data = this.props.data;
        if (!data.loading) {
            return data.currencies.map((el) => {
                return (
                    <div
                        onClick={this.changeCurrencyHandler.bind(this)}
                        key={el.label}
                        id={`${el.label}-${el.symbol}`}
                    >
                        {`${el.symbol}  ${el.label}`}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="dropdown">
                <label
                    htmlFor="clickevent"
                    className={`dropdown-header ${this.state.isOpen
                        ? 'dropdown-header__down'
                        : 'dropdown-header__up'
                        }`}
                    onClick={this.dropDownHandler.bind(this)}
                >
                    {this.props.curr}
                </label>
                <input
                    type="checkbox"
                    className="dropdown-clickevent"
                    id="clickevent"
                />
                <div
                    className={`dropdown-body ${this.state.showDropDown && 'dropdown-body__display'
                        }`}
                >
                    {this.renderCurrencies()}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrency: (curr, symbol) =>
            dispatch(
                itemsActions.updateCurrency({
                    curr,
                    symbol
                })
            ),
    };
};

const mapStateToProps = (state) => {
    return {
        curr: state.items.symbol
    };
};

export default compose(
    graphql(getCurrencies),
    connect(mapStateToProps, mapDispatchToProps)
)(NavbarDropdown);

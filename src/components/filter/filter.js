import React    from 'react';
import CustomSelect from "../custom-select/custom-select";

import './filter.css';


export default class Filter extends React.Component {

  
    render() {
        return (
            <div className="container filter" >
                <div className="container">
                    <div className="row filter__row-header">
                        <div className="col">
                            <span>Фильтр</span>
                        </div>
                    </div>

                    <div className="row filter__row-price">
                        <div className="col">
                            <span>Цена:</span>
                        </div>
                    </div>

                    <div className="row filter__row-inputs">
                        <div className="col-6">
                            <input onChange={this.props.setPriceFrom} defaultValue={this.props.priceFrom} type="number" placeholder="От" className="price-input" pattern="\d*"/>
                        </div>
                        <div className="col-6">
                            <input onChange={this.props.setPriceTo} defaultValue={this.props.priceTo} type="number" placeholder="До" className="price-input" pattern="\d*"/>
                        </div>
                    </div>

                    {

                        this.props.bigFilter &&
                        <div>
                            <div className="row filter__row-sort">
                                <div className="col-6">
                                    <span>Радиус:</span>
                                </div>
                                <div className="col-6">
                                    <span>Сортировать по:</span>
                                </div>
                            </div>

                            <div className="row filter__row-select">
                                <div className="col-6">
                                   <CustomSelect
                                       select               = {this.props.searchFilterRadius}
                                       callbackUpdateSelect = {this.props.setSearchFilterRadius}
                                       disabled             = {this.props.disabled}
                                       setCoordinates       = {this.props.setCoordinates}
                                   />
                                </div>
                                <div className="col-6">
                                    <CustomSelect
                                        select               = {this.props.disabled ? this.props.searchFilterSortType2 : this.props.searchFilterSortType}
                                        callbackUpdateSelect = {this.props.disabled ? this.props.setSearchFilterSortType2 : this.props.setSearchFilterSortType}
                                    />
                                </div>
                            </div>
                        </div>

                    }

                </div>
            </div>
        );
    }
}
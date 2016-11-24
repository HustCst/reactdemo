import React from 'react';
import ReactDom from 'react-dom';


var SearchBar = React.createClass({
    onHandleFilter: function () {
        this.props.filterTextShow(this.refs.inp.value);
    },
    render: function () {
        return (
            <div>
                <input type="text" onChange={this.onHandleFilter} ref='inp'/>
                <br/>
                <span>only show stocked</span>
                <input type="checkbox" onClick={this.props.changeShow}/>
            </div>
        )
    }
});
var ProductCategoryRow = React.createClass({
    render: function () {
        return (
            <tr>
                <th>{this.props.category}</th>
            </tr>
        )
    }
})
var ProductRow = React.createClass({
    render: function () {
        var styles = {};
        if (this.props.stocked) {
            styles.color = 'black';
        }else {
            styles.color = 'red';
        }
        return (
            <tr style={styles}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
    
})
var ProductTable = React.createClass({
    render: function () {
        var products = this.props.products;
        var row = [];
        var last = null;
        var onlyShowStocked = this.props.onlyShowStocked;
        var filterText = this.props.filterText;
        console.log(onlyShowStocked)
        products.forEach(function (ele, index) {
            if (last !== ele.category) {
                last = ele.category;
                row.push(<ProductCategoryRow key={index + 100} category={ele.category}></ProductCategoryRow>)
            }
            // 只显示有存货的 我们需判断以下 那些没有存货 那么这些我们就不加 ，反之酒家
            console.log(onlyShowStocked);
            if ( !(onlyShowStocked && !ele.stocked) ) {
                if (ele.name.indexOf(filterText) !== -1) {
                    row.push(<ProductRow key={index} stocked={ele.stocked} name={ele.name} price={ele.price}></ProductRow>);
                }
            }
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [row]
                    }
                </tbody>
            </table>
        )
    }
});
var App = React.createClass({
    getInitialState: function() {
        return {
            show: false,
            filterText: '',
        }
    },
    changeShow: function () {
        this.setState({
            show: !this.state.show
        })
    },  
    filterTextShow: function (filterText) {
        this.setState({
            filterText: filterText
        })
    },
    render:function () {
        return (
            <div>
                <SearchBar filterTextShow={this.filterTextShow} changeShow={this.changeShow}></SearchBar>
                <ProductTable products={this.props.products} onlyShowStocked={this.state.show} filterText={this.state.filterText}></ProductTable>
            </div>
        )
    }
})


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},
];

ReactDom.render(
    <App products={PRODUCTS}></App>,
    document.getElementById('root')
)
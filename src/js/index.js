import React from 'react';
import ReactDom from 'react-dom';


var SearchBar = React.createClass({
    render: function () {
        return (
            <div>
                <input type="text"/>
                <br/>
                <span>only show stocked</span>
                <input type="checkbox"/>
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
        return (
            <tr>
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
        console.log(products)
        products.forEach(function (ele, index) {
            if (last !== ele.category) {
                last = ele.category;
                row.push(<ProductCategoryRow key={index + 100} category={ele.category}></ProductCategoryRow>)
            }
            row.push(<ProductRow key={index} name={ele.name} price={ele.price}></ProductRow>)

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
    render:function () {
        return (
            <div>
                <SearchBar></SearchBar>
                <ProductTable products={this.props.products}></ProductTable>
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
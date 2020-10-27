angular.module('myApp', ['ngAnimate']);

angular.module('myApp')
.controller('myController', function ($scope) {
  
  $scope.inventory = [
    { id :  1, category : "water bottle", description : "small water bottle",   price :   2.99, qty : 1 },
    { id :  2, category : "water bottle", description : "large water bottle",   price :   2.99, qty : 1, onSale : true },
    { id :  3, category : "flashlight",   description : "small flashlight",     price :   6.99, qty : 1 },
    { id :  4, category : "flashlight",   description : "big flashlight",       price :  12.99, qty : 1 },
    { id :  5, category : "stove",        description : "small stove",          price :  29.99, qty : 1 },
    { id :  6, category : "stove",        description : "big stove",            price :  29.99, qty : 1 },
    { id :  7, category : "sleeping bag", description : "simple sleeping bag",  price :  49.99, qty : 1 },
    { id :  8, category : "sleeping bag", description : "deluxe sleeping bag",  price :  79.99, qty : 1 },
    { id :  9, category : "tent",         description : "1-person tent",        price : 119.99, qty : 1 },
    { id : 10, category : "tent",         description : "2-person tent",        price : 169.99, qty : 1 },
    { id : 11, category : "tent",         description : "3-person tent",        price : 249.99, qty : 1 },
    { id : 12, category : "tent",         description : "4-person tent",        price : 319.99, qty : 1 }
  ];
  
  $scope.cart = [];
  
  var findItemById = function(items, id) {
    return _.find(items, function(item) {
      return item.id === id;
    });
  };
  
  $scope.getCost = function(item) {
    return item.qty * item.price;
  };

  $scope.addItem = function(itemToAdd) {
    var found = findItemById($scope.cart, itemToAdd.id);
    if (found) {
      found.qty += itemToAdd.qty;
    }
    else {
      $scope.cart.push(angular.copy(itemToAdd));}
  };
  
  $scope.getTotal = function() {
    var total =  _.reduce($scope.cart, function(sum, item) {
      return sum + $scope.getCost(item);
    }, 0);
    console.log('total: ' + total);
    return total;
  };
  
  $scope.clearCart = function() {
    $scope.cart.length = 0;
  };
  
  $scope.removeItem = function(item) {
    var index = $scope.cart.indexOf(item);
    $scope.cart.splice(index, 1);
  };
  
});

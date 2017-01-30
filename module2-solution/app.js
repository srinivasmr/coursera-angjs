(function(){

  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var buyCtrl = this;
    buyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
    buyCtrl.moveToBoughtList = function(index){
      ShoppingListCheckOffService.moveToBoughtList(index);
    }
  }

  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtCtrl = this;
    boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService(){

    var service = this;

    var buyItems = [{
      name:"apples",
      qty:"10"
    },
    {
      name:"oranges",
      qty:"6"
    },
    {
      name:"bananas",
      qty:"12"
    },
    {
      name:"pineapples",
      qty:"2"
    },
    {
      name:"pears",
      qty:"6"
    }];

    var boughtItems = [];

    service.getItemsToBuy = function(){
        return buyItems;
    }

    service.moveToBoughtList = function(index){

      console.log("item at index " + buyItems[index].name +", " +buyItems[index].qty);
      //var name = buyItems[index].name;
      //var qty = buyItems[index].qty;
      var item = {name:buyItems[index].name, qty: buyItems[index].qty};
      boughtItems.push(item);

      buyItems.splice(index, 1);
    }


    service.getBoughtItems = function(){
      return boughtItems;
    }
    }

})();

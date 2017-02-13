(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems);

  NarrowItDownController.$inject=['MenuSearchService'];
  MenuSearchService.$inject=['$http'];

  function FoundItems(){
    var ddo = {
      restrict:'E',
      templateUrl: 'listMenu.html',
      scope:{
        list: '<found',
        title: '@title',
        onRemove: '&'

      }

    };
    return ddo;
  }


  function NarrowItDownController(MenuSearchService){
    var menu = this;
    var searchTerm = null;
    var message = "";
    var title=" menu items found";

    menu.narrowItDown = function(){
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function(response){
        menu.items = response;
        if(menu.items.length == 0){
          menu.message = "Nothing found";
          menu.title='';
        }else{
          menu.message = "";
          menu.title=menu.items.length + title;
        }
      })
      .catch(function(error){
        console.log(error);

      });

    }

    menu.removeItem = function(index){
      console.log(index);
      menu.items.splice(index, 1);
        menu.title=menu.items.length + title;
    }
  }

  function MenuSearchService($http){

    var service = this;
    service.getMatchedMenuItems = function(searchTerm){

    return $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
          })
          .then(function(response){
            var foundItems = [];
            if(searchTerm == null || searchTerm == ''){
              return foundItems;
            }else{
              for(var i=0;i<response.data.menu_items.length;i++){
                if(response.data.menu_items[i].description.indexOf(searchTerm) != -1){
                  foundItems.push(response.data.menu_items[i]);
                }
              }
              return foundItems;
            }

        });
      }


  }

})();


(function(){
'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject=['$scope'];

  function LunchCheckController($scope){

    $scope.dishes = "";
    $scope.message = "";
    $scope.checkQty = function(){
      if($scope.dishes == ""){
        $scope.message  = "Please enter data first";
      }else{
        var qty = getQty($scope.dishes);
        $scope.message  = qty>3?"Too much!":"Enjoy!";
      }
    }
  }

  function getQty(string){
    var arr = string.split(",");
    console.log(arr.length);
    return arr.length;
  }


})();

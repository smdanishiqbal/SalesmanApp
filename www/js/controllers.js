angular.module('starter.controllers', ['firebase'])

  .constant("myfirebaseAddress","https://salesmenapp15.firebaseio.com/salesmens")

  .controller('DashCtrl', function($scope,myfirebaseAddress,$location) {

    var ref = new Firebase(myfirebaseAddress);

    $scope.user = {
      password : "",
      email : ""
    };
    $scope.upass = "";
    var vm = this;
    $scope.login=function() {
      console.log($scope.user);
      ref.authWithPassword($scope.user, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.$apply(function() { $location.path("/account"); });
        }
      });
    }



  })

.controller('SignUpCtrl', function($scope,myfirebaseAddress,$location) {
    var ref = new Firebase(myfirebaseAddress);
    var vm = this;
    $scope.Array=[];




    //Button for SignUP User
$scope.submit=function()
{


  ref.createUser({
    "email": $scope.email,
    password: $scope.pass
  }, function(error, userData) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
          console.log("The new user account cannot be created because the email is already in use.");
          break;
        case "INVALID_EMAIL":
          console.log("The specified email is not a valid email.");
          break;
        default:
          console.log("Error creating user:", error);
      }
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      $scope.$apply(function() { $location.path("/dash"); });

    }
  });

};





})

.controller('ChatDetailCtrl', function($scope,myfirebaseAddress,$location,$timeout,$http) {
    var ref = new Firebase(myfirebaseAddress);
    $scope.messagesArray=[];

    ref.on("child_added", function(dataSnapshot){
      console.log(dataSnapshot.val());
      $timeout(function(){
       $scope.messagesArray.push(dataSnapshot.val());

      },0);
    });
var data = "";
//$scope.detail = function() {
//
//  var ref= new Firebase("https://salesmenapp15.firebaseio.com/salesmenapp15/salesmens")
//  .startAt('abc')
//    .endAt('abc')
//    .once('value', function(snap) {
//      $scope.data= snap.val();
//      console.log('accounts matching email address',  snap.val())
//    })
//};

    //$scope.saveData = function(){
    //  //action="/account" method="post"
    //
    //  $scope.user = {};
    //  $http.post("/SalesMenDetail",  $scope.user)
    //    .success(function(config){
    //      console.log(config);
    //      console.log("Saved successfully");
    //     console.log($scope.user.email);
    //    })
    //    .error(function(){
    //      console.log("Error in saving");
    //    });
    //};




  })


  .controller('detailsCtrl', function($scope,myfirebaseAddress,$location,$timeout,$http) {
    var ref = new Firebase(myfirebaseAddress);
    $scope.messagesArray=[];




  })

.controller('AccountCtrl', function($scope,myfirebaseAddress,$location, $http) {
    var ref = new Firebase(myfirebaseAddress);
    var vm = this;
    $scope.userData = {};

    $scope.saveData = function(){
      //action="/account" method="post"


        $http.post("/account",  $scope.userData)
          .success(function(config){
            console.log(config);
            console.log("Saved successfully");
            ref.push({Email:$scope.userData.email,Password:$scope.userData.pass,salesMen:$scope.userData.userName,Company:$scope.userData.Company,phone:$scope.userData.Phone});
            ref.createUser({
              "email": $scope.userData.email,
              password: $scope.userData.pass
            }, function(error, userData) {
              if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                  case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                  default:
                    console.log("Error creating user:", error);
                }
              } else {
                console.log("Successfully created user account with uid:", userData.uid);
                //$scope.$apply(function() { $location.path("/dash"); });

              }
            });
          })
          .error(function(){
              console.log("Error in saving");
          });
    };



  });

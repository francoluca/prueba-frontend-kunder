// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
      var app = angular.module('starter', ['ionic', 'angular-md5', 'angularMoment']);

      app.controller('MarvelController', function($scope,$http,md5){
          $scope.comics = [];
          var publicKey = 'eda41fddfede76ce5e93da44207bb312';
          var privateKey = '86cb34221752d5df1c0a70554c619d29d492e417';
          var ts = Date.now();

          var hash = md5.createHash(ts+privateKey+publicKey);
          var baseUrl = 'https://gateway.marvel.com/v1/';
          
          //Se conecta por medio de GET a la API Marvel, es necesario timestamp, apikey y hash, para obtener permisos.
          $http.get(baseUrl + 'public/comics', {
              params: {
                ts: ts,
                apikey: publicKey,
                hash: hash,
                limit: 100
              }
            }).success(function(comics){
              
              /*Se leen los datos desde API Marvel y se extrae id,title,thumbnail,year de cada comic
              luego se guardan en un arreglo. */
              angular.forEach(comics.data.results, function(comic){
                  $scope.comics.push(
                    {
                      "id": comic.id,
                      "title": comic.title,
                      "thumbnail": comic.thumbnail.path+'.'+comic.thumbnail.extension,
                      "year": moment(comic.dates[0].date).format("YYYY"),
                      "description": comic.description
                    });
              })

          });
      });

      

    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
}());
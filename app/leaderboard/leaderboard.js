angular.module('MyApp')
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    'use strict';
    $urlRouterProvider
      .when('', '/leaderboard')
      .when('/', '/leaderboard');
    $stateProvider
      .state('leaderboard', {
        url: '/leaderboard',
        template: '<div sp-leaderboard></div>'
      })
      .state('player', {
        url: '/player?id',
        template: 'TODO, if really, really keen :)'
      });
  }])
  .factory('leaderboard', function ($resource) {
    'use strict';
    return $resource('/assets/data/leaderboard.json');
  })
  .factory('player', function ($resource) {
    'use strict';
    return $resource('/assets/data/player/:id.json');
  })
  .service('leaderboardService', ['$timeout', '$q', 'leaderboard', 'player', function ($timeout, $q, leaderboard, player) {
    'use strict';
    this.fetchGreeting = function () {
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve('Hello World!');
      }, 1000);
      return deferred.promise;
    };
    this.fetchLeaderboard = function () {
      return leaderboard.query().$promise;
    };
    this.fetchPlayer = function (playerId) {
      return player.get({id: playerId}).$promise;
    };
    this.fetchNiceLeaderboard = function () {
      //TODO - replace this with code that produces the same result by combining fetchLeaderboard and fetchPlayer methods
      return $q.when([
        {id: 7, name: 'Erin'},
        {id: 3, name: 'Bob'},
        {id: 1, name: 'Alice'},
        {id: 4, name: 'Carol'},
        {id: 5, name: 'Dan'}
      ]);
    };
  }])
  .directive('spLeaderboard', ['leaderboardService', function (leaderboardService) {
    'use strict';
    return {
      link: function (scope) {
        leaderboardService.fetchGreeting()
          .then(function (greeting) {
            scope.greeting = greeting;
          });
        leaderboardService.fetchLeaderboard()
          .then(function (leaderboard) {
            scope.leaderboard = leaderboard;
          });
        leaderboardService.fetchPlayer(1)
          .then(function (player) {
            scope.player = player;
          });
        leaderboardService.fetchNiceLeaderboard()
          .then(function (niceLeaderboard) {
            scope.niceLeaderboard = niceLeaderboard;
          });
      },
      templateUrl: 'leaderboard/leaderboard.html'
    };
  }]);

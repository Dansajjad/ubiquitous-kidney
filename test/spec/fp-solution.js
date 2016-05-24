this.fetchNiceLeaderboard = function () {
  return this.fetchLeaderboard()
    .then(function (players) {
      return players.map(function (player) {
        return self.fetchPlayer(player.id);
      });
    })
    .then($q.all);
};

pick = function (propertyName) {
  return function (object) {
    return object[propertyName];
  };
};

Function.prototype.log = function () {
  var fn = this, args;
  args = Array.prototype.slice.call(arguments);
  return function () {
    console.log.apply(console, args.concat(Array.prototype.slice.call(arguments)));
    return fn.apply(undefined, arguments);
  };
};

Function.prototype.cache = function () {
  var fn = this, results = {};
  return function () {
    var key = Array.prototype.slice.call(arguments).join('-');
    return results.hasOwnProperty(key) ? results[key] : (results[key] = fn.apply(undefined, Array.prototype.slice.call(arguments)));
  };
};

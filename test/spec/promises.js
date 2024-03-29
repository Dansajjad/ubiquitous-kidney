var __ = jasmine.createSpy('replace me with successCallback, failureCallback (or sometimes finallyCallback)'),
  ___ = 'replace me with the value that will make the test pass';
describe('Another warmup', function () {
  'use strict';
  it('should make it pass', function () {
    expect(2 + 3).toBe(___);
  });
});
describe('Deferred', function () {
  'use strict';
  var $rootScope, deferred, successCallback, failureCallback, finallyCallback;
  beforeEach(module('MyApp'));

  beforeEach(function () {
    successCallback = jasmine.createSpy('successCallback');
    failureCallback = jasmine.createSpy('failureCallback');
    finallyCallback = jasmine.createSpy('finallyCallback');
    inject(function ($q, _$rootScope_) {
      $rootScope = _$rootScope_;
      deferred = $q.defer();
    });
  });
  it('should understand the toHaveBeenCalledWith matcher', function () {
    successCallback('Here is the result');

    expect(__).toHaveBeenCalledWith(___);
    // expect(successCallback).toHaveBeenCalledWith('Here is the result');
    expect(__).not.toHaveBeenCalled();
    // expect(failureCallback).not.toHaveBeenCalled();
  });
  it('should understand why one should not write tests like this (put the expectation inside then)', function () {
    deferred.promise.then(function (result) {
      expect(result).toBe('Why is this not failing???');
    });

    deferred.resolve('Result');
    //$rootScope.$digest();
  });
  it('should invoke success callback when resolved', function () {
    deferred.promise.then(successCallback, failureCallback);

    deferred.resolve('Result');
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });
  it('should invoke success callback even if already resolved before callback was registered', function () {
    deferred.resolve('Result');

    deferred.promise.then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });
  it('should invoke failure callback when rejected', function () {
    deferred.promise.then(successCallback, failureCallback);

    deferred.reject('Reason');
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });
  it('should invoke failure callback even if already rejected before callback was registered', function () {
    deferred.promise.then(successCallback, failureCallback);

    deferred.reject('Reason');
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });
  it('should invoke finally callback when resolved', function () {
    deferred.promise.finally(finallyCallback);
    deferred.resolve('Reason');
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith();
    expect(__).not.toHaveBeenCalled();
    expect(__).not.toHaveBeenCalled();
  });
  it('should invoke finally callback when rejected', function () {
    deferred.promise.finally(finallyCallback);
    deferred.reject('Reason');
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith();
    expect(__).not.toHaveBeenCalled();
    expect(__).not.toHaveBeenCalled();
  });
});
describe('Chaining promises', function () {
  'use strict';
  var $q, $rootScope, successCallback, failureCallback, successAsyncAction, failAsyncAction;
  beforeEach(module('MyApp'));
  beforeEach(function () {
    successCallback = jasmine.createSpy('successCallback');
    failureCallback = jasmine.createSpy('failureCallback');
    inject(function (_$q_, _$rootScope_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      successAsyncAction = function (result) {
        return $q.when(result);
      };
      failAsyncAction = function (reason) {
        return $q.reject(reason);
      };
    });
  });

  it('should understand $q.when', function () {
    successAsyncAction('Result').then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand $q.reject', function () {
    failAsyncAction('Reason').then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand chaining 1', function () {
    successAsyncAction('Result')
      .then(function (result) {
        return result + ' Little extra';
      })
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand chaining 2', function () {
    successAsyncAction('Result')
      .then(function (result) {
        return successAsyncAction(result + ' Little more');
      })
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand chaining 3', function () {
    successAsyncAction('Result')
      .then(function (result) {
        return failAsyncAction(result + ' Little more');
      })
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand chaining 4', function () {
    failAsyncAction('Reason')
      .then(angular.noop, function () {
      })
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(undefined);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand $q.all 1', function () {
    $q.all([successAsyncAction('Result 1'), successAsyncAction('Result 2'), successAsyncAction('Result 3')])
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand $q.all 2', function () {
    $q.all([successAsyncAction('Result 1'), failAsyncAction('Reason 2'), successAsyncAction('Result 3')])
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });

  it('should understand $q.all 3', function () {
    $q.all([1, 2, 3].map(successAsyncAction))
      .then(function (result) {
        return Math.max.apply(undefined, result);
      })
      .then(successCallback, failureCallback);
    $rootScope.$digest();

    expect(__).toHaveBeenCalledWith(___);
    expect(__).not.toHaveBeenCalled();
  });
});

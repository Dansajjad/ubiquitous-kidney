describe('Warmup', function () {
  'use strict';
  it('should understand expect', function () {
    var result, add = function (a, b) {
      return a + b;
    };

    result = add(1, 2);

    expect(result).toBe(3);
  });
  it('should understand createSpy', function () {
    var callback = jasmine.createSpy('callback');

    callback('Hello World');

    expect(callback).toHaveBeenCalledWith('Hello World');
  });
});

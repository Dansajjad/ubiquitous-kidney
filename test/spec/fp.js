describe('Functional programming', function () {
  'use strict';
  var __ = 'fill this in so that the test is passing';
  it('should understand higher-order functions (Array.prototype.map & Array.prototype.sort)', function () {
    var result = [{name: 'Third', age: 20}, {name: 'First', age: 10}, {name: 'Second', age: 15}]
      .sort(function (p1, p2) {
        return p1.age - p2.age;
      })
      .map(function (person) {
        return person.name;
      });

    expect(result).toBe(__);
  });
  it('should understand higher-order functions (pick)', function () {
    var pick, result;
    pick = function (propertyName) {
      //implement this so that the test is passing
    };

    result = [{name: 'Third', age: 20}, {name: 'First', age: 10}, {name: 'Second', age: 15}]
      .sort(function (p1, p2) {
        return p1.age - p2.age;
      })
      .map(pick('name'));

    expect(result).toBe(['First', 'Second', 'Third']);
  });
  it('should understand higher-order functions (log)', function () {
    var add;
    Function.prototype.log = function () {
      //implement this so that the test is passing
    };
    spyOn(console, 'log');
    add = function (a, b) {
      return a + b;
    }.log('Adder');

    expect(add(1, 2)).toBe(3);
    expect(console.log).toHaveBeenCalledWith('Adder', 1, 2);
  });
  it('should understand higher-order functions (cache)', function () {
    var add, cachedAdd;
    add = jasmine.createSpy('add').and.callFake(function (a, b) {
      return a + b;
    });
    Function.prototype.cache = function () {
      //implement this so that the test is passing
    };
    cachedAdd = add.cache();

    expect(cachedAdd(1, 2)).toBe(3);
    expect(cachedAdd(1, 2)).toBe(3);
    expect(cachedAdd(1, 2)).toBe(3);
    expect(add.calls.count()).toBe(1);
  });
});

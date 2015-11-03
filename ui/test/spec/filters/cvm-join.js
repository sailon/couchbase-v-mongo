'use strict';

describe('Filter: cvmJoin', function () {

  // load the filter's module
  beforeEach(module('uiApp'));

  // initialize a new instance of the filter before each test
  var cvmJoin;
  beforeEach(inject(function ($filter) {
    cvmJoin = $filter('cvmJoin');
  }));

  it('should return the input prefixed with "cvmJoin filter:"', function () {
    var text = 'angularjs';
    expect(cvmJoin(text)).toBe('cvmJoin filter: ' + text);
  });

});

'use strict';

describe('Filter: cvmDate', function () {

  // load the filter's module
  beforeEach(module('uiApp'));

  // initialize a new instance of the filter before each test
  var cvmDate;
  beforeEach(inject(function ($filter) {
    cvmDate = $filter('cvmDate');
  }));

  it('should return the input prefixed with "cvmDate filter:"', function () {
    var text = 'angularjs';
    expect(cvmDate(text)).toBe('cvmDate filter: ' + text);
  });

});

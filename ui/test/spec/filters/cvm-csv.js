'use strict';

describe('Filter: cvmCsv', function () {

  // load the filter's module
  beforeEach(module('uiApp'));

  // initialize a new instance of the filter before each test
  var cvmCsv;
  beforeEach(inject(function ($filter) {
    cvmCsv = $filter('cvmCsv');
  }));

  it('should return the input prefixed with "cvmCsv filter:"', function () {
    var text = 'angularjs';
    expect(cvmCsv(text)).toBe('cvmCsv filter: ' + text);
  });

});

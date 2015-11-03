'use strict';

describe('Filter: cvmCaps', function () {

  // load the filter's module
  beforeEach(module('uiApp'));

  // initialize a new instance of the filter before each test
  var cvmCaps;
  beforeEach(inject(function ($filter) {
    cvmCaps = $filter('cvmCaps');
  }));

  it('should return the input prefixed with "cvmCaps filter:"', function () {
    var text = 'angularjs';
    expect(cvmCaps(text)).toBe('cvmCaps filter: ' + text);
  });

});

'use strict';

describe('Service: postDao', function () {

  // load the service's module
  beforeEach(module('uiApp'));

  // instantiate service
  var postDao;
  beforeEach(inject(function (_postDao_) {
    postDao = _postDao_;
  }));

  it('should do something', function () {
    expect(!!postDao).toBe(true);
  });

});

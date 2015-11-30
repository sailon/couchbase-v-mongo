'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    apiUrl: 'http://couchbase.vagrant:3000/api'
  });

'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.offices = [
    	{
				name: 'Plano Office',
				address1: '5600 Tennyson Parkway, Ste 230',
				address2: 'Plano, TX 75024 ',
				phone: '(469) 424-3449',
				fax: '(303) 379-5944'
			},
			{
				name: 'Washington, DC Office',
				address1: '527 Maple Avenue East, Ste 200',
				address2: 'Vienna, VA 22180 ',
				phone: '(703) 635-3302',
				fax: '(845) 367-5496'
			},
			{
				name: 'Austin Office',
				address1: '1603 W 6th Street',
				address2: 'Austin, TX 78703 ',
				phone: '(469) 424-3449',
				fax: '(303) 379-5944'
			},
			{
				name: 'Chicago Office',
				address1: '30 W. Hubbard',
				address2: 'Suite 400Chicago, IL 60654',
				phone: '(312) 248-7501 ',
				fax: '(303) 379-5944'
			},
			{
				name: 'Boulder Office',
				address1: '1216 Pearl St. Unit 200',
				address2: 'Boulder, CO 80302 ',
				phone: '(720) 583-1713',
				fax: '(303) 379-5944'
			}
    ];
  });

(function() {
  'use strict';

  angular
    .module('birdland')
    .factory('birdData', birdData);

  /** @ngInject */
  function birdData($log, $http) {

    var apiHost = '../../assets/sample_data/reports.json';
    var getBirdsEndpoint = 'http://jeff-1234.mybluemix.net/api/v1/birds/reports'
    var saveReportEndpoint = ' http://jeff-1234.mybluemix.net/api/v1/birds/report';
    var helloEndpoint = 'http://jeff-1234.mybluemix.net/api/v1/birds/hello';

    var service = {
      apiHost: apiHost,
      getBirds: getBirds,
      getHello: getHello,
      saveReport: saveReport
    };

    return service;

    function getBirds() {
      
      //may want to be sure that the api uses the location data to query the database, so you aren't getting all the birds at once!

      return $http.get(getBirdsEndpoint)
        .then(getBirdsComplete)
        .catch(getBirdsFailed);

      function getBirdsComplete(response) {
        var birds = response.data.birds;

        for ( var i=0; i < birds.length; i++  ){
          birds[i].id = birds[i]._id;
          birds[i].coords = { latitude: birds[i].lat, longitude: birds[i].long }
          console.log('birds[i]: ', birds[i].coords);

        }

        return birds;
      }

      function getBirdsFailed(error) {
        $log.error('XHR Failed for getBirds.\n' + angular.toJson(error.data, true));
      }
    }

    function getHello() {
      return $http.get(helloEndpoint)
      .then(hiComplete)
      .catch(hiFailed);

      function hiComplete(response){
        console.log('hi!: ', response);
        return response.data;
      };

      function hiFailed(error) {
        $log.error('XHR Failed for getHello.\n' + angular.toJson(error.data, true));
      };
    }

    function saveReport(report) {
      console.log('saving bird report');

      return $http.post(saveReportEndpoint, {msg: report})
        .then(saveReportComplete)
        .catch(saveReportFailed);

      function saveReportComplete(response) {
        console.log('Report Saved:', response);
      }

      function saveReportFailed(response) {
        console.log( 'Save failed. Error: ', response);
      }
    }
  }
})();

// return {
//         getAvengers: getAvengers
//     };

//     function getAvengers() {
//         return $http.get('/api/maa')
//             .then(getAvengersComplete)
//             .catch(getAvengersFailed);

//         function getAvengersComplete(response) {
//             return response.data.results;
//         }

//         function getAvengersFailed(error) {
//             logger.error('XHR Failed for getAvengers.' + error.data);
//         }
//     }

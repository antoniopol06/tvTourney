angular.module('new.event.create', [])
  .controller('eventCtrl', function ($scope, eventHandler, $stateParams) {
    //array in the scope for holding events
    $scope.events = [];
    //controller for making events
    $scope.makeEvent = function() {
      var event = {
        id: $scope.league.id,
        description : $scope.event.name,
        score: $scope.event.score,
        url: "/league/" + $scope.league.id + "/events"
      }
      eventHandler.postEvent(event).success(function(data) {
        console.log("SUCCESS!!", data);
        $scope.events.push(event);
        return data;
      }).error(function(err) {
        //does something about the error --> can be added later
        console.log("ERROR!!", err);
        return err;
      });
    }
    //controller for getting events that the league has
    $scope.grabEvents = function() {
      eventHandler.getEvents().success(function(data) {
        data.each(function(event) {
          $scope.events.push(event);
        })
      }).error(function(err) {
        return err;
      });
    }
  })
  .factory('eventHandler', function($http) {
    //makes an ajax call to the server for the list of events
    var getEvents = function() {
      return $http({
        method: 'GET',
        url: '/league/:id/events',
      }).success(function(resp) {
        return resp;
      }).error(function(err) {
        return err;
      });
    }
    //makes an ajax call to the server to post the event owner inputed
    var postEvent = function(data) {
      return $http({
        method: 'POST',
        url: data.url,
        data: data
      }).success(function(resp) {
        return resp;
      }).error(function(err) {
        return err;
      });
    }

    return {
      getEvents : getEvents,
      postEvent : postEvent
    }
  });

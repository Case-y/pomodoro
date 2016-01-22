var breaktime = 5;
var sessiontime = 25;
var breakboo = true;

$(document).ready(function()  { 
  
  $(".bs").click(function() {
    if (breaktime > 1) {
      breaktime -= 1;
    $(".breaktime").text(breaktime);
    }
  });
  
  $(".ba").click(function () {

    if (breaktime < 30) {
      breaktime += 1;
      $(".breaktime").text(breaktime);
    }
  });
  
  $(".ss").click(function () { 
      if (sessiontime > 1) {
        sessiontime -= 1;        $(".sessiontime").text(sessiontime);
      }
  });
  
  $(".sa").click(function () {
      if (sessiontime < 59) {
        sessiontime += 1;       $(".sessiontime").text(sessiontime);
      }
  });
  
});

var timer = angular.module('pomodoro', []);

timer.controller('clock', ['$scope', '$interval', function($scope, $interval) {
  $scope.timeLeft = 1500;
  // start time
  $scope.startTime = function() {
    
    // not on break
    if (breakboo) {
    $scope.timeLeft = sessiontime * 60;
    $scope.disabled = true;
    time = $interval(function() {
      $scope.timeLeft--;
      if ($scope.timeLeft <= 0) {
        $scope.disabled = false;
        $interval.cancel(time);
        
      // Play audio
      var wav = 'http://soundjax.com/reddo/97744%5EALARM.mp3';
      var audio = new Audio(wav);
			audio.play();
        
      breakboo = false;
      $scope.timeLeft = breaktime * 60;
        
      }
      else {
        $scope.disabled.cancel = false; 
          }
                              }, 1000); 
    }
    
    // on break
    else {
      $scope.timeLeft = breaktime * 60;
      $scope.disabled = true;
      breakmode = $interval(function() {
        $scope.timeLeft--;
        if ($scope.timeLeft <= 0) {
          $scope.disabled = false;
          $interval.cancel(breakmode);
          breakboo = true;
          $scope.timeLeft = sessiontime * 60;
        }
        else {
          $scope.disabled.cancel = false; } }, 1000); }
     }
  
}]);


//runningtime
timer.filter('runningtime', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});


'use strict';

angular.module('homeStatsApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.holod = 0;
        $scope.gor = 0;
        $scope.svet = 0;
        
        $scope.today = moment(new Date()).format('MMMM Do YYYY');
        
        function loadData(){
            $http.get('/api/stats')
                .success(function(stats) { 
                    $scope.stats = stats; 
                    
                    for(var i = 0; i < stats.length; i++){
                        var stat = stats[i]
                        stat.date = moment(stat.date).format('MMMM Do YYYY');
                        
                        if (stats[i+1]){
                            stat.holodInc = stat.holod - stats[i+1].holod;
                            stat.gorInc = stat.gor - stats[i+1].gor;
                            stat.svetInc = stat.svet - stats[i+1].svet;
                        }
                        
                        stat.canBeRemoved = stat.date === $scope.today;
                    }
                    
                    $scope.isDateShow = stats && stats[0] && 
                        stats[0].date !== $scope.today;
                });
        }
        loadData();
        
        $scope.add = function(){
            $http.post('/api/stats', {
                holod: $scope.holod,
                gor: $scope.gor,
                svet: $scope.svet
            }).success(function(){
                $scope.holod = 0;
                $scope.gor = 0;
                $scope.svet = 0;
                
                loadData();
            });
        }
        
        $scope.remove = function(id){
            $http.delete('/api/stats/' + id).success(loadData);
        }
    });
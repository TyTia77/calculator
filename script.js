var app = angular.module('calculator', []);

app.controller('mainCtrl', ['$scope', function($scope){
    $scope.btn = [
        [
            { label: 'ac', value: 'ac' },
            { label: 'ce',value: 'ce' },
            { label:'rt', value: 'rt' },
            { label:'%', value: '%'}
        ],[
            { label:'mrc', value: 'mrc' },
            { label:'m-', value: 'm-' },
            { label:'m+', value: 'm+' },
            { label:'x', value: 'x' }
        ], [
            { label:'7', value: 7 },
            { label:'8', value: 8 },
            { label:'9', value: 9 },
            { label:'/', value: '/' }
        ], [
            { label:'4', value: 4 },
            { label:'5', value: 5 },
            { label:'6', value: 6 },
            { label:'-', value: '-' }
        ], [
            { label:'1', value: 1 },
            { label:'2', value: 2 },
            { label:'3', value: 3 },
            { label:'+', value: '+'}
        ], [
            { label:'0', value: 0 },
            { label:'.', value: '.' },
            { label:'-/+', value: '-/+' },
            { label:'=', value: '=' }
        ]
    ];

$scope.keyPress = function(ev){
    ev.target.classList.add('press');
    setTimeout(function(){
        ev.target.classList.remove('press');
    }, 100);
}
}]);

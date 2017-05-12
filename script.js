// ngSanitize allows html entities in angular string
var app = angular.module('calculator', ['ngSanitize']);

app.controller('mainCtrl', ['$scope', function($scope){

initButton();

var regexp = /\d/;
var regendnum = /\d$/;
var regop = /([*-/+])/;

$scope.screen = '';
//TODO
$scope.screenLower = '';
$scope.screenMemory = '';
var entry = '';
$scope.keyPress = function(ev){

    // $scope.screen += ev.target.dataset.value;

    var keyPressed = ev.target.dataset.value;

    // console.log(regexp.test(keyPressed));

    if (regexp.test(keyPressed)){
        $scope.screen += keyPressed;
        entry += keyPressed;
    }
    else {
        switch (keyPressed){
            case 'ac':
                buttonFunctions.clearAll();
                break;

            case 'ce':
                buttonFunctions.clearEntry();
                break;

            case 'rt':
                entry = Math.sqrt(parseFloat(entry));
                $scope.screen = entry;
                break;

            case '%':
                entry /= 100;
                $scope.screen /= 100;
                break;

            case '+':
                entry += '+';
                $scope.screenLower += $scope.screen +'+';
                $scope.screen = '';
                break;

            case '/':
                entry += '/';
                $scope.screenLower += $scope.screen +'&#247;';
                $scope.screen = '';
                break;

            case '-':
                entry += '-';
                $scope.screenLower += $scope.screen +'-';
                $scope.screen = '';
                break;

            case '*':
                entry += '*';
                $scope.screenLower += $scope.screen +'x';
                $scope.screen = '';
                break;

            case '=':
                if (regendnum.test(entry)){
                    buttonFunctions.calculate(entry);
                }
                break;

            default:
                console.log('not valid');
                break;
        }
    }

    ev.target.classList.add('press');
    setTimeout(function(){
        ev.target.classList.remove('press');
    }, 100);
}


var buttonFunctions = {
     clearAll: function(){
        entry = '';
        clearScreen(true);
    },

    //TODO
    clearEntry: function(){
        clearScreen();
    },

    calculate: function(entry){
        var test = entry.match(regop).index;
        if (test){
            $scope.screenLower += entry.slice(test+1, entry.length);
        }
        entry = eval(entry);
        $scope.screen = entry;
    }
};

//TODO
function displayScreen(){

}

function clearScreen(all){
    if (all){
        $scope.screen = '';
        $scope.screenLower = ''
    }
    else {
        $scope.screen = '';
    }
}

function initButton(){
    $scope.btn = [
        [
            { label: 'AC', value: 'ac' },
            { label: 'CE',value: 'ce' },
            { label:'&#8730;', value: 'rt' },
            { label:'%', value: '%'}
        ],[
            { label:'mrc', value: 'mrc' },
            { label:'m-', value: 'm-' },
            { label:'m+', value: 'm+' },
            { label:'x', value: '*' }
        ], [
            { label:'7', value: 7 },
            { label:'8', value: 8 },
            { label:'9', value: 9 },
            { label:'&#247;', value: '/' }
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
            { label:'- / +', value: '-/+' },
            { label:'=', value: '=' }
        ]
    ];
}

//TODO end controller
}]);

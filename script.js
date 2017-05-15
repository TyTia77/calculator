// ngSanitize allows html entities in angular string
var app = angular.module('calculator', ['ngSanitize']);

app.controller('mainCtrl', ['$scope', function($scope){

// initial screen display value
$scope.screen = '0';

var previous = '';
var current = '';
var operator = '';
var display = '';
var abs = true;

// keep track of period
// only allow to use once
// resets on anybutton except
// nums
var period = false;

//TODO
$scope.screenLower = '';
$scope.screenMemory = '';

$scope.keyPress = function(ev){
    var regexp = /\d/;
    var keyPressed = ev.target.dataset.value;

    if (regexp.test(keyPressed)){
        handleNum(keyPressed);
    }
    else {
        switch (keyPressed){
            case 'ac':
            case 'ce':
                clear(keyPressed);
                break;

            case '+':
            case '/':
            case '-':
            case '*':
                handleOp(keyPressed);
                break;

            case 'rt':
            case '%':
                handlefunc(keyPressed);
                break;

            case '-/+':
                handleAbs();
                break;

            case '.':
                handlePeriod();
                break;

            default:
                handleEqual();
                break;
        }
    }

    // handles visual effect, add and remove class
    // so visually the button appears pressed then
    // released
    ev.target.classList.add('press');
    setTimeout(function(){
        ev.target.classList.remove('press');
    }, 100);
}


function handleNum(key){
    var reg = /^0\d/;
    var reg1 = /^-0\d/;
    current += key;

    // remove 0's
    current = reg.test(current) ? current.slice(1, current.length) : current;

    // remove -0's if there's no period after eg. -0.111 is allowed, -02 isn't. and we
    // remove the 0's
    current = reg1.test(current) ? current.slice(0, 1) +current.slice(2, current.length): current;
    toScreen(current);
}

function clear(key){
    if (key === 'ac'){
        previous = '';
        operator = '';
    }

    current = '';
    period = false;
    abs = true;
    toScreen('0');
}

function handleAbs(){

    if (current === ''){
        if (abs){
            current = '-0';
        } else {
            current = '0'
        }
    } else {
        if (abs){
            current = -Math.abs(current);
        } else {
            current = Math.abs(current);
        }
    }

    abs = !abs;
    toScreen(current);
}

function handlePeriod(){
    if (current === ''){
        current = '0.';
    } else {
        if (!period){
            current += '.';
        }
    }

    period = true;
    toScreen(current);
}

function handlefunc(func){

// which to apply calculations on
// if current is false and previous is true
// eg after pressing equals, then calculate
// previous value otherwise calculate current
var toDisplay;

 if (func === 'rt'){
     if (current){
        current = Math.sqrt(current);
        toDisplay = current;
     } else if (!current && previous){
         previous = Math.sqrt(previous);
         toDisplay = previous;
     }
    } else if (func === '%'){
        if (current){
            current = current / 100;
            toDisplay = current;
        } else if (!current && previous){
            previous = previous / 100;
            toDisplay = previous;
        }
    }

    toScreen(toDisplay);
}

function handleOp(op){
    if (operator === ''){
        previous = current;
        toScreen('0');
    } else {
        if (previous && operator && current){
            previous = eval(previous +operator +current);
            toScreen(previous);
        }
    }

    period = false;
    operator = op;
    current = ''
}

function handleEqual(){
    if (previous && operator && current){
        previous = eval(previous +operator +current);
        operator = '';
        current = '';

        toScreen(previous);
    }
}

function toScreen(display){
    // if display is number, convert to string
    display = typeof display === 'number' ? display.toString() : display;
    var len = display.length;
    var maxlen = 11;

    display = len > maxlen ? display.slice(0, maxlen) : display;
    $scope.screen = display;
}

// dynamically dicates html button elements based on data
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
//TODO end controller
}]);

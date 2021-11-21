'use strict';

//Initializing variables with access to each button
const zeroNum = document.getElementById('zero');
const oneNum = document.getElementById('one');
const twoNum = document.getElementById('two');
const threeNum = document.getElementById('three');
const fourNum = document.getElementById('four');
const fiveNum = document.getElementById('five');
const sixNum = document.getElementById('six');
const sevenNum = document.getElementById('seven');
const eightNum = document.getElementById('eight');
const nineNum = document.getElementById('nine')

//Initializing access to each operator button
const add = document.getElementById('addition');
const sub = document.getElementById('subtract');
const del = document.getElementById('delete');
const multp = document.getElementById('multiply');
const div = document.getElementById('divison');
const eq = document.getElementById('equal');
const decimal = document.getElementById('fraction');
//Gets the expression (aka input)
const usrInp = document.querySelector('.result');
let exp = '';

//We are gonna use a variable to store whether or not the expression has been evaluated or not
let evaluation = false;

//Make a list of keycodes in which we can enter
const validKeys= ['0', '1', '2', '3', '4', '5', '6', '7','8','9', ' ', '+', '-','/','x', '(', ')', '.'];

//Checks if the input given by the user's keyboard is a number in our valid key list
const checkValidKey = function (event) {
    for (let i = 0; i < validKeys.length+1; i++) {
        if (event == validKeys[i]) {
            return true;
            break;
        }
    }
    return false;
};

const numOfExpCheck = function(num) {
    numLen = num.length;
    if (num == 1) {
        return true;
    }
    else {
        return false
    }
}

//Whenever an input is given on the keyboard
usrInp.addEventListener('keydown', function(e) {
    const key = e.keyCode || e.charCode;
    //Updates the expressio if char is deleted
    if (evaluation) {
        evaluation = false;
        usrInp.value = '';
    }
    if (checkValidKey(e.key)) {
        exp += e.key;
        console.log(exp);
    }  else if (key == 8) {
        const expLen = exp.length;
        exp = exp.slice(0, expLen-1);
        console.log(exp);
    } else if (e.key == '=') {
        //If the user inputs equal what we are gonna do is evaluate the given expression
        evaluation = true;
        const tempExp = prepareForEval(exp);
        usrInp.value = Math.round(evaluateExp(tempExp) * 1e12) / 1e12;
        exp = '';

    }
});


//a function to update our expression whenever a button is clicked
const updateExp = function (num) {
    if (!evaluation) {
        const val = num;
        exp += val;
        usrInp.value = exp;

    } else {
        evaluation = false;
        usrInp.value = '';
    }
}



//Deletes the last input given
const deleteLast = function () {
    let end = exp.length;
    let tempExp = exp.slice(0,end-1);
    exp = tempExp;
    console.log(exp, 'after deleted');
}
//This function updates the expression field with whichever operator is given as in input
const updateOperator = function(op) {
    exp +=  op ;
    usrInp.value = exp;
}

//evaluates the result
const evaluateExp = function(str) {
    const val = eval(str);
    return val;
};
//prepares our exp string to be ready to be calculated by removing non useable chars and converting to useable
const prepareForEval = function(str) {
    const tempExp = exp.replace(/x/g, "*");
    const finalExp = tempExp.replace(/[^-()\d/*+.]/g, '');
    return finalExp;
}

//Test Function, let's see if hitting one updates the input text;
zeroNum.addEventListener('click', function() {
    updateExp(0);
})
oneNum.addEventListener('click', function() {
    updateExp(1);
});
twoNum.addEventListener('click', function() {
    updateExp(2);
});
threeNum.addEventListener('click', function() {
    updateExp(3);
});
fourNum.addEventListener('click', function() {
    updateExp(4);
});
fiveNum.addEventListener('click', function() {
    updateExp(5);
});
sixNum.addEventListener('click', function() {
    updateExp(6);
});
sevenNum.addEventListener('click', function() {
    updateExp(7);
});
eightNum.addEventListener('click', function() {
    updateExp(8);
});
nineNum.addEventListener('click', function() {
    updateExp(9);
}) 

//Operators Event Listeners
//when + sign is hit updates text;
add.addEventListener('click', function() {
    updateOperator(' + ');
});
sub.addEventListener('click', function () {
    updateOperator(' - ');
});
multp.addEventListener('click', function () {
    updateOperator(' x ');
});
div.addEventListener('click', function() {
    updateOperator(' / ');
});

decimal.addEventListener('click', function() {
    updateOperator('.');
});

//Deletes one char at a time when the button is clicked
del.addEventListener('click', function() {
    deleteLast();
    usrInp.value = exp;
});

//Calculates the result
eq.addEventListener('click', function() {
    evaluation = true;
    const tempExp = prepareForEval(exp);
    usrInp.value = Math.round(evaluateExp(tempExp) * 1e12) / 1e12; //fixes rounding error 
    exp = '';
});


/* what should happen after we get our result?? our expression should be changed back to empty and we want to do is next time
the user enters anything we go back to a blank screen
*/


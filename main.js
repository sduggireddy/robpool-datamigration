var addOnTo = function(number){
    var result = number + 1;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}
var addTwoTo = function(number){
    var result = number + 2;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}
var addThreeTo = function(number){
    var result = number + 3;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}
var checkVoid1 = function(msg){
    //do something
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 5000);
    console.log('checkVoid1:' + msg);
    return new Promise(function(resolve, reject){
        resolve();
    });
}
var checkVoid2 = function(msg){
    //do something
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 5000);
    console.log('checkVoid2:' + msg);
    return new Promise(function(resolve, reject){   
        resolve();
    });
}
async function main1(){
    await checkVoid1('main 1');
}
async function main2(){
    await checkVoid2('main 2');
}
main1();
main2();
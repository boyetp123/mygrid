"use strict"

// function test(){
//     console.log('test')
//     console.log(this)
// }
//  ( function (){
//     console.log('test1 anonymous')
//     console.log(this)
// } )();

// test();
// test1();


// functor test
function plus1(value) {
    console.info('function plus1 value='+value)  
    return value + 1  
}  
function F(value, fn) {  
    console.info('function F value='+value)  
    return fn(value)  
}

// console.info(F(1, plus1));

// console.info(F([1, 2, 3], plus1));

function getDuplicates(str){
    str = str.toLowerCase();
    var m = {};
    for(var i =0;i<str.length;i++){
        var s = str.charAt(i).trim();
        m[ s ] = m[ s ] ? m[ s ] + 1 : 1;
    }
    m = Object.keys(m).reduce(function(pv,cv,idx){
        if (m[cv] > 1){
            pv[cv] = m[cv];
        }
        return pv; 
    },{});
    console.info(m);
} 

// getDuplicates('Bay Area');


function reverse(s){
    var sarr = [];
    for(var i = s.length - 1; i  > -1 ;i--){
        sarr.push( s.charAt(i) );
    }    
    return sarr.join('');
}

// console.info(reverse('abcdefg'));

// for(var i = 0; i < 10; i++) {
//     setTimeout((function(i) {
//       console.log(i);
//     })(i), 10)
// }

function countZero(n){
  var count = 0;
  while(n>9){
      console.info(n)
   count += Math.floor(n/10);
   n = n/10;
  }
  return count;
}

// console.info(countZero(2014));

function reverseRecursive(s){
    s = s || '';
    if (s.length === 1){
        return s
    } else {
        return reverseRecursive( s.substr(1) ) + s.substr(0,1);
    }
}

// console.log( reverseRecursive('Henry Polangcos') );  

function sentenceToCamelCase(str){
    //const m = /[0-9]*\.?[0-9]+%\s/ig;
    //const m2 = /^[a-zA-Z]/;
    // const m2 = /^[a-z]|[A-Z]/g; 
    // const m3 = /\s[a-zA-Z]/g;
    const m3 = /^[a-zA-Z]|\s[a-zA-Z]/g;
    // let matchArr = str.match(m3);
    return str.replace(m3,(el,idx)=>{
        return el.trim().toUpperCase();
    })
}
console.log(sentenceToCamelCase('the quick brown fox jump over the lazy dog' ));

function camelCaseToSentence(str){
    let str2=str
    const m1 = /[A-Z]/g;
    str2 = str2.replace(m1, (el,idx)=>{
        return ' ' + el;
    })
    return str2;
}

// console.log(camelCaseToSentence('theQuickBrownFoxJumpOverTheLazyDog') )

function removeRepeat(str){
    let prevStr = '';
    return str.replace(/[a-zA-Z]/g,(el,idx)=>{
        if (prevStr === el){
            return ''
        } else {
            prevStr = el;
        }
        return 
    })
// 'the quick brown fox jump over the lazy dog'.match(/^[a-z]/g)
}

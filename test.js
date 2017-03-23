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
// console.log(sentenceToCamelCase('the quick brown fox jump over the lazy dog' ));

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

function pad (l, s) {
    return (new Array(l + 1)).join(s || ' ');
}

function lpad(numStr,len, strToPad){
    numStr = (numStr || '') + '';
    if (numStr.length < len ){
        return pad( len - numStr.length, strToPad ) + numStr;
    }
    return numStr;
}

function rpad(numStr,len, strToPad){
    numStr = (numStr || '') + '';
    if (numStr.length < len ){
        return  numStr + pad( len - numStr.length, strToPad ) ;
    }
    return numStr;
}


function covertTime(ampmInput){
    let inArr = ampmInput.split(':');
    let isPM = ampmInput.indexOf('PM') > -1;
    let outHr = inArr[0];

    if (isPM ){
        if (Number(outHr) < 12){
            outHr = Number(inArr[0]) + 12;
        }
    } else {
        if (Number(outHr) > 11 ){
            outHr = Number(outHr) - 12;
        }
    }
    return  lpad(outHr,2,'0') + ':' + inArr[1] + ':' + ( inArr[2].replace('AM','').replace('PM','')  );

}
// console.info( covertTime ('7:05:45AM'));
// console.info( covertTime ('11:45:54AM'))
// console.info( covertTime ('12:45:54PM'))
// console.info( covertTime ('12:00:00AM'))

function bigSum(arr){
    var sum = 0;
    arr.forEach((value,idx)=>{
        sum+= value;
    } );
    return sum;
}

// console.info(  bigSum ( [1001,1002,1003,1004,1005] ) )


function diagonalDiff(arr){
    var dir1=0;
    var dir2=0;

    arr.forEach((valuearr,idx)=>{
        console.info(valuearr)
        valuearr.forEach((val,idx2)=>{
            console.info(idx === idx2, idx === (valuearr.length - 1) - idx2 )
            if (idx === idx2 ){
                dir1 += val; 
            }
            if (idx === (valuearr.length - 1) - idx2 ){
                dir2 += val;            
            }
        });
    })
    console.info(dir1,dir2)
    return Math.abs( dir1 - dir2 );
}

// console.info(diagonalDiff([ [ 11, 2, 4 ], [ 4, 5, 6 ], [ 10, 8, -12 ] ])  )

function getStrLengthInArray(arr){
    let len=0;
    arr.forEach( (val,idx)=>{
        len += val.length;
    } )
    return len;
}

function textJustification(words, L) {
    let output=[];
    // let prevWord='';
    let phrase=[];
    let arrLen = words.length;
    let lookAheadWord = '';

    words.forEach( (word, idx, origWords)=>{
        lookAheadWord='';
        let tphraseLen = 0;
        let rspaces = 0;
        let rspaceWithLookAhead=0;
        phrase.push(word)

        tphraseLen = getStrLengthInArray( phrase );
        rspaces = L - tphraseLen;

        if (idx < arrLen -1){
            lookAheadWord=origWords[idx + 1];
            rspaceWithLookAhead = rspaces - lookAheadWord.length ;
        }
        // phrase.length > 1 &&
        if (  (rspaces > 1 && rspaces >=  phrase.length) || idx === arrLen -1){
            if (  rspaceWithLookAhead > 1  &&  rspaceWithLookAhead >=  phrase.length + 1  ){
                // continue
            } else {
                if (phrase.length === 1){
                    output.push( word + pad( rspaces ,' ')) ;
                } else {
                    let d = Math.ceil(rspaces / (phrase.length - 1));
                    let slen = rspaces;
                    
                    let str = phrase.reduce((pv,cv,idx)=>{
                        let ret = ''
                        if (idx === phrase.length - 1){
                            ret = pv + cv;
                        } else {
                            ret =  pv + cv + pad( slen < d ? slen : d  ,' ')
                        }
                        slen -= d;
                        slen = slen < 1 ? 1 : slen;
                        return ret;
                    }, '')
                    output.push( str );
                }
                phrase=[];
            }
        } 
    });
    return output;
}
// var words = ["This", "is", "an", "example", "of", "text", "justification."] , L =16;
var words = ["Two", "words."],  L = 9;
console.info( textJustification( words,L ) )
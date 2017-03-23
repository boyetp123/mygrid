function pad (l, s) {
    return (new Array(l + 1)).join(s || ' ');
}

function getStrLengthInArray(arr){
    var len=0;
    arr.forEach( (val,idx)=>{
        len += val.length;
    } )
    return len;
}

function textJustification(words, L) {
    var output=[];
    var phrase=[];
    var arrLen = words.length;
    var lookAheadWord = '';

    words.forEach( (word, idx, origWords)=>{
        lookAheadWord='';
        var tphraseLen = 0;
        var rspaces = 0;
        var rspaceWithLookAhead=0;
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
                    var d = Math.ceil(rspaces / (phrase.length - 1));
                    var slen = rspaces;
                    
                    var str = phrase.reduce((pv,cv,idx)=>{
                        var ret = ''
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
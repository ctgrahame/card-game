
export function generateContents(num){
    
    const bgColors = [
        'hsl(25, 85%, 65%)',
        'hsl(55, 85%, 65%)',
        'hsl(90, 85%, 65%)',
        'hsl(160, 85%, 65%)',
        'hsl(220, 85%, 65%)',
        'hsl(265, 85%, 65%)',
        'hsl(310, 85%, 65%)',
        'hsl(360, 85%, 65%)',
        'hsl(25, 502%, 65%)',
        'hsl(55, 50%, 65%)',
        'hsl(90, 50%, 65%)',
        'hsl(160, 50%, 65%)'
    ]
    
    const numberArray = [];
    for(let i=0; i<num; i++){
       
        numberArray.push( [ i + 1, bgColors[i]], [ i + 1, bgColors[i]] );
    }
    
    for (var i = numberArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numberArray[i];
        numberArray[i] = numberArray[j];
        numberArray[j] = temp;
    }
    return numberArray;
};


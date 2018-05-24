let PlayFair = {
    encrypt(message, key) {
        let mat = this.makeMat(key);
        // console.log(mat);

        let m = this.prepareText(message);
        // console.log(m);
        console.log( this.substitute(m,mat) ) ;

        // console.log(m);
    },

    makeMat(key) {
        let matSet = new Set ( key.split("") );
        
        for (let i = 97; i < 123 ; i++) {

            matSet.add( String.fromCharCode(i) == 'j' ? 'i':  String.fromCharCode(i));
        }
        return [...matSet];
    },

    prepareText(message) {
        message = message.replace(/\s+/g,"").toLowerCase();
        let pText = "";
        let prevChar = "";
        for (let i =0; i < message.length; i++) {
            
            let currChar = message[i] === 'j' ? 'i': message[i];
            if(currChar === prevChar)
                pText+='x';
            pText +=  currChar;
            prevChar = currChar;
        }

        if(pText.length & 1)
            pText += 'x';
        return pText;
    },

    substitute(message, mat, mode = 1) {
        
        let text = "";
        for (let k = 0; k < message.length; k += 2) {
            let pos1 = mat.findIndex( val => val === message[k]);
            let pos2 = mat.findIndex( val => val === message[k + 1]);
            let i1 = parseInt(pos1 / 5);
            let i2 = parseInt(pos2 / 5);
            let j1 = pos1 % 5;
            let j2 = pos2 % 5;

            if(i1 === i2) {
                // console.log(i1,j1,i2,j2,message[k],message[k+1]);
                j1 = (mode ? (j1+1):(5+j1-1)) % 5;
                j2 = (mode ? (j2+1):(5+j2-1)) % 5;
                text += mat[ i1*5 + j1 ];
                text += mat[ i2*5 + j2 ];
            } else if(j1 === j2) {
                // console.log(i1,j1,i2,j2,message[k],message[k+1]);
                i1 =( mode? (i1+1) : (5+i1-1))  % 5;
                i2 =( mode? (i2+1) : (5+i2-1))  % 5;
                text += mat[ i1*5 + j1 ];
                text += mat[ i2*5 + j2 ];
            } else {
                // console.log(i1,j1,i2,j2,message[k],message[k+1],"diff");
                text += mat[ i1 * 5 + j2];
                text += mat[ i2 * 5 + j1];
            }
            
        }
        return text;

    }


}

PlayFair.encrypt("he is osama" ,"longkey");
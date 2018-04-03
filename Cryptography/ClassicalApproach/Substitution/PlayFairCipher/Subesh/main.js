let PlayFair = {
    encrypt(message, key) {
        let mat = this.makeMat(key);
        console.log(mat);

        let m = this.prepareText(message);

        console.log(m);
    },

    makeMat(key) {
        let matSet = new Set ( key.split("") );
        for (let i = 97; i < 123 ; i++) {
            matSet.add( String.fromCharCode(i) );
        }
        return [...matSet];
    },

    prepareText(message) {
        let pText = "";
        let prevChar = "";
        for (let i =0; i < message.length; i++) {
            let currChar = message[i];
            if(currChar === prevChar)
                pText+='x';
            pText += currChar;
            prevChar = currChar;
        }

        if(pText.length & 1)
            pText += 'x';
        return pText;
    }
}

PlayFair.encrypt("subeshh","subesh");
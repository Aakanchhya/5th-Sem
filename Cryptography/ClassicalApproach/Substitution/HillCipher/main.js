let HillCipher = {

    //Simple Brute Force method.
    moduloInverse(val,mod) {
        val = val % mod;
        for(let i = 1; i < mod; i++)  {
            if( (val*i) % mod == 1 )
                return i;
        }
        return -1;
    },

    
};

console.log(HillCipher.moduloInverse(2,26));

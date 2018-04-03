const fs = require('fs');
let Vigenere = {

  encrypt(message, key) {
    if (typeof(message) !== "string" && typeof(key) !== "string")
      throw new TypeError("Message and Key must be string");
    let cipherText = "";
    message = message.replace(/\s+/g, '').toLowerCase();
    key = key.replace(/\s+/g, '').toLowerCase();
    for (let i = 0; i < message.length; i++) {
      cipherText += String.fromCharCode(
          (message.charCodeAt(i) + key.charCodeAt(i % key.length) - (97 << 1)) %
              26 +
          97);
    }
    return cipherText;
  },

  decrypt(cipherText, key) {
    if (typeof(cipherText) !== "string" && typeof(key) !== "string")
      throw new TypeError("CipherText and Key must be string");
    let decodedText = "";
    cipherText = cipherText.replace(/\s+/g, '').toLowerCase();
    key = key.replace(/\s+/g, '').toLowerCase();
    for (let i = 0; i < cipherText.length; i++) {
      decodedText += String.fromCharCode(
          (26 + cipherText.charCodeAt(i) - key.charCodeAt(i % key.length)) %
              26 +
          97);
    }
    return decodedText;
  },
  makeTable() {
    fs.open('log.md','w', (err,fd) => {
        if (err) throw err;
        let data = "# Table\n\n";

        for (let i =0; i< 26; i++)  {
            data += "    ";
            for (let j =0; j< 26; j++) {
                data += String.fromCharCode(  (i+j) % 26 + 97) + ( (j+1) % 26 ? "  ": "");
            }   
            data += '\r'    
        }

        fs.writeFile(fd, data, (err) => {
          if (err) throw err;
        });
        
    })
  }

};



// console.log(Vigenere.encrypt('abc', 'bab'));
// console.log(Vigenere.decrypt('bbd', 'bab'));
Vigenere.makeTable();


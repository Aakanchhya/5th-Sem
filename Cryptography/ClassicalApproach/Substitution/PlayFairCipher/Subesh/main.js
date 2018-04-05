let PlayFair = {
  encrypt(message, key) {
    return this.substitute(this.prepareText(message), this.makeMat(key));
  },

  decrypt(message, key) {
    return this.substitute(this.prepareText(message), this.makeMat(key), 1);
  },

  makeMat(key) {
    key = key.replace(/\s+/g, "").toUpperCase();
    let matSet = new Set(key.split(""));
    for (let i = 65; i < 91; i++) {
      matSet.add(String.fromCharCode(i) == "J" ? "I" : String.fromCharCode(i));
    }
    console.log(matSet);
    return [...matSet];
  },

  prepareText(message) {
    message = message.replace(/\s+/g, "").toUpperCase();
    let pText = "";
    let prevChar = "";
    for (let i = 0; i < message.length; i++) {
      let currChar = message[i] === "J" ? "I" : message[i];
      if (currChar === prevChar) pText += "X";
      pText += currChar;
      prevChar = currChar;
    }

    if (pText.length & 1) pText += "X";
    return pText;
  },

  substitute(message, mat, mode = 0) {
    let text = "";

    for (let k = 0; k < message.length; k += 2) {
      let pos1 = mat.findIndex(val => val === message[k]);
      let pos2 = mat.findIndex(val => val === message[k + 1]);
      let i1 = parseInt(pos1 / 5);
      let i2 = parseInt(pos2 / 5);
      let j1 = pos1 % 5;
      let j2 = pos2 % 5;

      if (i1 === i2) {
        j1 = (!mode ? j1 + 1 : 5 + j1 - 1) % 5;
        j2 = (!mode ? j2 + 1 : 5 + j2 - 1) % 5;
        text += mat[i1 * 5 + j1];
        text += mat[i2 * 5 + j2];
      } else if (j1 === j2) {
        i1 = (!mode ? i1 + 1 : 5 + i1 - 1) % 5;
        i2 = (!mode ? i2 + 1 : 5 + i2 - 1) % 5;
        text += mat[i1 * 5 + j1];
        text += mat[i2 * 5 + j2];
      } else {
        text += mat[i1 * 5 + j2];
        text += mat[i2 * 5 + j1];
      }
    }
    return text;
  }
};

let t = PlayFair.encrypt("he is osama", "longkey");
let d = PlayFair.decrypt("NJWDMXINOIQCFZ", "ATTACK");
console.log(t, d);

const fs = require('fs');


let a=5,b=2,c=2,d=1;

let buffer = "";
buffer = "P,Q,S\n";

for (let i = 0; i <= 30; i++) {
    let P = i*0.05;

    let Q = a - b* P;
    let S = c + d*P;
    buffer += `${P},${Q},${S}\n`;    
}

fs.open('data.csv','w',(err , fd) => {
   fs.write(fd,buffer, () => {
       console.log("Done")
       fs.close()
   }); 
});
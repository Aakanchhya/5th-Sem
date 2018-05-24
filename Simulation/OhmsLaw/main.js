
let res = 3;
let s = "";
for ( let v = 10; v <= 100; v ++) {
	s += v/res +"," + v+ ","+ + res + '\n'

}

fetch("data.csv").then(data => data.text()).then(text => {
    // console.log( text.split("\n") )
    let csvData = text.split("\n");
    let data = [];

    for(let i = 1; i < csvData.length; i++) {
        data[i-1] = csvData[i].split(",").map(val => parseFloat(val) );
    }

    // console.log(data);

    for(let i = 0; i < data.length; i++) {
        if(data[i][0] == data[i][1]/data[i][2]) {
            console.log(data[i][0], data[i][1], data[i][2]);
        }
    }
});


    
    
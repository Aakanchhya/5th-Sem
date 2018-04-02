
fetch('subesh').then(res => res.text() ).then( text => {
    
    let a = text;
    a.replace(/\s+/g,"");
    let b= a.split(",");
    console.log(b);
});
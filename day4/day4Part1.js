const topRange = 679128;
const minRange = 206938;

//Left to right never decrease = Stay the same or grow
//6 nummer
//Two of the same numbers are the same = 22355 = 22, 55
//How many passwords are between topRange and minRange
const tempPass = [];
const acceptedPasswords = [];
console.time("Runtime");
for(let posPass = minRange; posPass <= topRange; posPass++){
    let workCount = 0;
    let pass = Array.from(posPass.toString()).map(Number);
    for(let i = 0; i < 6; i++){
        if (pass[i-1] != null){
            if (pass[i] >= pass[i-1]){
                workCount++;
            }
        }
    }
    if (workCount == 5){
        tempPass.push(posPass);
    }
 
}
tempPass.forEach((pass) => {
    if (testForDouble(pass)){
        acceptedPasswords.push(pass);
    }
});
function testForDouble(pass){
    let passArr = Array.from(pass.toString()).map(Number);
    let prev;
    let duplicate = false;
    passArr.forEach((el)=>{
        if (prev != null){
            if (el == prev){
                duplicate = true;
            }
        }
        prev = el;
    })
    if (duplicate){
        return true;
    }else{
        return false;
    }
}
console.timeEnd("Runtime")
console.log(acceptedPasswords.length);
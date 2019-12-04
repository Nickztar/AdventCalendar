const topRange = 679128;
const minRange = 206938;

//Left to right never decrease = Stay the same or grow
//6 nummer
//Two of the same numbers are the same = 22355 = 22, 55
//How many passwords are between topRange and minRange
const tempPass = [];
const part1Passwords = [];
const part2Passwords = [];
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
        part1Passwords.push(pass);
    }
});
function testForDouble(pass){
    let passArr = Array.from(pass.toString()).map(Number);
    let duplicate = false;
    passArr.forEach((el, index)=>{
        if (passArr[index-1] != null){
            if (el == passArr[index-1]){
                duplicate = true;
            }
        }
    })
    if (duplicate){
        return true;
    }else{
        return false;
    }
}

function notThreeTimes(arrPass){
    let countedArr = [];
    part1Passwords.forEach((el) => {
        countedArr.push(countSteps(el));
    })
    let acceptedCounter =[];
    let counter = 0;
    countedArr.forEach(el => {
        acceptedCounter = el.filter((el) => {
            return el.steps == 2;
        })
        if (acceptedCounter.length > 0){
            counter++;
        }
    });
    return counter;
}
function countSteps(passArr){
    let countEquals = 1;
    let county = [];
    let pass = Array.from(passArr.toString()).map(Number);
    for (let i = 0; i < pass.length + 1; i++){
        if (i == 0) continue;
        if (pass[i] === pass[i-1]) countEquals++;
        else{
            county.push({"steps": countEquals, "pass": pass.join('')});
            countEquals = 1;
        }
    }
    return county;
}

console.timeEnd("Runtime")
notThreeTimes();
console.log(notThreeTimes());
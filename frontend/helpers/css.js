module.exports = {
    styleHelper () {
    let arr = [151, 64];
    let randomArray = [];
    arr.push(Math.floor(Math.random()* 87) + 64);
    for (var i = 0; i < 2; i++) {
      let j = Math.floor(Math.random()* (2 - i));
      randomArray.push(arr.splice(j, 1)[0]);
      }

    randomArray.push(arr[0]);
    return randomArray;
  }
};

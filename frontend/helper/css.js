module.exports = {
    styleHelper (x, y) {
    let arr = [x, y];
    let randomArray = [];
    arr.push(Math.floor(Math.random()* (x-y)) + y);
    for (var i = 0; i < 2; i++) {
      let j = Math.floor(Math.random()* (2 - i));
      randomArray.push(arr.splice(j, 1)[0]);
      }

    randomArray.push(arr[0]);
    return randomArray;
  }
};

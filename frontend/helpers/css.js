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


let trackshowBackgroundGradient = "style={{background: '-webkit-linear-gradient(top, rgba( 0, 0, 0, 0) 75%, rgba('+(rbg1[0])+', '+(0)+', '+(rbg1[2])+', 0.5) 82%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 90%, rgba(0, 0, 0, 0) 100%)'}}";

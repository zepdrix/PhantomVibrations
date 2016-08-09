module.exports = {
  convertTime (time) {

    let min, sec, millisec;
    min = Math.floor(time / 60);
    sec = Math.floor(time % 60);
    millisec = Math.floor((time % 1) * 100);

    if (min.toString().length < 2) {
      min = "0" + min.toString();
    }

    if (sec.toString().length < 2) {
      sec = "0" + sec.toString();
    }

    if (millisec.toString().length < 2) {
      millisec = "0" + millisec.toString();
    }

    return min + ":" + sec + ":" + millisec;

  }

};

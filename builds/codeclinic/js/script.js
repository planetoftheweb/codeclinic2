(function() {
  var mySoundContext, myOscillator, myGain, myDistortion;
  var contextClass =
    window.AudioContext || window.webkitAudioContext;

  if (contextClass) {
    mySoundContext = new contextClass();

    myOscillator = mySoundContext.createOscillator();
    myOscillator.type = 'sine';
    myOscillator.frequency.value = 110;
    myOscillator.start();

    myGain = mySoundContext.createGain();
    myGain.gain.value = 0;

    myDistortion = mySoundContext.createWaveShaper();

    myOscillator.connect(myDistortion);
    myDistortion.connect(myGain);
    myGain.connect(mySoundContext.destination);
  } else {
    document.querySelector('.app').innerHTML =
      '<div class="container alert alert-danger">Sorry, this app requires the Web Audio API, which your browser does not support</div>';
  }
})();

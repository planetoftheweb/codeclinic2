(function() {
  var mySoundContext,
    myOscillator,
    myGain,
    myDistortion,
    myOscillator;

  var contextClass =
    window.AudioContext || window.webkitAudioContext;

  var appNode = document.querySelector('.app');

  if (contextClass) {
    mySoundContext = new contextClass();
  } else {
    document.querySelector('.app').innerHTML =
      '<div class="container alert alert-danger">Sorry, this app requires the Web Audio API, which your browser does not support</div>';
  }

  appNode.addEventListener('mousedown', e => {
    if (myOscillator) {
      myOscillator.stop();
    }

    myOscillator = mySoundContext.createOscillator();
    myOscillator.type = 'sine';
    myOscillator.frequency.value = 110;
    myOscillator.start();

    myGain = mySoundContext.createGain();
    myGain.gain.value = 0.1;

    myDistortion = mySoundContext.createWaveShaper();

    myOscillator.connect(myDistortion);
    myDistortion.connect(myGain);
    myGain.connect(mySoundContext.destination);
  });

  appNode.addEventListener('mouseup', e => {
    myOscillator.stop();
  });
})();

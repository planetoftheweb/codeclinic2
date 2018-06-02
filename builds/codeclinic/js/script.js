(function() {
  var mySoundContext,
    myOscillator,
    myGain,
    myDistortion,
    myOscillator,
    originalYPos,
    originalXPos,
    originalFrequency,
    scaleFrequencies = [
      110,
      123.47,
      130.81,
      146.83,
      164.81,
      174.61,
      196,
      220,
      246.94,
      261.63,
      293.66,
      329.63,
      349.23,
      392,
      440,
      493.88,
      523.25,
      587.33,
      659.25,
      698.46,
      783.99,
      880,
      987.77,
      1046.5,
      1174.66,
      1318.51,
      1396.91,
      1567.98,
      1760
    ];

  var contextClass =
    window.AudioContext || window.webkitAudioContext;

  var appNode = document.querySelector('.app');
  var appWidth = appNode.offsetWidth;

  appNode.style.background =
    'repeating-linear-gradient(to right, #FDF6E4, #FDF6E4 50%, #F7EFD7 50%, #F7EFD7)';
  appNode.style.backgroundSize =
    appWidth / scaleFrequencies.length * 2 + 'px 100%';

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

    mouseXPos = e.clientX;
    mouseYPos = e.clientY;
    originalYPos = mouseYPos;

    originalFrequency =
      scaleFrequencies[
        Math.floor(
          mouseXPos / appWidth * scaleFrequencies.length
        )
      ];

    myOscillator = mySoundContext.createOscillator();
    myOscillator.type = 'sine';
    myOscillator.frequency.value = originalFrequency;
    myOscillator.start();

    myGain = mySoundContext.createGain();
    myGain.gain.value = 0.1;

    myDistortion = mySoundContext.createWaveShaper();

    myOscillator.connect(myDistortion);
    myDistortion.connect(myGain);
    myGain.connect(mySoundContext.destination);

    appNode.addEventListener('mousemove', e => {
      var distanceY = e.clientY - originalYPos;
      mouseXPos = e.clientX;
      appWidth = appNode.offsetWidth;

      myGain.gain.value = mouseXPos / appWidth;
      myOscillator.frequency.value =
        originalFrequency + distanceY;

      appNode.style.backgroundSize =
        appWidth / scaleFrequencies.length * 2 + 'px 100%';
    });
  });

  appNode.addEventListener('mouseup', e => {
    myOscillator.stop();
    appNode.removeEventListener('mousemove', null);
  });
})();

$(function() {
  var file, droppedImage;
  var target = $('.dropzone');
  var warningMsg = document.querySelector('.warning');

  function detectImageFaces() {
    if (droppedImage !== undefined) {
      $('.face').remove();
      $('.warning').remove();
      $('.picture').faceDetection({
        complete: function(faces) {
          for (var i = 0; i < faces.length; i++) {
            $('<div>', {
              class: 'face',
              css: {
                position: 'absolute',
                left: faces[i].x * faces[i].scaleX + 'px',
                top: faces[i].y * faces[i].scaleY + 'px',
                width: faces[i].width * faces[i].scaleX + 'px',
                height: faces[i].height * faces[i].scaleY + 'px'
              }
            }).insertAfter(this);
          }
        },
        error: function(code, message) {
          alert('Error: ' + message);
        }
      });
    } else {
      warningMsg.innerHTML =
        '<p class="alert alert-danger">You must drop and image to analyze</p>';
    }
  }

  target
    .on('dragover', function() {
      target.addClass('dragover');
      return false;
    })
    .on('dragend', function() {
      target.removeClass('dragover');
      return false;
    })
    .on('dragleave', function() {
      target.removeClass('dragover');
      return false;
    })
    .on('drop', function(e) {
      var fileReader;
      file = e.originalEvent.dataTransfer.files[0];
      e.stopPropagation();
      e.preventDefault();
      target.removeClass('dragover');

      droppedImage = new Image();
      fileReader = new FileReader();
      fileReader.onload = function(e) {
        droppedImage.src = e.target.result;
        droppedImage.className = 'picture';
        target.html(droppedImage);
        detectImageFaces();
      };
      fileReader.readAsDataURL(file);
    }); // on drop

  $('#analyze').click(detectImageFaces);
  $(window).resize(detectImageFaces);
}); // page loaded

$(function() {
  var file, droppedImage;
  var target = $('.dropzone');

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
    });

  function detectImageFaces() {
    if (droppedImage !== undefined) {
      $('.face').remove();
      $('.warning').remove();
      $('.picture').faceDetection({
        complete: function(faces) {
          for (let i = 0; i < faces.length; i++) {
            $('<div>', {
              class: 'face',
              css: {
                position: 'absolute',
                left: faces[i].x * faces[i].scaleX + 'px',
                top: faces[i].y * faces[i].scaleY + 'px',
                width:
                  faces[i].width * faces[i].scaleX + 'px',
                height:
                  faces[i].height * faces[i].scaleY + 'px'
              } // css
            }).insertAfter(this); // div
          } //loop through faces
        } // complete
      }); // face detection
    } else {
      var warningMsg = $('.warning').html(
        '<p class="alert alert-danger">You must drop an image to analyze.</p>'
      );
    } // undefined image
  } // detectImageFaces

  $('#analyze').click(detectImageFaces);
  $(window).resize(detectImageFaces);
});

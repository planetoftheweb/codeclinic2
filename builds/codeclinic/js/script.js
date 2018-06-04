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
      };
      fileReader.readAsDataURL(file);
    });
});

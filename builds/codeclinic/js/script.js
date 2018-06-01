(function() {
  const occupied = 1;
  const free = 0;
  let columnNames = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H'
  ];
  let numColumns = 8;
  let allSolutions = [];
  let solutionsQty;
  let currentSolution = 0;

  document
    .querySelector('#Board')
    .addEventListener(
      'click',
      e => {
        if (e.target.tagName === 'path') {
          if (
            e.target.style.fill ===
            'rgb(211, 54, 130)'
          ) {
            e.target.style.fill = 'transparent';
          } else {
            e.target.style.fill =
              'rgb(211, 54, 130)';
          }
        }
      },
      false
    );
})();

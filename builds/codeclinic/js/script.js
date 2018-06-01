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

  function Board() {
    this.width = numColumns;
    this.lastRow = this.width - 1;
    this.columns = new Array(this.width);

    let numberOfDiagonals = 2 * this.width - 1;
    this.diagDown = new Array(numberOfDiagonals);
    this.diagUp = new Array(numberOfDiagonals);
    this.solutions = [];

    for (
      let index = 0;
      index < numberOfDiagonals;
      ++index
    ) {
      if (index < this.width) {
        this.columns[index] = -1;
      }
      this.diagDown[index] = free;
      this.diagUp[index] = free;
    }
    this.position.numColumns;
  }

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
})(); // IIFE

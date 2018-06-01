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
    this.position = numColumns;

    this.tryNewQueen = function(row) {
      for (
        let column = 0;
        column < numColumns;
        column++
      ) {
        if (this.columns[column] >= 0) {
          continue;
        }

        let diagDownIndex = row + column;
        if (
          this.diagDown[diagDownIndex] ===
          occupied
        ) {
          continue;
        }

        let diagonalUpIndex =
          this.position - 1 - row + column;
        if (
          this.diagUp[diagonalUpIndex] ===
          occupied
        ) {
          continue;
        }

        this.columns[column] = row;
        this.diagDown[diagDownIndex] = occupied;
        this.diagUp[diagonalUpIndex] = occupied;

        if (row === this.width - 1) {
          this.solutions.push(
            this.columns.slice(0)
          );

          for (
            let rowIndex = 0;
            rowIndex < this.solutions.length;
            ++rowIndex
          ) {
            let solution = this.solutions[
              rowIndex
            ];
            var line = '';
            for (
              let colIndex = 0;
              colIndex < this.solutions.length;
              ++colIndex
            ) {
              line +=
                columnNames[colIndex] +
                (solution[colIndex] + 1 + ' ');
            }
          }
        } else {
          this.tryNewQueen(row + 1);
        }

        this.columns[column] = -1;
        this.diagDown[diagDownIndex] = free;
        this.diagUp[diagonalUpIndex] = free;
      }
    };
  }

  let myBoard = new Board();
  myBoard.tryNewQueen(0);
  solutionsQty = myBoard.solutions.length;

  document.querySelector(
    '#currentSolution'
  ).innerHTML = 1;

  document.querySelector(
    '#totalSolutions'
  ).innerHTML = solutionsQty;

  for (
    let rowIndex = 0;
    rowIndex < myBoard.solutions.length;
    ++rowIndex
  ) {
    let solution = myBoard.solutions[rowIndex];
    let singleSolution = [];
    for (
      let colIndex = 0;
      colIndex < solution.length;
      ++colIndex
    ) {
      singleSolution.push(
        columnNames[colIndex] +
          (solution[colIndex] + 1)
      );
    }
    allSolutions.push(singleSolution);
  }

  function displaySolution(solutionId) {
    for (
      let index = 0;
      index < allSolutions[solutionId].length;
      index++
    ) {
      document.querySelector(
        '#' +
          allSolutions[solutionId][index] +
          ' .queen'
      ).style.fill =
        '#D33682';
    }
  }

  function clearBoard() {
    for (
      let colIndex = 0;
      colIndex < columnNames.length;
      colIndex++
    ) {
      for (
        let rowIndex = 0;
        rowIndex < numColumns;
        rowIndex++
      ) {
        document.querySelector(
          '#' +
            columnNames[colIndex] +
            (rowIndex + 1) +
            ' .queen'
        ).style.fill =
          'transparent';
      }
    }
  }

  displaySolution(currentSolution);

  document
    .querySelector('#previous')
    .addEventListener('click', function(e) {
      currentSolution--;
      if (currentSolution < 1) {
        currentSolution = allSolutions.length - 1;
      }
      clearBoard();
      document.querySelector(
        '#currentSolution'
      ).innerHTML =
        currentSolution + 1;
      displaySolution(currentSolution);
    });

  document
    .querySelector('#next')
    .addEventListener('click', function(e) {
      currentSolution++;
      if (
        currentSolution >
        allSolutions.length - 1
      ) {
        currentSolution = 0;
      }
      clearBoard();
      document.querySelector(
        '#currentSolution'
      ).innerHTML =
        currentSolution + 1;
      displaySolution(currentSolution);
    });

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

//getting html content
const loader = document.querySelector('.loader');
const cells = document.querySelectorAll('.game td');
const turnPara = document.querySelector('.turn');
const turn = document.querySelector('.turn span');
const end = document.querySelector('.end');
const scoreboard = document.querySelectorAll('.flex table tr td');
const win = document.querySelector('.winPopup');
const draw = document.querySelector('.drawPopup');
const reset = document.querySelector('.resetPopup');
const winner = document.querySelector('.winPopup span');
const restart = document.querySelectorAll('.restart');
const resetBtn = document.querySelector('.reset');
const resetQuery = document.querySelectorAll('.resetPopup button');


//updating scoreboard
window.addEventListener('load', () => {
  if(localStorage.getItem('player1') &&localStorage.getItem('player2')) {
    let player1 = localStorage.getItem('player1');
    let player2 = localStorage.getItem('player2');
    scoreboard[0].textContent = player1;
    scoreboard[1].textContent = player2;
  }
  else if (localStorage.getItem('player1') && !localStorage.getItem('player2')) {
    let player1 = localStorage.getItem('player1');
    scoreboard[0].textContent = player1;
    scoreboard[1].textContent = '0';
  }
  else if (!localStorage.getItem('player1') && localStorage.getItem('player2')) {
    let player2 = localStorage.getItem('player2');
    scoreboard[0].textContent = '0';
    scoreboard[1].textContent = player2;
  }
  else {
    scoreboard[0].textContent = '0';
    scoreboard[1].textContent = '0';
  }
});


//ensuring loader sits tight in its new position after the animation has ended and ensuring that content isn't cut due to vertical overflow
loader.addEventListener('animationend', e => {
  e.target.style.top = '-105vh'
  document.body.style.overflowY = 'auto';
});


//adding event listeners to table cells
for (let cell of cells) {
  cell.addEventListener('click', play);
  cell.addEventListener('animationend', text);
}
//clicking on the table cells adds a swivel animation (check css)
function play(e) {
  e.target.classList.add('cell');
}
//when the animation ends, add text to the clicked cell, then update current player turn. Also check for matches horizontally, vertically and diagonally and end the game either if there's a match or all cells have been filled with no match (ascertained with the callback functions)
function text(e) {
  e.target.textContent = turn.textContent;
  if(turn.textContent == 'X') turn.textContent = 'O';
  else turn.textContent = 'X';
  
  if (cells[0].textContent == cells[1].textContent && cells[0].textContent == cells[2].textContent && cells[0].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[3].textContent == cells[4].textContent && cells[3].textContent == cells[5].textContent && cells[3].innerHTML != '&nbsp;&nbsp;&nbsp;') {
      ended();
    }
  else if (cells[6].textContent == cells[7].textContent && cells[6].textContent == cells[8].textContent && cells[6].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[0].textContent == cells[3].textContent && cells[0].textContent == cells[6].textContent && cells[0].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[1].textContent == cells[4].textContent && cells[1].textContent == cells[7].textContent && cells[1].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[2].textContent == cells[5].textContent && cells[2].textContent == cells[8].textContent && cells[2].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[0].textContent == cells[4].textContent && cells[0].textContent == cells[8].textContent && cells[0].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else if (cells[2].textContent == cells[4].textContent && cells[2].textContent == cells[6].textContent && cells[2].innerHTML != '&nbsp;&nbsp;&nbsp;') {
    ended();
  }
  else check();
}
//callback functions i.e. our enders
function ended() {
  //displaying game over message
  turnPara.style.display = 'none';
  end.style.display = 'block';
  //incrementing scoreboard and ensuring that the right winner is displayed. The scores are updated on local storage
  if(turn.textContent == 'X') {
    scoreboard[1].textContent = Number(scoreboard[1].textContent) + 1;
    winner.textContent = 'O';
    localStorage.setItem('player2', scoreboard[1].textContent);
  }
  else if (turn.textContent == 'O') {
    scoreboard[0].textContent = Number(scoreboard[0].textContent) + 1;
    winner.textContent = 'X';
    localStorage.setItem('player1', scoreboard[0].textContent);
  }
  //winPopup appears
  win.showModal();
}
//checking if the cells are all filled without any matches so as to end the game
function check() {
  let bool = [];
  for(cell of cells) {
    if(cell.innerHTML== '&nbsp;&nbsp;&nbsp;') {
      bool.push(true);
    }
  }
  if(bool.length == 0) {
    draws();
  }
}
//defining draw function
function draws() {
  //displaying game over message
  turnPara.style.display = 'none';
  end.style.display = 'block';
  //drawPopup appears
  draw.showModal();
}


//time to restart the game
//firstly add event listeners to the restart buttons
for(let res of restart) {
  res.addEventListener('click', replay);
}
//defining replay function
function replay() {
  //first close modals
  draw.close();
  win.close();
  //display updated turn i.e. always starts with X and game over message isn't needed
  turn.textContent = 'X';
  turnPara.style.display = 'block';
  end.style.display = 'none';
  //time to empty cells, oh! don't forget to remove 'cell' class name
  for(let cell of cells) {
    cell.innerHTML = '&nbsp;&nbsp;&nbsp;';
    cell.classList.remove('cell');
  }
}


//add functionality to reset button
resetBtn.addEventListener('click', () => {
  reset.showModal();
});
//if yes is clicked, clear scoreboard and delete local storage copy
resetQuery[0].addEventListener('click', () => {
  for(let score of scoreboard) score.textContent = '0';
  localStorage.clear();
  reset.close();
});
//else if no is clicked, just close popup 
resetQuery[1].addEventListener('click', () => {
  reset.close();
});
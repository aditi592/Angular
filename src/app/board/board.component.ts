import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {  // OnInit is the lifecycle hook

  squares:any[];//for array of 9 elements
  xIsNext:boolean; //who is next
  winner:string; //winner either X or Y
  isSqaureFilled:boolean;


  //Can inject dependencies in Constructor
  constructor() { }

  //lifecycle hook
  ngOnInit() {

    //set up initial values when starting new game 
    this.newGame();
    this.isSqaureFilled = false;
  }
  newGame() {
    this.squares=Array(9).fill(null);
    this.winner=null;
    this.xIsNext=true;
  }


  handleNewGame() {

    setTimeout( () => { this.newGame(); }, 1500 );
  }
  get player()
  {
    //IF its value is true X is next else O
    return this.xIsNext ? 'X' : 'O';
  }

  //event handler for when the user  clicks on one of button to make a move
  makeMove(idx:number){

    //chech index if that square is already clicked or not
    if(!this.squares[idx]){
      this.squares.splice(idx,1,this.player); //if not splice it with the current player component
      this.xIsNext=!this.xIsNext;//toggle to opp value
    }
    this.winner=this.calculateWinner();
  
  }
  calculateWinner() {
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0;i<lines.length;i++){
      const[a,b,c]=lines[i];
      if(
        this.squares[a]&&
        this.squares[a]===this.squares[b]&&
        this.squares[a]===this.squares[c]
      ){
    
        return this.squares[a];
      
      }
      
    }

    this.isSqaureFilled  = this.checkIfSquaresFilled();



    return null;
  }

  checkIfSquaresFilled() {

    var isFilled = true;
    this.squares.forEach( function(item){

        if(item == null) {
          isFilled = false;
        }
    });

  

    return isFilled;
  }
}

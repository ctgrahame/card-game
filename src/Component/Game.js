import React from 'react';
import '../css/main.css';
import Board from '../Component/Board';

const bgColors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)',
    'hsl(25, 502%, 65%)',
    'hsl(55, 50%, 65%)',
    'hsl(90, 50%, 65%)',
    'hsl(160, 50%, 65%)'
];

function generateContents(colorArr){
    
    const numberArray = [];
    for(let i=0; i<colorArr.length; i++){
       
        numberArray.push( [ i + 1, colorArr[i]], [ i + 1, colorArr[i]] );
    }
    
    for (var i = numberArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numberArray[i];
        numberArray[i] = numberArray[j];
        numberArray[j] = temp;
    }
    return numberArray;
};

class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            contents: this.generateContents(bgColors),
            openedCards: Array(bgColors.length*2).fill(false),
            cardClicked: [],
            prevCard: -1,
            prevCardId: -1,
            startButton: 'click cards!'
        }

        this.handleClick = this.handleClick.bind(this);
        this.generateContents = this.generateContents.bind(this);
        this.startGame = this.startGame.bind(this);
        
    }

    generateContents(bgColors){
        const contents = generateContents(bgColors);
        return contents;
    }

    openCard(id, el){
        el.style.backgroundColor = this.state.contents[id][1];
        el.innerText = el.value;
    }

    cardClosed(card1, card2){
        card1.style.backgroundColor = 'hsl(195, 61%, 78%)';
        card1.innerText = '';
        card2.style.backgroundColor = 'hsl(195, 61%, 78%)';
        card2.innerText = '';
    }

    handleClick(e){
        e.preventDefault();
        const card = e.target;
        const cardId = e.target.id;
        const openedCardsArr = this.state.openedCards.slice(0);
        const cardClicked = this.state.cardClicked;

        if(!openedCardsArr[cardId]){
            cardClicked.push(card);
        }

        this.setState( prevState => {
          return {
                openedCards: openedCardsArr,
                cardClicked: cardClicked,
                prevCard: prevState.contents[cardId],
                prevCardId: cardId,
               
            }
        });

        const newCard = this.state.contents[cardId];
        const prevCard = this.state.prevCard;
        const prevCardId = this.state.prevCardId;
       
        if( !openedCardsArr[cardId] && cardClicked.length < 2){
            openedCardsArr[cardId] = !openedCardsArr[cardId];
            this.openCard(cardId, card);
            
        }

        if( !openedCardsArr[cardId] && cardClicked.length === 2){
            openedCardsArr[cardId] = !openedCardsArr[cardId];
            this.openCard(cardId, card);

            if( newCard[0] === prevCard[0]) {
                openedCardsArr[cardId] = true;
                openedCardsArr[prevCardId] = true;

                this.setState({
                    cardClicked: []
                })
                
            } else {
                openedCardsArr[cardId] = !openedCardsArr[cardId];
                openedCardsArr[prevCardId] = !openedCardsArr[prevCardId];
               
            }
   
        }

        if( cardClicked.length > 2 && !openedCardsArr[cardId]){
            
            const card1 = cardClicked[0];
            const card1Id = card1.id;
            const card2 = cardClicked[1];
            const card2Id = card2.id;
            
            if( !openedCardsArr[card1Id] && !openedCardsArr[card2Id]){
                this.cardClosed(card1, card2);
            }

            this.setState({ 
                cardClicked: [],
            }); 

        }

        if(openedCardsArr.every( item => item === true)){
            this.setState({
                startButton: 'Congratulations! click me to play again!'
            })
        }
    }

    startGame(){
        const cards = document.querySelectorAll('.card');
        cards.forEach( card => {
                card.style.backgroundColor = 'hsl(195, 61%, 78%)';
                card.innerText = '';
        })

        this.setState({
            contents: this.generateContents(bgColors),
            openedCards: Array(bgColors.length*2).fill(false),
            cardClicked: [],
            prevCard: -1,
            prevCardId: -1,
            startButton: 'click cards!'
        })
    }

    render(){
        
        return(
            <div className='game'>
                <Board contents={this.state.contents} onClick={this.handleClick} openedCards={this.state.openedCards} cardId={this.state.prevCardId} />
                <div className='start'>
                    <button className='startBtn' onClick={this.startGame}>{this.state.startButton}</button>
                </div>
            </div>

        )
    }
}

export default Game;
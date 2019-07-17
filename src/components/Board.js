import React from 'react';
import '../styles/Board.css';
import Card from './Card';

//24 cards

const Board = () => {



    const mockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]


    const cards = mockArray.map((card, index) => {
        return (
            <Card key={index} />
        )
    })

    return (
        <div id="board">
            {cards}
        </div>
    )

}

export default Board
import React, { useState } from 'react';
import '../styles/Board.css';

//24 cards

const Board = () => {

    const [cardClicked, setCardClicked] = useState(false)

    const cardState = cardClicked ? 'clicked' : null

    const toggleCard = () => setCardClicked(!cardClicked)

    const mockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]


    const cards = mockArray.map((card, index) => {
        return (
            <div className="card-area">
                <div className={`card ${cardState}`} key={index} onClick={toggleCard}>
                    <div className="card__face card__face--front"></div>
                    <div className="card__face card__face--back"></div>
                </div>
                <div className="inset">
                </div>
            </div>

        )
    })

    return (
        <div id="board">
            {cards}
        </div>
    )

}

export default Board
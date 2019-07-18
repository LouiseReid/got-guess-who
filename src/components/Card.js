import React, { useState } from 'react';
import '../styles/Card.css';


const Card = ({ character }) => {
    const [cardClicked, setCardClicked] = useState(false)

    const cardState = cardClicked ? 'clicked' : null

    const toggleCard = () => setCardClicked(!cardClicked)

    return (
        <div className="card-area">
            <div className={`card ${cardState}`} onClick={toggleCard}>
                <img src={character} className="card__face card__face--front" alt="character_card" />
                <div className="card__face card__face--back"></div>
            </div>
            <div className="inset">
            </div>
        </div>

    )

}

export default Card
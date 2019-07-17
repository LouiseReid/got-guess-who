import React, { useState } from 'react';
import '../styles/Card.css';


const Card = () => {
    const [cardClicked, setCardClicked] = useState(false)

    const cardState = cardClicked ? 'clicked' : null

    const toggleCard = () => setCardClicked(!cardClicked)

    return (
        <div className="card-area">
            <div className={`card ${cardState}`} onClick={toggleCard}>
                <div className="card__face card__face--front"></div>
                <div className="card__face card__face--back"></div>
            </div>
            <div className="inset">
            </div>
        </div>

    )

}

export default Card
import shuffle from "lodash.shuffle";
import React, { useState, useEffect } from 'react';
import arya from '../cards/arya.png';
import bran from '../cards/bran.png';
import brienne from '../cards/brienne.png';
import bronn from '../cards/bronn.png';
import cersei from '../cards/cersei.png';
import daenerys from '../cards/daenerys.png';
import davos from '../cards/davos.png';
import hodor from '../cards/hodor.png';
import hound from '../cards/hound.png';
import jaime from '../cards/jaime.png';
import joffrey from '../cards/joffrey.png';
import jon from '../cards/jon.png';
import jorah from '../cards/jorah.png';
import littlefinger from '../cards/littlefinger.png';
import margaery from '../cards/margaery.png';
import melisandre from '../cards/melisandre.png';
import sam from '../cards/sam.png';
import sansa from '../cards/sansa.png';
import shae from '../cards/shae.png';
import stannis from '../cards/stannis.png';
import theon from '../cards/theon.png';
import tyrion from '../cards/tyrion.png';
import tywin from '../cards/tywin.png';
import varys from '../cards/varys.png';
import '../styles/Board.css';
import Card from './Card';


const Board = () => {


    const characters = [arya, bran, brienne, bronn, cersei, daenerys, davos, hodor, hound, jaime, joffrey, jon, jorah, littlefinger, margaery, melisandre, sam, sansa, shae, stannis, theon, tyrion, tywin, varys]

    const cards = characters.map((character, index) => {
        return (
            <Card key={index} character={character} />
        )
    })

    const playersCard = shuffle(characters)[0]


    return (
        <div id="board__container">
            <div id="board">
                <div id="card-container">
                    {cards}
                </div>
                <div className="card" id="players-card">
                    <img src={playersCard} alt="players_card" className="card__face card__face--front" />
                </div>
            </div>
        </div>
    )

}

export default Board
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from './Card';

const baseURL = "https://deckofcardsapi.com/api/deck";

const CardDealer = () => {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [seconds, setSeconds] = useState(0);
    let timerId = useRef();
    const [dealt, setDealt] = useState(0);
    const [remaining, setRemaining] = useState(52);
    const [dealNow, setDealNow] = useState(false);
    const [startTimer, setStartTimer] = useState(false);

    // call the API to shuffle a new deck, just once
    useEffect(() => {
        async function shuffle() {
            setDealNow(false);
            const theDeck = await axios.get(`${baseURL}/new/shuffle/`);
            setDeck(theDeck.data.deck_id)            
        }
        shuffle();
        
    }, []);

    // start and stop the timer when the start/stop button is pressed, cards are dealt 1 per second, timer is stopped when no cards remain
    useEffect(() => {
        if (startTimer) {
        timerId.current = setInterval(() => {
            setSeconds(seconds => seconds + 1)
        }, 1000);
        return function cleanUpClearTimer() {
            clearInterval(timerId.current);
          };
        };
    }, [timerId, startTimer]);

    // call the API to deal 1 card, stop the timer when no cards remain
    useEffect(() => {    
        async function deal() {
            if (deck && dealNow) {
                const theCard = await axios.get(`${baseURL}/${deck}/draw/?count=1`); 
                setRemaining(theCard.data.remaining)
                theCard.data.remaining === 0 ? setStartTimer(false) : setCard(theCard.data.cards[0].image);
            // } else {
            //     console.log("no deck yet")
            }
        }        
        deal() 
    }, [deck, dealt, seconds, dealNow]);   

    const getCard = () => {
        setDealt(dealt => dealt + 1)
        setDealNow(true);
        setStartTimer(true);
    }
    
    const stopDealin = () => {
        setDealNow(false);
        setStartTimer(false);
    }

      return (
        <>
         {dealNow && remaining > 0 ? 
            <div><p><button onClick={stopDealin}>STOP DEALIN THEM CARDS</button></p></div> :
            <div>{remaining > 0 ? <p><button onClick={getCard}>GIMME SOME CARDS</button></p> : <h3>No Cards Left to Deal</h3>}</div>
        }
            {card === null ? "" :         
                <Card          
                image={card}
                />
            }
        </>
      );
}

export default CardDealer;
import React from 'react';
import './Fretboard.css';

const NUM_FRETS = 12;
const NUM_STRINGS = 6;

const Fretboard = () => {
    return (
        <div className="fretboard">
            <ul className="fret-row">
                <li className="string1">
                    <span>3</span>
                </li>
                <li className="string2"></li>
                <li className="string3"></li>
                <li className="string4"></li>
                <li className="string5"></li>
                <li className="string6"></li>
            </ul>
            <ul className="fret-row">
                <li className="string1"></li>
                <li className="string2"></li>
                <li className="string3"></li>
                <li className="string4"></li>
                <li className="string5"></li>
                <li className="string6"></li>
            </ul>            

        </div>
    );
};

export default Fretboard;
import React from 'react';
import {dottedFrets, getNote} from './guitarService';
import FretNote from './FretNote';
import './Fretboard.css';

const NUM_FRETS = 18;
const NUM_STRINGS = 6;

type FretboardState = {
    tuning: string[],
    keySig: string,
    notes: string[]
};

const getFretDotClass = (fretNum: number): string => {
    if (fretNum % 12 === 0) return 'twodots';
    if (dottedFrets.includes(fretNum)) return 'dot';
    return '';
};


const Fretboard = (props: FretboardState) => {
    const {tuning, notes, keySig} = props;
    console.log(keySig);
    return (
        <div className="fretboard">
            <ul className="nut-row">
                {tuning.map((note, ndx) => (
                    <li  
                        key={`string-tuning-${ndx}`}
                        className={`string${ndx+1}`}>{note}</li>    
                ))}
            </ul>
            {Array.from(Array(NUM_FRETS)).map((_, fretNdx) => (
                <ul 
                    key={`fret-${fretNdx}`}
                    className={`fret-row ${getFretDotClass(fretNdx+1)}`}>
                    {Array.from(Array(NUM_STRINGS)).map((_, ndx) => (
                        <FretNote 
                            key={`fret-${fretNdx}-string-${ndx}`}
                            keySig={keySig}
                            className={`string${ndx+1}`}
                            keyNotes={notes}
                            stringNote={tuning[ndx]}
                            fretNum={fretNdx+1} />
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default Fretboard;
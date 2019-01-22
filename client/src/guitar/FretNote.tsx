import React from 'react';
import {getNote} from './guitarService';

type FretNoteState = {
    keyNotes: string[],
    stringNote: string,
    fretNum: number,
    className: string,
    keySig: string
};

const noteIndex = (keyNotes: string[], startNote: string, fretNum: number): number => {
    const note = getNote(startNote, fretNum);
    return keyNotes.indexOf(note) + 1;
};

const FretNote = (props: FretNoteState) => {
    const {keyNotes, stringNote, fretNum, className} = props;
    const noteNdx = noteIndex(keyNotes, stringNote, fretNum);
    return (
        <li 
            className={className}>
            { noteNdx === 0
                ? ''
                : <span className={`interval${noteNdx}`}>
                    {noteNdx}
                </span>
            }
        </li>
    );
}

export default FretNote;
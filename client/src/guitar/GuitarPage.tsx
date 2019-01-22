import React from 'react';
import {notes, buildScale, ScaleNames, standardTuning, Scales} from './guitarService';
import Fretboard from './Fretboard';
import './Guitar.css';

type GuitarState = {
    keySig: string;
    scale: Scales;
};

class GuitarPage extends React.Component {
    state: GuitarState = {
        keySig: 'C',
        scale: Scales.Major
    };

    constructor(props: any) {
        super(props);
    }

    changeKey(keySig: string, scale: Scales) {
        this.setState({
            keySig,
            scale
        });
    }

    render() {
        const {keySig, scale} = this.state;
        const scaleNotes = buildScale(keySig, scale);
        return (
            <>
                <h2>Guitar Page!</h2>
                <div className='all-notes'>
                {notes.map((note, ndx) => (
                  <button 
                    className={`${note === keySig ? 'active': ''}`}
                    key={`note-name-${ndx}`} 
                    onClick={() => this.changeKey(note, scale)}>
                        {note}
                    </button>  
                ))}
                </div>

                <div className='all-notes'>
                {Array.from(ScaleNames.entries()).map((entry, ndx) => {
                    const [scl, scaleName] = entry;
                    return <button 
                        className={`${scale === scl ? 'active': ''}`}
                        key={`scale-name-${ndx}`}
                        onClick={() => this.changeKey(keySig, scl)}>{scaleName}</button>                    
                })}
                </div>
                
                <div className="scale-notes">
                {scaleNotes.map((val, ndx) => (
                    <span key={`scale-note-${ndx}`}>{val}</span>
                ))}
                </div>

                <Fretboard 
                    tuning={standardTuning}
                    keySig={keySig}
                    notes={scaleNotes}
                />
            </>
        );
    }
}

export default GuitarPage;
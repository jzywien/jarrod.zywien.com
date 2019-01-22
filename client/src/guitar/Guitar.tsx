import React from 'react';
import {notes, buildScale, ScaleNames, Scales} from './guitarService';
import './Guitar.css';

type GuitarState = {
    key: string;
    scale: Scales;
};

class Guitar extends React.Component {
    state: GuitarState = {
        key: 'C',
        scale: Scales.Major
    };

    constructor(props: any) {
        super(props);
    }

    changeKey(key: string, scale: Scales) {
        this.setState({
            key,
            scale
        });
    }

    render() {
        const {key, scale} = this.state;
        const scaleNotes = buildScale(key, scale);
        return (
            <>
                <h2>Guitar Page!</h2>
                <div className='all-notes'>
                {notes.map((note, ndx) => (
                  <button 
                    className={`${note === key ? 'active': ''}`}
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
                        onClick={() => this.changeKey(key, scl)}>{scaleName}</button>                    
                })}
                </div>
                
                <div className="scale-notes">
                {scaleNotes.map((val, ndx) => (
                    <span key={`scale-note-${ndx}`}>{val}</span>
                ))}
                </div>
            </>
        );
    }
}

export default Guitar;
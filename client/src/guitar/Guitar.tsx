import React from 'react';
import {notes, buildScale} from './guitarService';
import './Guitar.css';

type GuitarState = {
    key: string;
    scale: string;
};

class Guitar extends React.Component {
    state: GuitarState = {
        key: 'C',
        scale: 'major'
    };

    constructor(props: any) {
        super(props);
    }

    changeKey(key: string) {
        this.setState({
            ...this.state,
            key
        });
    }

    render() {
        const {key} = this.state;
        const intervals = [2,2,1,2,2,2,1];
        const scale = buildScale(key, 'major');
        console.log(scale);
        return (
            <>
                <h2>Guitar Page!</h2>
                <div>
                {notes.map(note => (
                  <button onClick={() => this.changeKey(note)}>{note}</button>  
                ))}
                </div>
                <div className="scale-notes">
                {scale.map((val, index) => (
                    <span>{val}</span>
                ))}
                </div>
            </>
        );
    }
}


// const Guitar = () => {

//     const buildScale = (key: string, scale: number[]) => {
    
//         const notelist = allNotes.slice(allNotes.indexOf(key));
//         const scaleNotes = [];
//         for(let i = 0, noteNdx = 0; i < 7; ++i) {
//             const note = notelist[noteNdx];
//             scaleNotes.push(note);
//             noteNdx += scale[i];
//         }
//         return scaleNotes;
//     };
      

//     return (
//         <h2>Guitar Page!</h2>

//     );
// }

export default Guitar;
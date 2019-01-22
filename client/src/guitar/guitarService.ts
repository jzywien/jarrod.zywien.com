export const notes: string[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
export const scales: string[] = ['major', 'minor'];

const doubleNotes: string[] = notes.concat(notes);

const getScaleIntervals = (scale: string): number[] => {
    switch(scale) {
        case 'natural-minor': return [2,1,2,2,1,2,2];
        case 'harmonic-minor': return [2,1,2,2,1,3,1];
        case 'major': 
        default:
            return [2,2,1,2,2,2,1];
    }
};

const getScaleDistances = (scale: string): number[] => {
    const intervals = getScaleIntervals(scale);
    const distances = intervals.reduce((accum: number[], item, ndx) => {
        const prev = accum[accum.length - 1];
        return accum.concat(prev + item);
    }, [0]);
    return distances;
};

export const buildScale = (key: string, scale: string): string[] => {
    const startNote = doubleNotes.indexOf(key);
    const notelist = doubleNotes.slice(startNote);
    const distances = getScaleDistances(scale);

    return distances.map(distance => notelist[distance]);
};
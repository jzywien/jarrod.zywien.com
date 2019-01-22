export const notes: string[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

export enum Scales {
    Major,
    NaturalMinor,
    HarmonicMinor
};

export const ScaleNames = new Map<Scales, string>([
    [Scales.Major, 'Major'],
    [Scales.NaturalMinor, 'Natural Minor'],
    [Scales.HarmonicMinor, 'Harmonic Minor']
]);

const doubleNotes: string[] = notes.concat(notes);

const getScaleIntervals = (scale: Scales): number[] => {
    switch(scale) {
        case Scales.NaturalMinor: return [2,1,2,2,1,2,2];
        case Scales.HarmonicMinor: return [2,1,2,2,1,3,1];
        case Scales.Major: 
        default: return [2,2,1,2,2,2,1];
    }
};

const getScaleDistances = (scale: Scales): number[] => {
    const intervals = getScaleIntervals(scale);
    const distances = intervals.reduce((accum: number[], item, ndx) => {
        const prev = accum[accum.length - 1];
        return accum.concat(prev + item);
    }, [0]);
    return distances;
};

export const buildScale = (key: string, scale: Scales): string[] => {
    const startNote = doubleNotes.indexOf(key);
    const notelist = doubleNotes.slice(startNote);
    const distances = getScaleDistances(scale);

    return distances.map(distance => notelist[distance]);
};
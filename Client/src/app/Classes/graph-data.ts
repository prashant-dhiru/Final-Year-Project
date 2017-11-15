interface SeriesData {
    name: number | string;
    value: number | string;
    min?: number | string;
    max?: number | string;
}

class ColorScheme {
    constructor (
        public domain: string[]
    ) {}
}

class GraphData {
    constructor (
        public name: string | number,
        public series: SeriesData[]
    ) {}
}

export { SeriesData, GraphData, ColorScheme };

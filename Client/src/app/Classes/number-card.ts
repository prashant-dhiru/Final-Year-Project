import { SeriesData, ColorScheme } from './graph-data';

export class NumberCard {
    constructor (
        public view: number[],
        // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
        public results: SeriesData[],
        // the chart data
        public scheme: ColorScheme,
        // the color scheme of the chart
        public customColors: any,
        // custom colors for the chart. Used to override a color for a specific value
        public animations: boolean = true,
        // enable animations
        public cardColor: string,
        // color of the card background, defaults to color based on value and scheme
        public bandColor: string,
        // color of the card color-bar, defaults to color based on value and scheme
        public textColor: string,
        // color of the card text, defaults to the inverse of the card color
        public emptyColor: string = 'rgba(0, 0, 0, 0)',
        // color of empty card slots
        public innerPadding: number | number[] = 15,
        // padding around each card in px
        public valueFormatting?: any,
        // function function that formats the card value
        public labelFormatting?: any,
        // function function that formats the card label
    ) {}
}

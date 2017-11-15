import { GraphData, ColorScheme } from './graph-data';

export class AreaChart {
    constructor (
        public view: number[],
        // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
        public results: GraphData[],
        // the chart data
        public scheme: ColorScheme,
        // the color scheme of the chart
        public schemeType: string = 'ordinal',
        // the color scale type. Can be either 'ordinal' or 'linear'
        public customColors: any,
        // custom colors for the chart. Used to override a color for a specific value
        public animations: boolean = true,
        // enable animations
        public legend: boolean = false,
        // show or hide the legend
        public legendTitle: string = 'Legend',
        // the legend title
        public xAxis: boolean = false,
        // show or hide the x axis
        public yAxis: boolean = false,
        // show or hide the y axis
        public showGridLines: boolean = true,
        // show or hide the grid lines
        public roundDomains: boolean = false,
        // round domains for aligned gridlines
        public showXAxisLabel: boolean = false,
        // show or hide the x axis label
        public showYAxisLabel: boolean = false,
        // show or hide the y axis label
        public xAxisLabel: string,
        // the x axis label text
        public yAxisLabel: string,
        // the y axis label text
        public xAxisTickFormatting: any,
        // function the x axis tick formatting
        public yAxisTickFormatting: any,
        // function the y axis tick formatting
        public timeline: boolean = false,
        // display a timeline control under the chart. Only available if x scale is date
        public autoScale: boolean = false,
        // set the minimum value of the y axis to the minimum value in the data, instead of 0 (ignored if yScaleMin is defined)
        public curve: any,
        // function the interpolation function used to generate the curve. It accepts any d3.curve function
        public gradient: boolean = false,
        // fill elements with a gradient instead of a solid color
        public activeEntries: any[] = [],
        // elements to highlight
        public tooltipDisabled: boolean = false,
        // show or hide the tooltip
        public tooltipTemplate: any,
        // a custom ng-template to be displayed inside the tooltip when hovering a single point
        public seriesTooltipTemplate: any,
        // TemplateRef a custom ng-template to be displayed inside the tooltip when hovering series
        public xScaleMin: any,
        // the minimum value of the x axis (if the x scale is linear or time)
        public xScaleMax: any,
        // the maximum value of the x axis (if the x scale is linear or time)
        public yScaleMin: number,
        // the minimum value of the y axis
        public yScaleMax: number
        // the maximum value of the y axis (ignored if chart data contains a higher value)
    ) {}
}

import { GraphData, ColorScheme } from './graph-data';

export class NormailzedHorizontalBarChart {
    constructor (
        public results: GraphData[],
        // the chart data
        public scheme: ColorScheme,
        // the color scheme of the chart
        public schemeType: string = 'ordinal',
        // the color scale type. Can be either 'ordinal' or 'linear'
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
        public gradient: boolean = false,
        // fill elements with a gradient instead of a solid color
        public activeEntries: any[] = [],
        // elements to highlight
        public barPadding: number = 8,
        // padding between bars in px
        public tooltipDisabled: boolean = false,
        // show or hide the tooltip
        public tooltipTemplate?: any,
        // TemplateRef a custom ng-template to be displayed inside the tooltip
        public customColors?: any,
        // custom colors for the chart. Used to override a color for a specific value
        public view?: number[],
        // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
        public xAxisTickFormatting?: any,
        // function the x axis tick formatting
        public yAxisTickFormatting?: any
        // function the y axis tick formatting
    ) {}
}

/**
 * Outputs: 
 * select	click event
 * activate	element activation event (mouse enter)
 * deactivate	element deactivation event (mouse leave)
 */

 /**
  * <ngx-charts-bar-horizontal-normalized
    [results]=""
    [scheme]=""
    [schemeType]=""
    [animations]=""
    [legend]=""
    [legendTitle]=""
    [xAxis]=""
    [yAxis]=""
    [showGridLines]=""
    [roundDomains]=""
    [showXAxisLabel]=""
    [showYAxisLabel]=""
    [xAxisLabel]=""
    [yAxisLabel]=""
    [gradient]=""
    [activeEntries]=""
    [barPadding]=""
    [tooltipDisabled]=""
    [view]=""
></ngx-charts-bar-horizontal-normalized>
  */
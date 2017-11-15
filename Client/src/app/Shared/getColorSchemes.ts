import { ColorScheme } from '../Classes';

function getVividColorScheme () {}
function getNaturalColorScheme () {}
function getCoolColorScheme () {}
function getFireColorScheme () {}
function getSolarColorScheme () {}
function getAirColorScheme () {}
function getAquaColorScheme () {}
function getFlameColorScheme () {}
function getOceanColorScheme () {}
function getForestColorScheme () {}
function getHorizonColorScheme () {}
function getNeonsColorScheme () {}
function getPicnicColorScheme () {}
function getNightColorScheme () {}
function getNightLightsColorScheme () {}

function getArtHistoryInspiredColorScheme () {
    return new ColorScheme([
        '#FFCE00',
        '#0375B4',
        '#007849',
        '#262228'
    ]);
}

function getMutedAndMinimalColorScheme () {
    return new ColorScheme([
        '#96858F',
        '#6D7993',
        '#9099A2',
        '#D5D5D5'
    ]);
}

function getModernAndCleanColorScheme () {
    return new ColorScheme([
        '#E37222',
        '#07889B',
        '#66B9BF',
        '#EEAA7B'
    ]);
}

export {
    getModernAndCleanColorScheme,
    getMutedAndMinimalColorScheme,
    getArtHistoryInspiredColorScheme
};

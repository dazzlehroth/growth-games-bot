export async function sleep(seconds: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
}


interface convertHeights {
    metric: string;
    imperial: string;
    refImage: number;
}

export function convertHeight<convertedHeights>(input: number) {

    //Feet
    let imperialValue = input * 3.28084
    //Metres
    let metricValue = input

    let imperialString = "ft"

    let metricString = `${metricValue}m`


    //Less than a foot, go down to inches
    if (imperialValue < 1) {
        //Only show decimals for less than an inch
        if (Math.floor(imperialValue * 12) === 0) {
            imperialString = `${(imperialValue * 12).toFixed(5)}in`
        } else {
            imperialString = `${Math.floor(imperialValue * 12)}in`
        }
    }
    //1 - 20 ft, keep in inches for a bit of granularity
    else if (imperialValue >= 1 && imperialValue < 20) {

        imperialString = `${Math.floor(imperialValue)}ft and ${Math.floor((imperialValue % 1) * 12)}in`

    }
    //20ft - 1 mile, Just keep to feet
    else if (imperialValue >= 20 && imperialValue < 5200) {
        imperialString = `${Math.floor(imperialValue)}ft`
    }
    //Up to 10 Miles have 2 DP in mile measurement
    else if (imperialValue >= 5200 && imperialValue < 52000) {
        imperialString = `${(imperialValue / 5200).toFixed(2)}mi`
    } else {

        imperialString = ` ${Math.floor(imperialValue / 5200)}mi`

    }

    //Fractions of MM
    if (metricValue < 0.001){
        metricString = `${(metricValue * 1000).toFixed(5)}mm`
    }
    //At least 1mm
    else if (metricValue < 0.01){
        metricString = `${Math.floor(metricValue * 1000)}mm`
    }
    //Less than 1m use centimeters
    else if (metricValue < 1) {
        metricString = `${Math.floor(metricValue * 100)}cm`
    }
    //Up to 100m use 2 dp
    else if (metricValue < 100) {
        metricString = `${metricValue.toFixed(2)}m`
    }
    //Metres with no DP
    else if (metricValue < 1000) {
        metricString = `${Math.floor(metricValue)}m`
    }
    // Swap to KM with 2DP
    else if (metricValue < 100000) {
        metricString = `${(metricValue / 1000).toFixed(2)}km`
    } else {
        metricString = `${Math.floor(metricValue / 1000)}km`

    }


    return {
        metric: `${metricString}`,
        imperial: `${imperialString}`,
        refImage: 1
    }

}
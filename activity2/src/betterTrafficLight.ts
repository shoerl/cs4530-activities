import { reduceEachLeadingCommentRange } from "typescript"

export type Color = "red" | "green" | "yellow"

const lookupTable : Record<Color, Color> = {
    "red": "green", 
    "yellow": "red", 
    "green": "yellow"
}

const defaultStartTimerAt : number = 20

export function timerAtNextSecond (time:number) : number {
    if (time == 1) {return defaultStartTimerAt} else {return (time - 1)}
   
}

export function colorAtNextSecond (color:Color,time:number) : Color {
    return (time === 1) ? lookupTable[color] : color;
   
}

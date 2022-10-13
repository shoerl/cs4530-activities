//import { Color, timerAtNextSecond, colorAtNextSecond } from './TrafficLight'
import { Color, timerAtNextSecond, colorAtNextSecond } from './BetterTrafficLight'

test("tests for timerAtNextSecond", () => {
    expect(timerAtNextSecond(17)).toBe(16)
    expect(timerAtNextSecond(1)).toBe(20)
})


test("tests for TrafficLight", () => {
    expect(colorAtNextSecond("red",7)).toEqual("red")
    expect(colorAtNextSecond("red",1)).toEqual("green")
    expect(colorAtNextSecond("green",1)).toEqual("yellow")
    expect(colorAtNextSecond("yellow",1)).toEqual("red")
})
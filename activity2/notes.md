

Question 1. 

Violations:

1. Make your data mean something: 
   * Kind of a nitpick, but Color would be better suited for an enum rather than a color
2. Don't Repeat Yourself: 
   * The (time===1) ternary expression is repeated three times
3. Don't Repeat Yourself: 
   * She could simplify this by just checking if time === 1 at the beginning and return the same color if so (this would also allow her to remove the three repeating ternary expressions)
4. Don't Repeat Yourself & Don't Hardcode Things That Are Likely To Change: 
   * She could also make a transition type of {color: color} (could use general hashmap to do this as well), and then just return the output of that if the time isn't 1
5. Don't Hardcode Things That Are Likely To Change
   * She could have used a variable for the default timer start time
   * The 20 second timer is hardcoded but could change


Question 3.

Our code assumes that all traffic lights operate for the same amount of time regardless of color. Additionally, assuming a specific color, they assume that all traffic lights operate for a set amount of time (assuming that it is static and not dynamic). In reality green lights last the longest, then red, and finally yellow (yellow is drastically shorter than green and red).The client is very likely to be unhappy with the assumptions we made as it will not accurately replicate or emulate how traffic lights actually behave. You could expand the Color type to have two fields, the string color, and the number timerStartAt. Using this, the timer countdown function would also have to take in the current color, but if you did that as well you would be able to have dynamic traffic light timer times like I described

# React Class Based Component Memory Game

## How to play
- 2 rows of 8 intially grey squares are shown on the screen 
- Click one square to select it and see its true color (which is selected at random)
- Click another square to compare the two to see if the colors match
- If the colors match the cards remain flipped up; if not they both return to the hidden (turns grey) state
- After all 8 pairs are matched the game ends and the timer at the bottom of the screen stops; try to finish as quick as possible!


## Techniques
- Mainly build using the older React class based components for the gameBoard component with the timer written with hooks mainly because I found it simpler.
- Showcases a basic React matching game and how to create a very basic timer in React with useState, useEffect and useRef

## FAQ
- Q: Some colors don't match together even though they look alike!
- A: Yes, the game generates a hex value with the following snippet 
```
let color = "#" + Math.floor(Math.random() * this.TOTAL_HEX_COLORS).toString(16);
```
meaning there could possibly be colors that look exetremely similar but are actually
1 or 2 shades off from matching. (Hard to distinguish)


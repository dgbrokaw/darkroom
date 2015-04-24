# darkroom

## Running the experiment
The experiment can be run by opening the experiment.html file in a browser (I used chrome).

## The 'darkroom'
The experiment is currently in 'test mode,' so only the block with the new stuff will be shown.  I haven't written a complete instructions page yet, so that's all there is to see.

There are two black areas where the shapes will appear.  Above the black areas are 'buttons.'  When the 'Show me more' button is clicked, the buttons will highlight.

There is a drop-down selection menu to choose which pattern the user thinks is occuring in a set of shapes.  The user chooses a pattern and enters their confidence with a slider.

Click the submit button to record that "impression."
You can submit any number of impressions you want.  Once the 'Show me more' button has been clicked, no more shapes can be revealed until an impression has been submitted.
Clicking the 'Next area' button will also record whatever is currently entered.

## Defining stimuli
The shapes that will be revealed are detailed in the stimuli.js file.

There are three shapes available: 'square,' 'circle,' and 'triangle.'

There are three sizes: small,' 'medium,' and 'large.'

You can set whether a shape has a fill or not.  The fill is the same color as the shape's border.

## Data
For each trial, this will be recorded:
- the stimuli associated with that trial (including the 'answer')
- for each submit,
	- the currently revealed shapes
	- the total time of the entire experiment up to that point
	- anything they entered into the input fields

When the experiment is over, the data will be saved locally in a file called 'darkroom_data.json'.
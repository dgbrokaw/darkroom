# darkroom

## Running the experiment
The experiment can be run by opening the experiment.html file in a browser (I used chrome).

## The 'darkroom'
The experiment is currently in 'test mode,' so only the block with the new stuff will be shown.  I haven't written a complete instructions page yet, so that's all there is to see.
Currently the list of stimuli is one long, so clicking the 'Next area' button will end the program.

There are two black areas, where the shapes will appear.  Above the black areas are buttons.  Click on those to reveal shapes.
Enter anything you want in the text boxes, and/or click the checkbox if you think it's random, and set a confidence value.  Click the submit button to record that "impression."
You can submit any number of impressions you want.  There are currently no rules defining the allowed combinations/orders of revealing shapes and submitting impressions.
Clicking the 'Next area' button will also record whatever is currently entered.

## Defining stimuli
The shapes that will be revealed are detailed in the stimuli.js file.

There are five shapes available: 'square,' 'rectangle,' 'circle,' 'ellipse,' and 'triangle.'

There are five sizes: 'x-small,' 'small,' 'medium,' 'large,' and 'x-large.'

You can enter any color with a color code or name.
http://www.w3schools.com/html/html_colornames.asp

You can optionally set a rotation.  In the example stimuli the square is rotated by 30 degrees.

The shapes defined in the 'independentShapes' list are the shapes that will appear in the left area.  The shapes defined in the 'dependentShapes' list will appear in the right area.  (If the x and y values are set too high or at a negative value they will not appear).

The first shape in the list of independent shapes is the 'target' shape -- the one you want the user to guess what will match in the right area.  It will be shown automatically, and the first button will be disabled.  There will be a red arrow pointing at it.

The 'answer' field doesn't do anything, but it's recorded, so you can put anything you want there.

## Data
For each trial, this will be recorded:
- the stimuli associated with that trial (including the 'answer')
- for each submit,
	- the currently revealed shapes
	- the total time of the entire experiment up to that point
	- anything they entered into the input fields

When the experiment is over, the data will be saved locally in a file called 'darkroom_data.json'.
/** (February 2015, David Brokaw)
The darkroom-plugin will show two black areas containing hidden objects.
The user will reveal the objects by pressing buttons.
They will record their feelings about the relation between the specified object and an object in the other area.

*/

// TODO: proper logic for next button changing.
// make sure reveals logic is correct

(function($) {
	jsPsych['darkroom'] = (function() {

		var plugin = {};

		plugin.create = function(params) {

			// params = jsPsych.pluginAPI.enforceArray(params, ...);

			var trials = [];

			for (var i=0; i<params.stimuli.length; i++) {
				var trial = {};
				var stimulus = params.stimuli[i];

				trial.trialNum = i+1;
				trial.stimulusNum = stimulus.stimulusNum;
				trial.options = stimulus.options;
				trial.independentShapes = stimulus.independentShapes;
				trial.dependentShapes = stimulus.dependentShapes;
				trial.patterns = stimulus.patterns;
				trial.target = stimulus.target;
				trial.answer = stimulus.answer;
				trials.push(trial);
			}

			return trials;
		};

		plugin.trial = function(display_element, trial) {

			// trial = jsPsych.pluginAPI.normalizeTrialVariables(trial);

			var reveals = [];
			var trial_data = [];
			var lastConfidenceLevel = 100;
			var oneSubmission = false;
			var displayingShapes = false;
			   // ,lastRandomConfidenceLevel = 100;

			function assignColorsToShapes() {
				var scale = d3.scale.category20();
				scale.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
				for (var i=0; i<trial.independentShapes.length; i++) {
					var c = scale(i+1);
					trial.independentShapes[i].color = c;
					trial.dependentShapes[i].color = c;
				}
			}

			function initializeHTML() {
				display_element.html(darkroom_html);

				d3.select('#trialNum').text(trial.trialNum + (trial.trialNum===6 ? ' Feel free to take a 5 minute break.' : ''));

				// if (trial.options.sliderForRandom && trial.patterns[0].description==='Random') {
				// 	trial.patterns.splice(0, 1);
				// }
				displayListOfPatternImages(trial.patterns);

				disableRandomSlider(trial.options.sliderForRandom);

				addPatternOptions(trial.patterns);
				displaySelectedPatternImage();
			}

			function disableRandomSlider(sliderForRandom) {
				if (!sliderForRandom) {
					//d3.select('#randomSelectionDiv').node().hidden = true;
					d3.select('#randomSelectionDiv').remove();
				}
			}

			function addPatternOptions(patterns) {
				var select = d3.select('#patternSelection');

				select.selectAll('option')
					.data(patterns).enter()
					.append('option')
					.attr('value', function(d) {return d.image})
					.text(function(d) {return d.description});
			}

			function displaySelectedPatternImage() {
				var comboBox = d3.select('#patternSelection');
				var selectedImageName = comboBox.node().value;
				displayPatternImage('patternImages/'+selectedImageName);
			}

			function displayPatternImage(imageName) {
				d3.select('#patternImageContainer').append('image')
					.attr('id', 'patternImage')
					.attr('width', '100%')
					.attr('height', '100%')
					.attr('x', '0px')
					.attr('y', '0px')
					.attr('xlink:href', imageName);
			}

			function setupShapeButtons() {
				var x = 4;
				for (var i=1; i<11; i++) {
					var b = d3.select('#buttonArea1').append('button')
						.attr('id', 'button-1-'+i)
						.classed('shapeButton', true)
						.attr('disabled', true)
						.style({'left': x+Math.random()*3+'%'});
					x += 4;
				}
				x = 4;
				for (var i=1; i<11; i++) {
					var b = d3.select('#buttonArea2').append('button')
						.attr('id', 'button-2-'+i)
						.classed('shapeButton', true)
						.attr('disabled', true)
						.style({'left': x+Math.random()*5+'%'})
					x += 4;
				}
			}

			function setupFormListener() {
				d3.select('#confidence').on('input', function() {
					updateConfidence(+this.value);
				});

				updateConfidence(100);

				// d3.select('#random-confidence').on('input', function() {
				// 	updateRandomConfidence(+this.value);
				// });

				//updateRandomConfidence(100);

				d3.select('#patternSelection').on('change', function() {
					displaySelectedPatternImage();
				})

				d3.select('#submit').on('click', function() {
					submitImpression(reveals.slice()
												 	,d3.select('#patternSelection').property('value')
												 	,d3.select('#confidence').property('value'));
												 	// ,d3.select('#random-confidence').property('value'));
				});
			}

			function updateConfidence(confidenceValue) {
				d3.select('#confidence').property('value', confidenceValue);

				if (trial.options.showSliderNumericFeedback) {
					d3.select('#confidence-value').text(confidenceValue);
				} else {
					d3.select('#confidenceLabel').remove();
					// d3.select('#confidence-value').text('');
				}
			}

			function updateRandomConfidence(confidenceValue) {
				d3.select('#random-confidence').property('value', confidenceValue);

				if (trial.options.showSliderNumericFeedback) {
					d3.select('#random-confidence-value').text(confidenceValue);
				} else {
					d3.select('#randomConfidenceLabel').remove();
					// d3.select('#random-confidence-value').text('');
				}
			}

			function setupPatternListButtonListener() {
				if (trial.options.listPatternImages) {
					d3.select('#patternListButton').on('click', function() {
						appendHelpDiv();
						displayListOfPatternImages(trial.patterns);
					});
				} else {
					d3.select('#patternListButton').remove();
				}
			}

			function setupInstructionsButtonListener() {
				d3.select('#instructionsButton').on('click', function() {
					appendHelpDiv();
					displayInstructions();
				})
			}

			function appendHelpDiv() {
				var div = d3.select('body').insert('div', ':first-child')
					.attr('id', 'helpDiv');

				var button = div.append('button')
					.attr('id', 'closeHelpButton')
					.text('X');

				button.on('click', function() {
					div.remove();
				});
			}

			function displayListOfPatternImages(patterns) {
				var container = d3.select('#helpDiv');

				patternPreviews = container.selectAll('div')
					.data(patterns).enter()
					.append('div')
					.classed('patternPreview', true);

				patternPreviews.append('svg')
					.attr('width', '200px')
					.attr('height', '200px').append('image')
						.attr('width', '200px')
						.attr('height', '200px')
						.attr('x', '0px')
						.attr('y', '0px')
						.attr('xlink:href', function(d) {return 'patternImages/'+d.image});
			}

			function displayInstructions() {
				var container = d3.select('#helpDiv');

				var instructions = [
					'Hover the mouse over an object for a description of its features.'
				 ,'Choose the pattern you think is being shown in the drop-down menu.'
				 ,'You must adjust the slider before being able to submit your response.'
				 ,'Click submit once you have made your decision.  You can submit any number of responses you want, but you must submit at least one response each time you reveal more objects.'
				 ,'When all the objects have been revealed, and you have submitted a final response, you may continue to the next area by clicking the "Go to the next area" button.'
				];

				for (var i=0; i<instructions.length; i++) {
					container.append('p')
						.classed('instructionsParagraph', true)
						.text(instructions[i])
						.attr('font-size', '12pt');
				}
			}

			// these following setups are associated with the 'advance' button
			function setupShowMeMoreButtonListener() {
				var button = d3.select('#advance');

				button.property('disabled', false);

				button.property('value', 'Show me more');
				button.text('Show me more');
				button.style({'background': 'lightgreen'});

				button.on('click', function() {
					if (displayingShapes) {
						return;
					}
					disableShowMeMoreButton(this);
					revealShapes();
				});
			}

			function setupNextAreaButtonListener() {
				var button = d3.select('#advance');

				button.property('disabled', false);

				button.property('value', 'Go to the next area');
				button.text('Go to the next area');
				button.style({'background': 'lightgreen'});

				button.on('click', function() {
					submitImpression(reveals.slice()
												 	,d3.select('#patternSelection').property('value')
												 	,d3.select('#confidence').property('value'));
												 	// ,d3.select('#random-confidence').property('value'));
					jsPsych.data.write($.extend({}, {trial: trial}, {impressions: trial_data}));
					display_element.html('');
					jsPsych.finishTrial();
				})
			}

			function disableShowMeMoreButton() {
				var button = d3.select('#advance');

				button.property('disabled', true);

				button.property('value', 'Tell us what you think');
				button.text('Tell us what you think');
				button.style({'background': '#C0C0C0'});

				d3.select('#submit').style('background', 'lightgreen');
			}

			function highlightShapeButton(shape, color) {
				var buttonID = '#button-';
				if (shape.isIndependent) {
					buttonID += '1-'
				} else {
					buttonID += '2-'
				}
				buttonID += shape.pairNum;

				d3.select(buttonID).style({'background': color});
			}

			function revealShapes() {
				displayingShapes = true;
				revealRandomShapeOnSide('left');
			}

			function revealRandomShapeOnSide(side, lastShape) {
				var newShape = getUnusedRandomShape(side==='left' ? trial.independentShapes : trial.dependentShapes);

				highlightShapeButton(newShape, 'lightgreen');

				revealShape(newShape);

				if (side==='left') {
					setTimeout(function() {
						highlightShapeButton(newShape, 'ghostwhite');
						revealRandomShapeOnSide('right', newShape);
					}, 1000);
				} else if (!aNewCompletePairHasBeenRevealed(newShape, lastShape)) {
					setTimeout(function() {
						highlightShapeButton(newShape, 'ghostwhite');
						revealRandomShapeOnSide('left');
					}, 1000);
				} else {
					highlightShapeButton(newShape, 'ghostwhite');
					displayingShapes = false;
				}
			}

			function getUnusedRandomShape(shapes) {
				var tries = 1;
				var randomIDX = Math.floor(Math.random()*shapes.length);
				var randomShape = shapes[randomIDX];
				while (shapeHasAlreadyBeenRevealed(randomShape)) {
					randomIDX = Math.floor(Math.random()*shapes.length);
					randomShape = shapes[randomIDX];
					tries++
				}
				return randomShape;
			}

			function shapeHasAlreadyBeenRevealed(shape) {
				for (var i=0; i<reveals.length; i++) {
					if (reveals[i].shapeID === shape.shapeID) {
						return true;
					}
				}
				return false;
			}

			function aNewCompletePairHasBeenRevealed(newIndependentShape, newDependentShape) {
				for (var i=0; i<reveals.length; i++) {
					if (reveals[i].shapeID!==newIndependentShape.shapeID && reveals[i].pairNum===newIndependentShape.pairNum) {
						return true;
					}
				}
				for (var i=0; i<reveals.length; i++) {
					if (reveals[i].shapeID!==newDependentShape.shapeID && reveals[i].pairNum===newDependentShape.pairNum) {
						return true;
					}
				}
				return false;
			}

			function revealShape(shape) {
				var darkroom = d3.select(shape.isIndependent ? '#darkroom1' : '#darkroom2');

				console.log(shape);
				if (shape) {
					reveals.push(shape);
					appendShapeToDarkroom(darkroom, shape);
				}
			}

			function appendShapeToDarkroom(darkroom, shape) {
				var width = darkroom.property('width').baseVal.value
				   ,height = darkroom.property('height').baseVal.value;
				shape.x = shape.x*width*0.90;
				shape.y = shape.y*height*0.90;

				var shapeElement;
				switch (shape.type) {
					case 'square':
						shapeElement = appendSquareToDarkroom(darkroom, shape);
						break;
					case 'circle':
						shapeElement = appendCircleToDarkroom(darkroom, shape);
						break;
					case 'triangle':
						shapeElement = appendTriangleToDarkroom(darkroom, shape);
						break;
				}

				var attributeIdentifierText;
				shapeElement.on('mouseover', function() {
					attributeIdentifierText = d3.select(shape.isIndependent ? '#darkroomArea1' : '#darkroomArea2').append('div')
						.classed('attributeIdentifierText', true)
						.text(shape.type + '; ' + shape.size + '; ' + (shape.fill ? 'filled' : 'not filled'));
				});
				shapeElement.on('mouseout', function() {
					attributeIdentifierText.remove();
				});
			}

			function appendSquareToDarkroom(darkroom, shape) {
				var x, y, width, height, rotation, color, stroke;
				switch (shape.size) {
					case 'small':
						width = 25;
						stroke = 4;
						break;
					case 'medium':
						width = 50;
						stroke = 8;
						break;
					case 'large':
						width = 110;
						stroke = 14;
						break;
				}
				height = width;
				x = shape.x - width/2;
				y = shape.y - height/2;
				color = shape.color;

				return darkroom.append('rect')
					.attr('id', 'shape'+reveals.length)
					.attr('x', x)
					.attr('y', y)
					.attr('width', width)
					.attr('height', height)
					.style({'stroke-width': stroke, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			}

			function appendCircleToDarkroom(darkroom, shape) {
				var cx, cy, r, stroke;
				switch (shape.size) {
					case 'small':
						r = 25/2;
						stroke = 4;
						break;
					case 'medium':
						r = 50/2;
						stroke = 8;
						break;
					case 'large':
						r = 110/2;
						stroke = 14;
						break;
				}
				x = shape.x;
				y = shape.y;
				color = shape.color;

				return darkroom.append('circle')
					.attr('id', 'shape'+reveals.length)
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', r)
					.style({'stroke-width': stroke, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			}

			function appendTriangleToDarkroom(darkroom, shape) {
				var x, y, scale, rotation, strokeWidth, stroke;
				switch (shape.size) {
					case 'small':
						scale = 0.5; strokeWidth = 12;
						break;
					case 'medium':
						scale = 1.3; strokeWidth = 3;
						break;
					case 'large':
						scale = 2.5; strokeWidth = 2.80;
						break;
				}
				x = shape.x;
				y = shape.y;
				color = shape.color;

				var transform = 'translate('+x+','+y+')' +
												' scale('+scale+')';

				return darkroom.append('polygon')
					.attr('id', 'shape'+reveals.length)
					.attr('points', '0,-20 25,20 -25,20')
					.attr('transform', transform)
					.style({'stroke-width': 8, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			}

			function getRotationString(rotationAngle, cx, cy) {
				if (cx && cy) {
					return 'rotate('+rotationAngle+','+cx+','+cy+')';
				} else {
					return 'rotate('+rotationAngle+')';
				}
			}

			assignColorsToShapes();
			initializeHTML();
			setupShapeButtons();
			setupFormListener();
			setupPatternListButtonListener();
			setupInstructionsButtonListener();
			setupShowMeMoreButtonListener();

			function submitImpression(reveals, pattern, confidence, randomConfidence) {
				if (!oneSubmission && parseInt(confidence)===lastConfidenceLevel) {
					d3.select('#pleaseAdjustSliders').text('Please adjust the slider.');
					return;
				} else if (parseInt(confidence)!==100 && parseInt(confidence)===lastConfidenceLevel) {
					d3.select('#pleaseAdjustSliders').text('Please adjust the slider.');
					return;
				} else {
					lastConfidenceLevel = parseInt(confidence);
					d3.select('#pleaseAdjustSliders').text('');
				}

				oneSubmission = true;
				d3.select('#submit').style('background', '#eaeaea')
				console.log(reveals, pattern, confidence, randomConfidence);
				trial_data.push({subjectID: subject_id
					              ,reveals: reveals
				                ,userData: {time: jsPsych.totalTime()
					               					 ,userPattern: pattern
					               					 ,userConfidence: confidence}});
					               					 // ,userRandomConfidence: randomConfidence}});

				if (reveals.length === trial.independentShapes.length+trial.dependentShapes.length) {
					setupNextAreaButtonListener();
				} else {
					setupShowMeMoreButtonListener();
				}
			}
		}

	 var darkroom_html =
	 		"<div id='trialNum'></div>" +
			"<div class='darkroomArea' id='darkroomArea1'>" +
	  		"<div class='buttonArea' id='buttonArea1'></div>" +
	  		"<svg class='darkroom' id='darkroom1'></svg>" +
	  	"</div>" +
	  	"<div class='darkroomArea' id='darkroomArea2'>" +
	  		"<div class='buttonArea' id='buttonArea2'></div>" +
	  		"<svg class='darkroom' id='darkroom2'></svg>" +
	  	"</div>" +
	  	"<div class='clear'></div>" +

	  	"<div class='responseArea'>" +
	  		"<div class='responses'>" +
		  		"<div id='patternImageDiv'>" +
		  			"<svg id='patternImageContainer'></svg>" +
		  		"</div>" +
  				"<div id='patternSelectionDiv'>" +
  					"<p style='font-size:10pt'><strong><ins>Select pattern:</ins></strong></p>" +
	  				"<select id='patternSelection'></select>" +
  				"</div>" +
  				"<div id='confidenceSelectionDiv'>" +
  					// "<p style='font-size:10pt'><strong><ins>How confident are you this is the pattern?</ins></strong></p>" +
  					"<p style='font-size:10pt'><strong><ins>How confident are you that all of the objects (including the unrevealed objects) will follow this pattern?</ins></strong></p>" +
  					"<p style='font-size:10pt'>" +
  						"<input type='range' id='confidence' min='0' max='100' step='1' style='display: inline-block; width: 80%; margin-left: 10%'></input>" +
  						"<p><div class='sliderLimitDescription' style='float: left'><i>I'm only guessing.</i></div>" +
  						"<div class='sliderLimitDescription' style='float: right'><i>I'm certain.</i></div></p>" +
  					"</p>" +
	  				"<label id='confidenceLabel' for='confidence'>" +
	  				  "Confidence = <span id='confidence-value' style='display: inline-block; margin: auto'>…</span>" +
	  				"</label>" +
  				"</div>" +
  				"<div id='randomSelectionDiv'>" +
  					"<p style='font-size:10pt'><strong><ins>How likely do you think this is to be random?</ins></strong></p>" +
  					"<p>" +
  						"<input type='range' id='random-confidence' min='0' max='100' step='1' style='display: inline-block; width: 80%; margin-left: 10%'></input>" +
  						"<p><div class='sliderLimitDescription' style='float: left'><i>There's definitely a pattern.</i></div>" +
  						"<div class='sliderLimitDescription' style='float: right'><i>Definitely random.</i></div></p>" +
  					"</p>" +
  					"<label id='randomConfidenceLabel' for='random'>" +
  						"Random confidence = <span id='random-confidence-value' style='display: inline-block; margin: auto'>...</span>" +
  					"</label>" +
  				"</div>" +
  				"<div id='submitButtonDiv'>" +
	  				"<div id='pleaseAdjustSliders' style='font-size: 10pt; width: 40%; float: left; margin-left: 5%'></div>" +
  					"<button style='float: right; width: 40%; margin-right: 5%' id='submit'>Submit</button>" +
  				"</div>" +
	  		"</div>" +
	  	"</div>" +

	  	"<div id='patternListButtonDiv'>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 30%; height: 4%; float: left;' id='patternListButton'>Patterns</button>" +
	  	"</div>" +
	  	"<div id='instructionsButtonDiv'>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 30%; height: 4%; float: left;' id='instructionsButton'>Instructions</button>" +
	  	"</div>" +
	  	"<div id='advanceButtonDiv'>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 30%; height: 4%; float: right;' id='advance'>Show me more</button>" +
	  	"</div>";

		return plugin;

	})();

})(jQuery);
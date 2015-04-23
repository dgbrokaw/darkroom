/** (February 2015, David Brokaw)
The darkroom-plugin will show two black areas containing hidden objects.
The user will reveal the objects by pressing buttons.
They will record their feelings about the relation between the specified object and an object in the other area.

*/

(function($) {
	jsPsych['darkroom'] = (function() {

		var plugin = {};

		plugin.create = function(params) {

			// params = jsPsych.pluginAPI.enforceArray(params, ...);

			var trials = [];

			for (var i=0; i<params.stimuli.length; i++) {
				var trial = {};
				var stimulus = params.stimuli[i];

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

				if (trial.options.sliderForRandom && trial.patterns[0].description==='Random') {
					trial.patterns.splice(0, 1);
				}
				displayListOfPatternImages(trial.patterns);

				disableRandomSlider(trial.options.sliderForRandom);

				addPatternOptions(trial.patterns);
				displaySelectedPatternImage();
			}

			function disableRandomSlider(sliderForRandom) {
				if (!sliderForRandom) {
					d3.select('#randomSelectionDiv').node().hidden = true;
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
						.style({'left': x+Math.random()*3+'%'});
					b.on('click', function() {
						disableButton(this);
						revealShape(this.id);
					});
					x += 4;
				}
				x = 4;
				for (var i=1; i<11; i++) {
					var b = d3.select('#buttonArea2').append('button')
						.attr('id', 'button-2-'+i)
						.classed('shapeButton', true)
						.style({'left': x+Math.random()*5+'%'})
					b.on('click', function() {
						disableButton(this);
						revealShape(this.id);
					});
					x += 4;
				}
			}

			function setupFormListener() {
				d3.select('#confidence').on('input', function() {
					updateConfidence(+this.value);
				});

				updateConfidence(100);

				d3.select('#random-confidence').on('input', function() {
					updateRandomConfidence(+this.value);
				});

				updateRandomConfidence(100);

				d3.select('#patternSelection').on('change', function() {
					displaySelectedPatternImage();
				})

				d3.select('#submit').on('click', function() {
					submitImpression(reveals
												 	,d3.select('#patternSelection').property('value')
												 	,d3.select('#confidence').property('value')
												 	,d3.select('#random-confidence').property('value'));
				});
			}

			function updateConfidence(confidenceValue) {
				if (trial.options.showSliderNumericFeedback) {
					d3.select('#confidence-value').text(confidenceValue);
					d3.select('#confidence').property('value', confidenceValue);
				} else {
					d3.select('#confidence-value').text('');
				}
			}

			function updateRandomConfidence(confidenceValue) {
				if (trial.options.showSliderNumericFeedback) {
					d3.select('#random-confidence-value').text(confidenceValue);
					d3.select('#random-confidence').property('value', confidenceValue);
				} else {
					d3.select('#random-confidence-value').text('');
				}
			}

			function setupPatternListButtonListener() {
				if (trial.options.listPatternImages) {
					d3.select('#patternListButton').on('click', function() {
						appendPatternListDiv();
						displayListOfPatternImages(trial.patterns);
					});
				} else {
					d3.select('#patternListButton').remove();
				}
			}

			function appendPatternListDiv() {
				var div = d3.select('body').insert('div', ':first-child')
					.attr('id', 'patternListDiv');

				var button = div.append('button')
					.attr('id', 'closePatternListButton')
					.text('X');

				button.on('click', function() {
					div.remove();
				})
			}

			function displayListOfPatternImages(patterns) {
				var container = d3.select('#patternListDiv');

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

			function setupNextButtonListener() {
				d3.select('#next').on('click', function() {
					submitImpression(reveals
												 	,d3.select('#patternSelection').property('value')
												 	,d3.select('#confidence').property('value')
												 	,d3.select('#random-confidence').property('value'));
					jsPsych.data.write($.extend({}, {trial: trial}, {impressions: trial_data}));
					display_element.html('');
					jsPsych.finishTrial();
				})
			}

			function disableButton(button) {
				d3.select(button).property('hidden', true);
			}

			function revealShape(buttonID) {
				var parts = buttonID.split('-');

				var dependency = parseInt(parts[1])===1 ? 'independent' : 'dependent'
				   ,idxOfShape = parseInt(parts[2])
				   ,shape = dependency==='independent' ? getShapeByIDX(trial.independentShapes, idxOfShape) : getShapeByIDX(trial.dependentShapes, idxOfShape);
				var darkroom = d3.select(dependency==='independent' ? '#darkroom1' : '#darkroom2');

				console.log(shape);
				if (shape) {
					reveals.push(shape);
					appendShapeToDarkroom(darkroom, shape);
				}
			}

			function getShapeByIDX(shapes, idx) {
				for (var i=0; i<shapes.length; i++) {
					var s = shapes[i];
					if (s.buttonNum===idx) {
						return s;
					}
				}
				return null;
			}

			function appendShapeToDarkroom(darkroom, shape) {
				var width = darkroom.property('width').baseVal.value
				   ,height = darkroom.property('height').baseVal.value;
				shape.x = shape.x*width*0.90;
				shape.y = shape.y*height*0.90;
				switch (shape.type) {
					case 'square':
						appendSquareToDarkroom(darkroom, shape);
						break;
					case 'circle':
						appendCircleToDarkroom(darkroom, shape);
						break;
					case 'triangle':
						appendTriangleToDarkroom(darkroom, shape);
						break;
				}
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

				darkroom.append('rect')
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

				darkroom.append('circle')
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

				darkroom.append('polygon')
					.attr('id', 'shape'+reveals.length)
					.attr('points', '0,-20 25,20 -25,20')
					.attr('transform', transform)
					.style({'stroke-width': 8, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			}


			// function appendSquareToDarkroom(darkroom, shape) {
			// 	var x, y, width, height, rotation, color, stroke;
			// 	switch (shape.size) {
			// 		case 'small':
			// 			width = 25;
			// 			stroke = 4;
			// 			break;
			// 		case 'medium':
			// 			width = 75;
			// 			stroke = 12;
			// 			break;
			// 		case 'large':
			// 			width = 125;
			// 			stroke = 22;
			// 			break;
			// 	}
			// 	height = width;
			// 	x = shape.x - width/2;
			// 	y = shape.y - height/2;
			// 	color = shape.color;

			// 	darkroom.append('rect')
			// 		.attr('id', 'shape'+reveals.length)
			// 		.attr('x', x)
			// 		.attr('y', y)
			// 		.attr('width', width)
			// 		.attr('height', height)
			// 		.style({'stroke-width': stroke, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			// }

			// function appendCircleToDarkroom(darkroom, shape) {
			// 	var cx, cy, r, stroke;
			// 	switch (shape.size) {
			// 		case 'small':
			// 			r = 25/2;
			// 			stroke = 4;
			// 			break;
			// 		case 'medium':
			// 			r = 75/2;
			// 			stroke = 12;
			// 			break;
			// 		case 'large':
			// 			r = 125/2;
			// 			stroke = 22;
			// 			break;
			// 	}
			// 	x = shape.x;
			// 	y = shape.y;
			// 	color = shape.color;

			// 	darkroom.append('circle')
			// 		.attr('id', 'shape'+reveals.length)
			// 		.attr('cx', x)
			// 		.attr('cy', y)
			// 		.attr('r', r)
			// 		.style({'stroke-width': stroke, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			// }

			// function appendTriangleToDarkroom(darkroom, shape) {
			// 	var x, y, scale, rotation, strokeWidth, stroke;
			// 	switch (shape.size) {
			// 		case 'small':
			// 			scale = 0.5; strokeWidth = 16;
			// 			break;
			// 		case 'medium':
			// 			scale = 1.5; strokeWidth = 5.35;
			// 			break;
			// 		case 'large':
			// 			scale = 3; strokeWidth = 2.65;
			// 			break;
			// 	}
			// 	x = shape.x - scale;
			// 	y = shape.y - scale;
			// 	color = shape.color;

			// 	var transform = 'translate('+x+','+y+')' +
			// 									' scale('+scale+')';

			// 	darkroom.append('polygon')
			// 		.attr('id', 'shape'+reveals.length)
			// 		.attr('points', '0,-20 25,20 -25,20')
			// 		.attr('transform', transform)
			// 		.style({'stroke-width': 8, 'stroke': color, 'fill': shape.fill ? color : 'none'});
			// }

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
			setupNextButtonListener();

			function submitImpression(reveals, pattern, confidence, randomConfidence) {
				console.log(reveals, pattern, confidence, randomConfidence);
				trial_data.push({subjectID: subject_id
					              ,reveals: reveals
				                ,userData: {time: jsPsych.totalTime()
					               					 ,userPattern: pattern
					               					 ,userConfidence: confidence
					               					 ,userRandomConfidence: randomConfidence}});
			}
		}

	 var darkroom_html =
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
  					"<p><strong><ins>Select pattern:</ins></strong></p>" +
	  				"<select id='patternSelection'></select>" +
  				"</div>" +
  				"<div id='confidenceSelectionDiv'>" +
  					"<p><strong><ins>How confident are you?</ins></strong></p>" +
  					"<p style='font-size:10pt'>" +
  						"<i>I'm only guessing.</i>" +
  						"<input type='range' id='confidence' min='0' max='100' step='1' style='display: inline-block; margin-left: 5%; margin-right: 5%'></input>" +
  						"<i>I'm certain.</i>" +
  					"</p>" +
	  				"<label for='confidence'>" +
	  				  "Confidence = <span id='confidence-value' style='display: inline-block; margin: auto'>…</span>" +
	  				"</label>" +
  				"</div>" +
  				"<div id='randomSelectionDiv'>" +
  					"<p><strong><ins>How confident are you this is random?</ins></strong></p>" +
  					"<p style='font-size:10pt'>" +
  						"<i>I'm only guessing.</i>" +
  						"<input type='range' id='random-confidence' min='0' max='100' step='1' style='display: inline-block; margin-left: 5%; margin-right: 5%'></input>" +
  						"<i>I'm certain.</i>" +
  					"</p>" +
  					"<label for='random'>" +
  						"Random confidence = <span id='random-confidence-value' style='display: inline-block; margin: auto'>...</span>" +
  					"</label>" +
  				"</div>" +
  				"<div id='submitButtonDiv'>" +
  					"<button style='float: right; width: 40%; margin-right: 5%' id='submit'>Submit</button>" +
  				"</div>" +
	  		"</div>" +
	  	"</div>" +
	  	"<div id='patternListButtonDiv'>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 45%; height: 4%; float: left;' id='patternListButton'>Patterns</button>" +
	  	"</div>" +
	  	"<div id='nextButtonDiv'>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 45%; height: 4%; float: right;' id='next'>Next area</button>" +
	  	"</div>";

		return plugin;

	})();

})(jQuery);
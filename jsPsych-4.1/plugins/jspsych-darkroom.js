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

				trial.independentShapes = stimulus.independentShapes;
				trial.dependentShapes = stimulus.dependentShapes;
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

			function initializeHTML() {
				display_element.html(darkroom_html);
			}

			function setupShapeButtons() {
				for (var i=1; i<11; i++) {
					var b = d3.select('#buttonArea1').append('button')
						.attr('id', 'button1-'+i)
						.classed('shapeButton', true)
						.style({'margin-left': (Math.random()*10+5)+'px', 'margin-top': (Math.random()*40)+'px'});
					b.on('click', function() {
						disableButton(this);
						revealShape(this.id);
					});
				}
				for (var i=1; i<11; i++) {
					var b = d3.select('#buttonArea2').append('button')
						.attr('id', 'button2-'+i)
						.classed('shapeButton', true)
						.style({'margin-left': (Math.random()*10+5)+'px', 'margin-top': (Math.random()*40)+'px'});
					b.on('click', function() {
						disableButton(this);
						revealShape(this.id);
					});
				}
			}

			function revealTargetShape() {
				disableButton('#button1-1');
				revealShape('#button1-1');
				appendTargetArrow();
			}

			function appendTargetArrow() {
				var darkroom = d3.select('#darkroom1');
				var shapeBB = d3.select('#shape1')[0][0].getBoundingClientRect()
				   ,darkroomBB = darkroom[0][0].getBoundingClientRect();
				var is_circle = reveals[0].type==='circle';
				var is_triangle = reveals[0].type==='triangle';
				var arrow = darkroom.append('path')
					.attr('stroke', 'red')
					.attr('stroke-width', 4)
					.attr('fill', 'none')
					.attr('d', 'M 2 12' +
										 'L 42 12' +
										 'M 32 2' +
										 'L 42 12' +
										 'L 32 22')
					.attr('transform', 'translate('+(shapeBB.left-darkroomBB.left-10 - (is_circle ? 25 : 0) + (is_triangle ? 25 : 0))+','+(shapeBB.top-darkroomBB.top)+') rotate(20)');
			}

			function setupFormListener() {
				d3.select('#confidence').on('input', function() {
					updateConfidence(+this.value);
				});

				updateConfidence(0);

				d3.select('#submit').on('click', function() {
					submitImpression(reveals
												 	,d3.select('#shape').property('value')
						              ,d3.select('#size').property('value')
						              ,d3.select('#color').property('value')
						              ,d3.select('#random').property('checked')
						              ,d3.select('#confidence').property('value'));
				});
			}

			function updateConfidence(confidenceValue) {
				d3.select('#confidence-value').text(confidenceValue);
				d3.select('#confidence').property('value', confidenceValue);
			}

			function setupNextButtonListener() {
				d3.select('#next').on('click', function() {
					submitImpression(reveals
												 	,d3.select('#shape').property('value')
						              ,d3.select('#size').property('value')
						              ,d3.select('#color').property('value')
						              ,d3.select('#random').property('checked')
						              ,d3.select('#confidence').property('value'));
					jsPsych.data.write($.extend({}, {trial: trial}, {impressions: trial_data}));
					display_element.html('');
					jsPsych.finishTrial();
				})
			}

			function disableButton(button) {
				d3.select(button)
					.classed('shapeButton', null)
					.attr('disabled', 'disabled');
			}

			function revealShape(buttonID) {
				var dependency = parseInt(buttonID.slice(-3, -2))===1 ? 'independent' : 'dependent'
				   ,idxOfShape = parseInt(buttonID.slice(-1))-1 // get last letter of id string, subtract 1 for zero-indexing
				   ,shape = dependency==='independent' ? trial.independentShapes[idxOfShape] : trial.dependentShapes[idxOfShape];
				var darkroom = d3.select(dependency==='independent' ? '#darkroom1' : '#darkroom2');

				if (dependency==='independent' ? trial.independentShapes[idxOfShape] : trial.dependentShapes[idxOfShape]) {
					reveals.push(shape);
					appendShapeToDarkroom(darkroom, shape);
				}
			}

			function appendShapeToDarkroom(darkroom, shape) {
				switch (shape.type) {
					case 'square':
						appendSquareToDarkroom(darkroom, shape);
						break;
					case 'rectangle':
						appendRectangleToDarkroom(darkroom, shape);
						break;
					case 'circle':
						appendCircleToDarkroom(darkroom, shape);
						break;
					case 'ellipse':
						appendEllipseToDarkroom(darkroom, shape);
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
						width = 75;
						stroke = 12;
						break;
					case 'large':
						width = 125;
						stroke = 22;
						break;
				}
				height = width;
				x = shape.x;
				y = shape.y;
				if (shape.rotation) rotation = getRotationString(shape.rotation, x+width/2, y+height/2);
				color = shape.color;

				darkroom.append('rect')
					.attr('id', 'shape'+reveals.length)
					.attr('x', x)
					.attr('y', y)
					.attr('width', width)
					.attr('height', height)
					.attr('transform', rotation ? rotation : '')
					.style({'stroke-width': stroke, 'stroke': color, 'fill': 'none'});
			}

			function appendRectangleToDarkroom(darkroom, shape) {
				var x, y, width, height, rotation, stroke;
				switch (shape.size) {
					case 'small':
						width = 25; height = 15; stroke = 4;
						break;
					case 'medium':
						width = 75; height = 45; stroke = 12;
						break;
					case 'large':
						width = 125; height = 65; stroke = 22;
						break;
				}
				x = shape.x;
				y = shape.y;
				if (shape.rotation) rotation = getRotationString(shape.rotation, x+width/2, y+height/2);
				color = shape.color;

				darkroom.append('rect')
					.attr('id', 'shape'+reveals.length)
					.attr('x', x)
					.attr('y', y)
					.attr('width', width)
					.attr('height', height)
					.attr('transform', rotation ? rotation : '')
					.style({'stroke-width': stroke, 'stroke': color, 'fill': 'none'});
			}

			function appendCircleToDarkroom(darkroom, shape) {
				var cx, cy, r, stroke;
				switch (shape.size) {
					case 'small':
						r = 25/2;
						stroke = 4;
						break;
					case 'medium':
						r = 75/2;
						stroke = 12;
						break;
					case 'large':
						r = 125/2;
						stroke = 22;
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
					.style({'stroke-width': stroke, 'stroke': color, 'fill': 'none'});
			}

			function appendEllipseToDarkroom(darkroom, shape) {
				var cx, cy, rx, ry, rotation, stroke;
				switch (shape.size) {
					case 'small':
						rx = 25; ry = 15; stroke = 4;
						break;
					case 'medium':
						rx = 75; ry = 45; stroke = 12;
						break;
					case 'large':
						rx = 125; ry = 65; stroke = 22;
						break;
				}
				cx = shape.x;
				cy = shape.y;
				color = shape.color;
				if (shape.rotation) rotation = getRotationString(shape.rotation, cx, cy);

				darkroom.append('ellipse')
					.attr('id', 'shape'+reveals.length)
					.attr('cx', cx)
					.attr('cy', cy)
					.attr('rx', rx)
					.attr('ry', ry)
					.attr('transform', rotation ? rotation : '')
					.style({'stroke-width': stroke, 'stroke': color, 'fill': 'none'});
			}

			function appendTriangleToDarkroom(darkroom, shape) {
				var x, y, scale, rotation, strokeWidth, stroke;
				switch (shape.size) {
					case 'small':
						scale = 0.5; strokeWidth = 16;
						break;
					case 'medium':
						scale = 1.5; strokeWidth = 5.35;
						break;
					case 'large':
						scale = 3; strokeWidth = 2.65;
						break;
				}
				x = shape.x;
				y = shape.y;
				color = shape.color;
				if (shape.rotation) rotation = getRotationString(shape.rotation, 55, 25);

				var transform = 'translate('+x+','+y+')' +
												(rotation ? rotation : '') +
												' scale('+scale+')';

				darkroom.append('polygon')
					.attr('id', 'shape'+reveals.length)
					.attr('points', '25,0 50,40 0,40')
					.attr('transform', transform)
					.style({'stroke-width': 8, 'stroke': color, 'fill': 'none'});
			}

			function getRotationString(rotationAngle, cx, cy) {
				if (cx && cy) {
					return 'rotate('+rotationAngle+','+cx+','+cy+')';
				} else {
					return 'rotate('+rotationAngle+')';
				}
			}

			initializeHTML();
			setupShapeButtons();
			setupFormListener();
			revealTargetShape();
			setupNextButtonListener();

			function submitImpression(shape, size, color, random, confidence) {
				trial_data.push({reveals: reveals
				                ,userData: {time: jsPsych.totalTime()
					               					 ,userShape: shape
					                         ,userSize: size
					                         ,userColor: color
					                         ,userRandom: random
					                         ,userConfidence: confidence}});
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
  				"<p>" +
	  				"<label for='shape' class='text-label'>Shape:</label>" +
	  				"<input type='text' id='shape'>" +
	  				"<label for='size' class='text-label'>Size:</label>" +
	  				"<input type='text' id='size'>" +
	  				"<label for='color' class='text-label'>Color:</label>" +
	  				"<input type='text' id='color'>" +
  				"</p>" +
  				"<p>" +
	  				"<label class='text-label' style='width: 80px; margin-left: 100px'>Random</label>" +
	  				"<input type='checkbox' name='random' value='random' id='random' class='random'>" +
	  				"<label for='confidence'" +
	  							 "style='display: inline-block; width: 150px; text-align: right; margin-left: 150px; margin-right: 20px'>" +
	  							 "Confidence = <span id='confidence-value' style='display: inline-block'>…</span>" +
	  				"</label>" +
	  				"<input type='range' id='confidence' min='0' max='100' step='1' style='display: inline-block'>" +
  				"</p>" +
  				"<button style='margin-top: 2%; margin-left: 2%; width: 95%;' id='submit'>Submit</button>" +
	  		"</div>" +
	  	"</div>" +
	  	"<div>" +
	  		"<button style='margin-top: 2%; margin-left: 2%; width: 45%; height: 4%; float: right;' id='next'>Next area</button>" +
	  	"</div>";

		return plugin;

	})();

})(jQuery);
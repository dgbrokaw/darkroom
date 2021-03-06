var stimuli = [

	{

		options: {
			listPatternImages: true
		 ,showSliderNumericFeedback: true
		 ,sliderForRandom: true
		}

	 ,independentShapes: [
			{
		 		type: 'triangle'
		 	 ,size: 'large'
		 	 ,fill: 'yellow'
		 	 ,x: 50
		 	 ,y: 100
		 	 ,color: 'lightseagreen'
		 	}
		 ,{
		 		type: 'triangle'
		 	 ,size: 'medium'
		 	 ,x: 50
		 	 ,y: 200
		 	 ,color: 'lightseagreen'
		 	}
		 ,{
		 		type: 'triangle'
		 	 ,size: 'small'
		 	 ,x: 50
		 	 ,y: 300
		 	 ,color: 'lightseagreen'
		 	}
		 ,{
				type: 'square'
			 ,size: 'large'
			 ,x: 100
			 ,y: 100
			 ,color: 'yellow'
			}
		 ,{
				type: 'square'
			 ,size: 'medium'
			 ,x: 100
			 ,y: 200
			 ,color: 'yellow'
			}
		 ,{
				type: 'square'
			 ,size: 'small'
			 ,x: 100
			 ,y: 300
			 ,color: 'yellow'
			}
		 ,{
		 		type: 'circle'
		 	 ,size: 'large'
		 	 ,x: 150
		 	 ,y: 100
		 	 ,color: 'lawngreen'
			}
		 ,{
		 		type: 'circle'
		 	 ,size: 'medium'
		 	 ,x: 150
		 	 ,y: 200
		 	 ,color: 'lawngreen'
			}
		 ,{
		 		type: 'circle'
		 	 ,size: 'small'
		 	 ,x: 150
		 	 ,y: 300
		 	 ,color: 'lawngreen'
			}
		]

	 ,dependentShapes: [
		 	{
				type: 'square'
			 ,size: 'medium'
			 ,x: 30
			 ,y: 30
			 ,color: 'yellow'
			}
	  ]

	 ,patterns: [
	 		{
	 	 		description: 'Random'
	 	 	 ,image: 'Random.png'
	 	 	}
	 	 ,{
	 	 		description: 'Circle-Square-Triangle'
	 	 	 ,image: 'Circle-Square-Triangle.png'
	 	 	}
	 	 ,{
	 	 		description: 'Large-Medium-Small'
	 	 	 ,image: 'Large-Medium-Small.png'
	 	 	}
	 	 ,{
	 	 		description: 'Small-Medium-Large'
	 	 	 ,image: 'Small-Medium-Large.png'
	 	 	}
	 	 ,{
	 	 		description: 'Not-Filled--Filled'
	 	 	 ,image: 'Large-Medium-Small.png'
	 	 	}
	 	 ,{
	 			description: 'Circle-Triangle-Square'
	 		 ,image: 'Circle-Triangle-Square.png'
	 		}
	 	 ,{
	 	 		description: 'Small-Medium-Large'
	 	 	 ,image: 'Small-Medium-Large.png'
	 	 	}
	 	 ,{
	 	 		description: 'Small-Medium-Large'
	 	 	 ,image: 'Small-Medium-Large.png'
	 	 	}
	 	 ,{
	 	 		description: 'Small-Medium-Large'
	 	 	 ,image: 'Small-Medium-Large.png'
	 	 	}
	 	]

	 ,correctPattern: 0
	}

];
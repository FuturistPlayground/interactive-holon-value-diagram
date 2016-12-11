/**
 * Holon_App holonApp constructor
 *
 */
function Holon_App () {
	
	/**
		Constants
	**/
	
	this.colorData = [];
	this.properties = {};
	this.holonData = [];
	this.sliceData = [];
	
	this.numberSlices = 0;
	this.numberHolons = 0;
	this.radius = 0;
	
	this.holonCircleGroups = [];
	this.valueSliceGroups = [];
	
	this.hitOptions = {};

	this.initialized = false;
}

/**
 * Holon_App holonApp class
 *
 */
Holon_App.prototype = {
  
  constructor: Holon_App,
  
  init: function() {
	  this.initValues();
	  this.initControls();
	  this.initModalHandlers();
  },
  initValues: function() {
	/*
	 * structure: colorData[sliceIndex][holonIndex]
	 */
	  this.colorData = {
			"textColor" : [
				[
					"#000000"
				]
			],
			"selectHighlightBackground" : [
				[
					"#FFFF80"
				]
			],
			"holonSliceBackground" : [
				[
					"#b2d3e6",
					"#8dbdd8",
					"#68a7ca",
					"#4390bc"
				]
			],
			"dataSliceBackground" : [
				[
					"#EEEEEE",
					"#E0E0E0",
					"#BDBDBD",
					"#9E9E9E"
				],
				[
					"#F5F5F5",
					"#EEEEEE",
					"#E0E0E0",
					"#BDBDBD"
				]
			]
		};

	  this.holonData = [
			{
				title: "You",
				imageId: "intrinsic motivation",
				detailContent: [
					{
						"title": "Subtitle 1",
						"content": "[Content]"
					},
				]
			},
			{
				title: "Community",
				imageId: "community",
				detailContent: [
					{
						"title": "Subtitle 1",
						"content": "[Content]"
					},
				]
			},
			{
				title: "World",
				imageId: "abcd",
				detailContent: [
					{
						"title": "Subtitle 1",
						"content": "[Content]"
					},
				]
			},
			{
				title: "New Frontier",
				imageId: "et",
				detailContent: [
					{
						"title": "Subtitle 1",
						"content": "[Content]"
					},
				]
			}
		];
		
		this.sliceData = [
			{
				title: "Holon",
				imageId: ""
			},
			{
				title: "Access",
				imageId: "access",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Sharing, openness, open-source, duplicable</i>"
					},
					{
						"title": "What the value is",
						"content": "Complete access to information and resources, like a library of everything."
					},
					{
						"title": "What the value is NOT",
						"content": "Access does not mean no privacy or security. You cannot access someone without consent or something someone else is using."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "We all have more with less responsibility."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": "Replacing your lawn with food forests or permaculture."
							},
							{
								"title": "Community",
								"content": "Regenerative Communities - Allowing diverse natural habitats to heal and thrive, while also creating regenerative food solutions for human consumption, that mimic nature."
							},
							{
								"title": "World",
								"content": "Respecting the natural global ecosystem without mass-scale human manipulation."
							}
						]
					}
				]
			},
			{
				title: "Regeneration",
				imageId: "regeneration",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Revitalization, renewal, healing, caretaking, sustainability</i>"
					},
					{
						"title": "What the value is",
						"content": "Caretaking our environments to be sustainable/regenerative to ourselves and the planet, as nature does when left alone."
					},
					{
						"title": "What the value is NOT",
						"content": "Using pesticides, herbicides, fungicides, xenocides, or any other -cides on/in our planet."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Needs in both the short and long-term are satisfied for us and future generations."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": "Abundant food, housing, activities, information."
							},
							{
								"title": "Community",
								"content": "Sharing (Access) Centers, Libraries",
							},
							{
								"title": "World",
								"content": "Global Resource Management System (TZM)"
							}
						]
					}
				]
			},
			{
				title: [
					"Intrinsic",
					"Motivation"
				],
				imageId: "intrinsic motivation",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Autonomy, mastery, purpose, interest, inspiration, goals</i>"
					},
					{
						"title": "What the value is",
						"content": "Intrinsic motivation is when one is motivated by internal factors, such as autonomy, mastery and purpose"
					},
					{
						"title": "What the value is NOT",
						"content": " External drivers of extrinsic motivation or the tools of domination: money, force, threats, conditioning, manipulation, coercion, rent, taxes"
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "What needs to be done gets done in a more productive and enjoyable way for all."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: "Freedom",
				imageId: "freedom",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Liberty, opportunity, ability</i>"
					},
					{
						"title": "What the value is",
						"content": "Self directed freedom is the ability to consciously arrive at decisions without manipulation or conditioning. Free from the tools of domination."
					},
					{
						"title": "What the value is NOT",
						"content": "Freedom does not mean freedom from consequences or the right to infringe upon others freedom."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "With the dissolution of control, everyone obtains safe/stable freedom to live and participate, including those previously in charge as well as laborers."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: "Collaboration",
				imageId: "collaboration",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Shared vision, purpose, harmony, unity, teamwork, synergy, inclusion</i>"
					},
					{
						"title": "What the value is",
						"content": "Working together to find a way to solve design challenges (problems) that are agreeable to all."
					},
					{
						"title": "What the value is NOT",
						"content": "Competition"
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Shifting from solving challenges against each other to solving challenges with each other is much more efficient,rewarding and reduces conflict."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: "Abundance",
				imageId: "abundance",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Plenty, sufficiency, thriving, productivity, scalability, technology</i>"
					},
					{
						"title": "What the value is",
						"content": "Applying the tools of automation to laborious and monotonous tasks so the community can spend more time self-actualizing."
					},
					{
						"title": "What the value is NOT",
						"content": "The automation of enjoyable tasks or social interactions."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Through efficient design and engineering we can fulfill everyone’s needs, not just those of some."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: [
					"Resource",
					"Efficiency"
				],
				imageId: "efficiency",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Ephemeralization, resourcefulness, economy, optimization</i>"
					},
					{
						"title": "What the value is",
						"content": "Using Cradle to Cradle Design we can maximize our resource use and reuse, long into the future, possibly indefinitely as matter cannot be destroyed, only transformed."
					},
					{
						"title": "What the value is NOT",
						"content": "Extreme utilitarianism, hoarding, mass production, no choice, sameness"
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Rather than optimizing profit which artificially and inadequately represents a healthy economy, we can directly optimize the real basis of an economy: resources."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: [
					"Love &",
					"Compassion"
				],
				imageId: "love",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Appreciation, acknowledgement, recognition, friendship</i>"
					},
					{
						"title": "What the value is",
						"content": "The ability to find appreciation and compassion for all life and beings."
					},
					{
						"title": "What the value is NOT",
						"content": "Presents, commitment, loyalty, sacrifice, chocolate."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Understanding that what’s best for the individual is also best for everyone."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: [
					"Health &",
					"Vitality"
				],
				imageId: "health",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Wellness, well-being, homeodynamic </i>"
					},
					{
						"title": "What the value is",
						"content": "Creating an environment where your body is able to heal and perform optimally."
					},
					{
						"title": "What the value is NOT",
						"content": "Beauty/vanity, youth, Reactional medicine"
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "A healthy body allows for a healthy mind, creating a healthy person. Healthy people makeup healthy communities and healthy communities foster a healthy world, and so on..."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			},
			{
				title: [
					"Discovery &",
					"Exploration"
				],
				imageId: "discovery",
				detailContent: [
					{
						"title": "Synonyms",
						"content": "<i>Learning, integration, play, travel, adventure, challenge</i>"
					},
					{
						"title": "What the value is",
						"content": "Access to the tools and information that will allow us to be lifelong learners and follow our interests."
					},
					{
						"title": "What the value is NOT",
						"content": "Using science to make weapons of mass destruction, patents, Pursuing all experiments and technologies because we can, regardless of whether we should."
					},
					{
						"title": "How it will make your life better and/or more fulfilling",
						"content": "Letting people pursue their interests in their own way is a more effective method of acquiring knowledge."
					},
					{
						"title": "Examples of use in current level/group",
						"content": [
							{
								"title": "Individual",
								"content": ""
							},
							{
								"title": "Community",
								"content": "",
							},
							{
								"title": "World",
								"content": ""
							}
						]
					}
				]
			}
		];
		
		this.numberSlices = this.sliceData.length;
		this.numberHolons = this.holonData.length;
		this.radius = view.size.width/2-50;
		
		this.holonCircleGroups = [];
		this.valueSliceGroups = [];
  },
  
  initControls: function() {
	var app = this;
	  // Initialize color picker inputs
	var controlsDiv = document.getElementById("controls");
	
	for(property in this.colorData) {
		var propertyHeader = document.createElement("H4");
		propertyHeader.innerHTML = property;
		controlsDiv.appendChild(propertyHeader);
		
		for(sliceIndex in this.colorData[property]) {
		//	var propertyHeader = document.createElement("H5");
		//	propertyHeader.innerHTML = "Slice " + sliceIndex;
		//	controlsDiv.appendChild(propertyHeader);
			
			for(holonIndex in this.colorData[property][sliceIndex]) {
				var colorId = property + "_slice_" + sliceIndex + "_holon_" + holonIndex;
				
				var colorDiv = document.createElement("DIV");
	
				var colorSelect = document.createElement("INPUT");
				colorSelect.setAttribute("type", "color");
				colorSelect.setAttribute("className", "colorSelect");
				colorSelect.setAttribute("id", colorId);
				colorSelect.setAttribute("name", colorId);
				colorSelect.setAttribute("value", this.colorData[property][sliceIndex][holonIndex]);
				colorSelect.property = property;
				colorSelect.sliceIndex = sliceIndex;
				colorSelect.holonIndex = holonIndex;
				colorDiv.appendChild(colorSelect);
				
				// Add handler for changing colors
				colorSelect.oninput = function () {
					app.colorData[this.property][this.sliceIndex][this.holonIndex] = this.value;
					project.clear();
					app.generateDiagram();
					
					$("#"+this.id+"Text").val(this.value);
				};
				
				var label = document.createElement("LABEL");
				var t = document.createTextNode(colorId + " ");
				label.appendChild(t);
				label.setAttribute("for", colorSelect.id);
				label.setAttribute("id", colorId + "Label");
				label.setAttribute("name", colorId + "Label");
				colorDiv.insertBefore(label,colorSelect);  
				
				var colorSelectText = document.createElement("INPUT");
				colorSelectText.setAttribute("readonly", true);
				colorSelectText.setAttribute("type", "text");
				colorSelectText.setAttribute("className", "colorSelectText");
				colorSelectText.setAttribute("id", colorId + "Text");
				colorSelectText.setAttribute("name", colorId + "Text");
				colorSelectText.setAttribute("value", this.colorData[property][sliceIndex][holonIndex]);
				colorDiv.appendChild(colorSelectText);
				
				var br = document.createElement("br");
				colorDiv.appendChild(br);
				colorDiv.property = property;
				colorDiv.sliceIndex = sliceIndex;
				colorDiv.holonIndex = holonIndex;
				colorDiv.label = label;

				// Set Mouseover events
				colorDiv.onmouseenter = function(){
					this.label.setAttribute("style", "background-color: #FFFF80");
					
					// Highlight corresponding part of diagram
					if(this.property === "selectHighlightBackground" || this.property === "textColor") {
						app.onMouseEnter(app, this, 0, 0, false);
						app.onMouseEnter(app, this, 0, 1, false);
						app.onMouseEnter(app, this, 0, 2, false);
						app.onMouseEnter(app, this, 0, 3, false);
						
						for(var i = 0; i < app.numberSlices; i++) {
							app.onMouseEnter(app, this, i, this.holonIndex, false);
						}
					} else if(this.property === "holonSliceBackground") {
						app.onMouseEnter(app, this, this.sliceIndex, this.holonIndex, false);
					} else if(this.sliceIndex % 2 == 0) {
						app.onMouseEnter(app, this, 2, this.holonIndex, false);
					} else {
						app.onMouseEnter(app, this, 1, this.holonIndex, false);
					}
				}
				colorDiv.onmouseleave = function(){
					this.label.setAttribute("style", "background-color: none");
					app.onMouseLeave(app, this, this.sliceIndex, this.holonIndex);
				}
				
				controlsDiv.appendChild(colorDiv);
			}
		}
	}
  },
  initModalHandlers: function() {
	  /*
	$('#LoveCompassionButton').click(function () {
        //show
		modal = document.getElementById('LoveCompassionModal');
		modal.style.display = "block";
		
		return false;
	});    
	*/
  },
  
  generateDiagram: function() {
	// Initialize these
	this.holonCircleGroups = [];
	this.valueSliceGroups = [];

	for(var i = 0; i < this.numberSlices; i++) {
		this.valueSliceGroups.push([]);
	}
	for(var i = 0; i < this.numberHolons; i++) {
		this.holonCircleGroups.push(new Group());
		var areas = this.generateHolonCircle(this.numberSlices, i, this.radius);
	}
	  
  },
  
  generateHolonCircle: function (numberSlices, holonIndex, maxRadius) {
	var app = this;
	var innerRadius = (holonIndex+1) * maxRadius/this.numberHolons;
	var outerRadius = holonIndex * maxRadius/this.numberHolons;
	
	var textGroup = new Group();
	var circleGroup = new Group();
	var areas = [];
			
	for(var i = 0; i < numberSlices; i++) {
		var sliceIndex = i;
	
		var path = new Path({
			strokeColor: 'grey',
			strokeWidth: 0.3
		});
		// Orient the holon slice on top
		var offsetAngle = -Math.PI/2 - 2 * Math.PI/numberSlices/2;
		
		var pOut0 = new Point(this.getCartesianCoordinates(this.getAngle(i, numberSlices)+offsetAngle, outerRadius));
		path.add(pOut0);
		
		var pOut1 = new Point(this.getCartesianCoordinates(this.getAngle(i+.5, numberSlices)+offsetAngle, outerRadius));
		var pOut2 = new Point(this.getCartesianCoordinates(this.getAngle(i+1, numberSlices)+offsetAngle, outerRadius));
		path.arcTo(pOut1, pOut2);
		
		var pIn2 = new Point(this.getCartesianCoordinates(this.getAngle(i+1, numberSlices)+offsetAngle, innerRadius));
		path.add(pIn2);
		
		var pIn1 = new Point(this.getCartesianCoordinates(this.getAngle(i+.5, numberSlices)+offsetAngle, innerRadius));
		var pIn0 = new Point(this.getCartesianCoordinates(this.getAngle(i, numberSlices)+offsetAngle, innerRadius));
		path.arcTo(pIn1, pIn0);
		
		path.add(pOut0);
		
		path.fillColor = path.fillColorTemp = this.getBackgroundColor(this.numberHolons, numberSlices, holonIndex, sliceIndex);;
		path.sliceIndex = sliceIndex;
		path.holonIndex = holonIndex;
		
		this.valueSliceGroups[path.sliceIndex].push(path);
		this.holonCircleGroups[holonIndex].addChild(path);
		
		// Set color event handlers
		path.onMouseEnter = function(event) {
			app.onMouseEnter(app, this, this.sliceIndex, holonIndex, true);
		}
		path.onMouseLeave = function(event) {
			app.onMouseLeave(app, this, this.sliceIndex, holonIndex);
		}
		
		path.onClick = function(event) {
			app.showDialog(holonIndex, this.sliceIndex);
		}
		
		areas.push(path);
		
		if(sliceIndex == 0) {
			// Draw holon title text
			
			var textContent = this.holonData[holonIndex].title;
			var text = new PointText(pIn1.add((pOut1.subtract(pIn1)).multiply(0.4)));
			text.justification = 'center';
			text.fillColor = text.fillColorTemp =  this.getTextColor(this.numberHolons, numberSlices, holonIndex, sliceIndex);
			text.fontSize = 12;
			text.content = textContent;
			
			text.sliceIndex = sliceIndex;
			text.holonIndex = holonIndex;
			text.lockColor = true;
			
			this.valueSliceGroups[sliceIndex].push(text);
			textGroup.addChild(text);
		
			text.onMouseEnter = function(event) {
				app.onMouseEnter(app, this, this.sliceIndex, holonIndex, false);
			}
			text.onMouseLeave = function(event) {
				app.onMouseLeave(app, this, this.sliceIndex, holonIndex);
			}
			text.onClick = function(event) {
				app.showDialog(holonIndex, this.sliceIndex);
			}
			
		} else if(holonIndex == 2){
			// Draw data title text
			
			var t = this.sliceData[sliceIndex].title;
			if(t) {
				// Convert to array
				t = (typeof t === "string") ? [t] : t;
				var arcLengthInc = 1/(t.length+1);
				for(var textIndex = 0; textIndex < t.length; textIndex++) {
					
					var arcLength = i + ((textIndex+1)*arcLengthInc);
					var p = new Point(this.getCartesianCoordinates(this.getAngle(arcLength, numberSlices)+offsetAngle, innerRadius)).multiply(0.95);

					var text = new PointText(p);
					text.justification = p.x > 0 ? 'right' : 'left';
					text.fillColor = text.fillColorTemp = this.getTextColor(this.numberHolons, numberSlices, holonIndex, sliceIndex);
					text.fontSize = 20;
					text.content = p.x > 0 ? t[textIndex] : t[t.length - textIndex-1];
					text.sliceIndex = sliceIndex;
					text.holonIndex = holonIndex;
					text.lockColor = true;
					
					// Readjust position based on text height
					var textLineHeightAdjustment = text.bounds.height/4/(2 * Math.PI * innerRadius / numberSlices);
					arcLength = i + ((textIndex+1)*arcLengthInc + (p.x > 0 ? textLineHeightAdjustment : -textLineHeightAdjustment));
					p = new Point(this.getCartesianCoordinates(this.getAngle(arcLength, numberSlices)+offsetAngle, innerRadius)).multiply(0.95);
					text.point = p;
				
					if(p.x > 0) {
						text.rotate(p.angle, p);
					} else {
						text.rotate(p.angle+180, p);
					}
					
					this.valueSliceGroups[sliceIndex].push(text);
					textGroup.addChild(text);

					text.onMouseEnter = function(event) {
						app.onMouseEnter(app, this, this.sliceIndex, holonIndex,false);
					}
					text.onMouseLeave = function(event) {
						app.onMouseLeave(app, this, this.sliceIndex, holonIndex);
					}
					text.onClick = function(event) {
						app.showDialog(holonIndex, this.sliceIndex);
					}
				}
			}
		} else if(holonIndex == 3){
			// Draw icons
			var raster = new Raster(this.sliceData[sliceIndex].imageId);
			raster.position = pOut1.multiply(1.175);

			raster.sliceIndex = sliceIndex;
			raster.holonIndex = holonIndex;
			raster.lockColor = true;
			
			this.valueSliceGroups[sliceIndex].push(raster);
			textGroup.addChild(raster);
			
			raster.onMouseEnter = function(event) {
				app.onMouseEnter(app, this, this.sliceIndex, holonIndex, false);
			}
			raster.onMouseLeave = function(event) {
				app.onMouseLeave(app, this, this.sliceIndex, holonIndex);
			}
			raster.onClick = function(event) {
				app.showDialog(holonIndex, this.sliceIndex);
			}
		}
	}
	
	var translateVector = view.center;
	this.holonCircleGroups[holonIndex].position = this.holonCircleGroups[holonIndex].position.add(translateVector);
	textGroup.position = textGroup.position.add(translateVector);

	return areas;
  },
  
	onMouseEnter: function (app, element, sliceIndex, holonIndex, setHighlightColor) {
	//	console.log("onMouseEnter: slice: " + sliceIndex + ", holon: " + holonIndex);
		var highlightColor = app.getHighlightColor(app.numberHolons, app.numberSlices, holonIndex, sliceIndex);
	
			if(sliceIndex == 0) {
				for(var i = 0; i <= holonIndex; i++) {
					app.holonCircleGroups[i].fillColor = app.holonCircleGroups[i].children[0].fillColor;
				}
				if(setHighlightColor) {
					element.fillColor = highlightColor;
				}
				for(area in app.valueSliceGroups[sliceIndex]) {
					// Highlight the area selected
					if(!app.valueSliceGroups[sliceIndex][area].lockColor 
					&& app.valueSliceGroups[sliceIndex][area].holonIndex == holonIndex) {
						app.valueSliceGroups[sliceIndex][area].fillColor = highlightColor;
					}
				}
			} else {
				if(setHighlightColor) {
					element.fillColor = highlightColor;
				}
				for(area in app.valueSliceGroups[sliceIndex]) {
					if(!app.valueSliceGroups[sliceIndex][area].lockColor)
						app.valueSliceGroups[sliceIndex][area].fillColor = highlightColor;
				}
			}
			view.draw();
		},
		
	onMouseLeave: function (app, element, sliceIndex, holonIndex) {
		
		// Reset all background colors
		for(var i = 0; i < app.numberHolons; i++) {
			for(j in app.holonCircleGroups[holonIndex].children) {
				app.holonCircleGroups[i].children[j].fillColor = app.holonCircleGroups[i].children[j].fillColorTemp;
			}
		}
		view.draw();
		},
		
	showDialog: function (holonIndex, sliceIndex) {
		console.log("Show dialog. slice: " + sliceIndex + ", holon: " + holonIndex);

		var content = document.getElementById("modal-details");
		content.innerHTML = "";
		
		var dataArray = (sliceIndex === 0) ? this.holonData : this.sliceData;
		var index = (sliceIndex === 0) ? holonIndex : sliceIndex;

		// Set image
		document.getElementById("modal-image").setAttribute("src", "");
		var imageId = dataArray[index].imageId;
		if(imageId) {
			var imageSrc = document.getElementById(imageId).src;
			document.getElementById("modal-image").setAttribute("src", imageSrc);
		}
		
		// Set title
		document.getElementById("modal-title").innerHTML = "";
		var title = dataArray[index].title;
		if(title) {
			if(title.constructor === Array) {
				title = title.join(" ");
			}
		//	document.getElementById("modal-title").innerHTML = title;
			txt = document.createTextNode(title);
			document.getElementById("modal-title").innerHTML = txt.textContent;
		}
		
		// Set detailContent		
		var detailContent = dataArray[index].detailContent;
		if(detailContent) {

		//	content.appendChild(this.createContentDiv([{"title": "Test", "content": "Test"}]));
			content.appendChild(this.createContentDiv(detailContent));
		}

		modal = document.getElementById('values-modal');
		modal.style.display = "block";
		
		var span = document.getElementsByClassName("close")[0];
		span.onclick = function() {
			modal.style.display = "none";
		}
			// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
	},
	createContentDiv: function(contentList, level) {
		if(level === undefined) {
			level = 0;
		}
		var div = document.createElement("DIV");
		
		for(sectionIndex in contentList) {
			
			var sectionDiv = document.createElement("DIV");
			sectionDiv.setAttribute("class", "modal-section");
			
			var titleHeader = document.createElement("H"+(level+4));
			titleHeader.innerHTML = contentList[sectionIndex].title;
			sectionDiv.appendChild(titleHeader);	
			
			var contentDiv = document.createElement("DIV");
			var content = contentList[sectionIndex].content;
			if(content.constructor === Array) {
				contentDiv = this.createContentDiv(content, level+1);
			} else {
				contentDiv.innerHTML = content;
			}
			sectionDiv.appendChild(contentDiv);
			
			div.appendChild(sectionDiv);
		}
		return div;
	},
		
	getAngle: function (slice, slices) {
			return (2 * Math.PI / (slices)) * slice;
		},
	getCartesianCoordinates: function (angle, radius) {
			return [Math.cos(angle)*radius, Math.sin(angle)*radius];
		},
		
	getBackgroundColor: function (numberHolons, numberSlices, holonIndex, sliceIndex) {
			var colorHexString = "";
			
			if(sliceIndex == 0) {
				colorHexString = this.getColor("holonSliceBackground", holonIndex, sliceIndex);
			} else {
				colorHexString = this.getColor("dataSliceBackground", holonIndex, sliceIndex);
			}
			return colorHexString;
		},
	getHighlightColor: function (numberHolons, numberSlices, holonIndex, sliceIndex) {
		return this.getColor("selectHighlightBackground", holonIndex, sliceIndex);
	},
	getTextColor: function (numberHolons, numberSlices, holonIndex, sliceIndex) {	
		return this.getColor("textColor", holonIndex, sliceIndex);
	},
	getColor: function(colorProperty, holonIndex, sliceIndex) {
		// Set alternating background colors
		var sliceLevelArray = this.colorData[colorProperty];
		var holonLevelArray = sliceLevelArray[sliceIndex % sliceLevelArray.length];
		return holonLevelArray[holonIndex % holonLevelArray.length];
	},

 draw: function() {
	  this.generateDiagram();
  }
};

var holonApp;

window.onload = function() {
	// Setup Paper.JS
	// TODO: inject paper variable
	paper.install(window);
	paper.setup('canvas-holon-app');
	holonApp = new Holon_App();

	holonApp.init();
	holonApp.draw();
	
};
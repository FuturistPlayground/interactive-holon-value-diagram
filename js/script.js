var holonApp;
var layer = null;
var canvasId = "";
window.onload = function() {
	canvasId = 'canvas-holon-app';
	paper.install(window);
	paper.setup(canvasId);
	
	holonApp = new Holon_App();
	holonApp.init();

	// Prevent init firing multiple times
	var timeOut = null;
	window.resize = view.onResize = function(){
		if (timeOut != null)
			clearTimeout(timeOut);

		timeOut = setTimeout(function(){
			holonApp.init();
		}, 250);
	};
};


/**
 * Holon_App holonApp constructor
 *
 */
function Holon_App () {
	
	/**
		Constants
	**/
	this.viewPortWidth = 0;
	this.viewPortHeight = 0;
	
	this.colorData = [];
	this.data = {};
	
	this.numberSlices = 0;
	this.numberHolons = 0;
	this.radius = 0;
	
	this.holonCircleGroups = [];
	this.valueSliceGroups = [];
	this.overviewCircleButton = null;
	
	this.hitOptions = {};

	this.initialized = false;
}

/**
 * Holon_App holonApp class
 *
 */
Holon_App.prototype = {
  
  constructor: Holon_App,
  
  init: function(context) {
	this.resizeView();
	this.initValues();
	this.initAccordion();
	this.draw();
	view.draw();
  },
  resizeView: function() {
	this.viewPortWidth = window.innerWidth;
	this.viewPortHeight = window.innerHeight;

	var canvas = document.getElementById(canvasId);
	canvas.width = this.viewPortWidth;
	canvas.height = this.viewPortHeight;

	view.viewSize = new Size(this.viewPortWidth, this.viewPortHeight);
	
  },
  initValues: function() {

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
			"overviewButtonBackground" : [
				[
					"#E0E0E0"
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

		// this.data[sliceIndex][holonIndex]
		this.data = 
		{
			overview:
				{
					title: "Overview",
					imageId: "abcd",
					modalId: "modal-overview"
				},
			slices: 
				[
					[
						{
							title: "You",
							imageId: "intrinsic motivation",
							modalId: "modal-individual"
						},
						{
							title: "Community",
							imageId: "community",
							modalId: "modal-community"
						},
						{
							title: "World",
							imageId: "abcd",
							modalId: "modal-world"
						},
						{
							title: "New Frontier",
							imageId: "et",
							modalId: "modal-new-frontier"
						}
					],
					{
						title: "Access",
						imageId: "access",
						modalId: "modal-access"
					},
					{
						title: "Discovery",
						imageId: "discovery",
						modalId: "modal-discovery"
					},
					{
						title: "Freedom",
						imageId: "freedom",
						modalId: "modal-freedom"
					},
					{
						title: "Self Motivation",
						imageId: "intrinsic-motivation",
						modalId: "modal-intrinsic-motivation"
					},
					{
						title: "Regeneration",
						imageId: "regeneration",
						modalId: "modal-regeneration"
					},
					{
						title: "Compassion",
						imageId: "love",
						modalId: "modal-love"
					},
					{
						title: "Wellness",
						imageId: "health",
						modalId: "modal-health"
					},
					{
						title: "Efficiency",
						imageId: "efficiency",
						modalId: "modal-efficiency"
					},
					{
						title: "Collaboration",
						imageId: "collaboration",
						modalId: "modal-collaboration"
					},
					{
						title: "Abundance",
						imageId: "abundance",
						modalId: "modal-abundance"
					}
				]
		};
		
		// Clear current content
		project.activeLayer.removeChildren();
		this.holonCircleGroups = [];
		this.valueSliceGroups = [];
		this.overviewCircleButton = null;
		
		this.radius = Math.min(this.viewPortWidth, this.viewPortHeight)*0.45;
		
		this.numberSlices = this.data.slices.length;
		this.numberHolons = this.data.slices[0].length;
		

  },
  initAccordion: function() {
	  var app = this;
		
		var acc = document.getElementsByClassName("accordion");
		if(acc.length >= 1) {
			var i;
			for (i = 0; i < acc.length; i++) {
				acc[i].onclick = function(event) {
						app.toggleAccordion(app, acc, this, false);
					}
			}
		}
	},
  draw: function() {
	var app = this;
	
	for(var i = 0; i < this.numberSlices; i++) {
		this.valueSliceGroups.push([]);
	}
	for(var i = 0; i < this.numberHolons; i++) {
		this.holonCircleGroups.push(new Group());
		this.generateHolonCircle(this.numberSlices, i, this.radius);
	}
	
	// Overview Circle
	var radiusSmall = this.radius/4.5
	var point = view.center;
	var x1 = point.x-this.radius+radiusSmall/2;
	var y1 = point.y-this.radius+radiusSmall/2;
	
	this.overviewCircleButton = new Path.Circle(new Point(x1, y1), radiusSmall);
	this.overviewCircleButton.sliceIndex = -1;
	this.overviewCircleButton.holonIndex = this.numberHolons-1;
	this.overviewCircleButton.fillColor = this.overviewCircleButton.fillColorTemp = this.getOverviewButtonColor(this.numberHolons, this.numberSlices, this.overviewCircleButton.holonIndex, this.overviewCircleButton.sliceIndex);

	// Set color event handlers
	this.overviewCircleButton.onMouseEnter = function(event) {
		app.highlightSelection(app, this, this.sliceIndex, this.holonIndex, true);
	}
	this.overviewCircleButton.onMouseLeave = function(event) {
		app.clearHighlightSelection(app, 0, this.holonIndex);
	}
	
	this.overviewCircleButton.onClick = function(event) {
		app.highlightSelection(app, this, this.sliceIndex, this.holonIndex, true);
		app.showDialog(this.holonIndex, this.sliceIndex);
	}
	
	/* Draw Text */
	
	// Draw holon title text
//	var textContent = this.data[sliceIndex][holonIndex].title;
	var textContent = this.data.overview.title;
	var text = new PointText(this.overviewCircleButton.position);
	text.justification = 'center';
	text.fillColor = text.fillColorTemp = this.getTextColor(this.numberHolons, this.numberSlices, 0, 0);
	text.fontSize = this.radius / 14;
	text.content = textContent;
	text.position.y += text.bounds.height/4;
	text.sliceIndex = this.overviewCircleButton.sliceIndex;
	text.holonIndex = this.overviewCircleButton.holonIndex;
	text.lockColor = true;
	
	text.onMouseEnter = function(event) {
		app.highlightSelection(app, this, this.sliceIndex, this.holonIndex, false);
	}
	text.onMouseLeave = function(event) {
		app.clearHighlightSelection(app, this.sliceIndex, this.holonIndex);
	}
	text.onClick = function(event) {
		app.highlightSelection(app, this, this.sliceIndex, this.holonIndex, false);
		app.showDialog(this.holonIndex, this.sliceIndex);
	}
	
	
  },
  
  generateHolonCircle: function (numberSlices, holonIndex, maxRadius) {
	var app = this;
	var innerRadius = (holonIndex+1) * maxRadius/this.numberHolons;
	var outerRadius = holonIndex * maxRadius/this.numberHolons;
	
	var textGroup = new Group();
	var circleGroup = new Group();
			
	for(var i = 0; i < numberSlices; i++) {
		var sliceIndex = i;
	
		var path = new Path({
			strokeColor: 'grey',
			strokeWidth: 0.3
		});
		// Orient the holon slice on top
		var offsetAngle = (-Math.PI)/2-2 * Math.PI/numberSlices/2;
		
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
		
		path.fillColor = path.fillColorTemp = this.getBackgroundColor(this.numberHolons, numberSlices, holonIndex, sliceIndex);
		path.sliceIndex = sliceIndex;
		path.holonIndex = holonIndex;
		
		this.valueSliceGroups[path.sliceIndex].push(path);
		this.holonCircleGroups[holonIndex].addChild(path);
		
		// Set color event handlers
		path.onMouseEnter = function(event) {
			app.highlightSelection(app, this, this.sliceIndex, holonIndex, true);
		}
		path.onMouseLeave = function(event) {
			app.clearHighlightSelection(app, this.sliceIndex, holonIndex);
		}
		
		path.onClick = function(event) {
			app.highlightSelection(app, this, this.sliceIndex, holonIndex, true);
			app.showDialog(holonIndex, this.sliceIndex);
		}
		
		if(sliceIndex == 0) {
			// Draw holon title text
			var textContent = this.data.slices[sliceIndex][holonIndex].title;
			var text = new PointText(pIn1.add((pOut1.subtract(pIn1)).multiply(0.4)));
			text.justification = 'center';
			text.fillColor = text.fillColorTemp =  this.getTextColor(this.numberHolons, numberSlices, holonIndex, sliceIndex);
			text.fontSize = this.getTextSize(this.numberHolons, numberSlices, holonIndex, sliceIndex);
			text.content = textContent;
			
			text.sliceIndex = sliceIndex;
			text.holonIndex = holonIndex;
			text.lockColor = true;
			
			this.valueSliceGroups[sliceIndex].push(text);
			textGroup.addChild(text);
		
			text.onMouseEnter = function(event) {
				app.highlightSelection(app, this, this.sliceIndex, holonIndex, false);
			}
			text.onMouseLeave = function(event) {
				app.clearHighlightSelection(app, this.sliceIndex, holonIndex);
			}
			text.onClick = function(event) {
				app.highlightSelection(app, this, this.sliceIndex, holonIndex, false);
				app.showDialog(holonIndex, this.sliceIndex);
			}
			
		} else if(holonIndex == 2){
			// Draw data title text
			
			var t = this.data.slices[sliceIndex].title;
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
					text.fontSize = this.getTextSize(this.numberHolons, numberSlices, holonIndex, sliceIndex)
					text.content = p.x > 0 ? t[textIndex] : t[t.length-textIndex-1];
					text.sliceIndex = sliceIndex;
					text.holonIndex = holonIndex;
					text.lockColor = true;
					
					// Readjust position based on text height
					var textLineHeightAdjustment = text.bounds.height/4/(2 * Math.PI * innerRadius / numberSlices);
					arcLength = i + ((textIndex+1)*arcLengthInc + (p.x > 0 ? textLineHeightAdjustment : (-textLineHeightAdjustment)));
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
						app.highlightSelection(app, this, this.sliceIndex, holonIndex,false);
					}
					text.onMouseLeave = function(event) {
						app.clearHighlightSelection(app, this.sliceIndex, holonIndex);
					}
					text.onClick = function(event) {
						app.highlightSelection(app, this, this.sliceIndex, holonIndex, false);
						app.showDialog(holonIndex, this.sliceIndex);
					}
				}
			}
		} else if(holonIndex == 3){
			// Draw icons
			var raster = new Raster(this.data.slices[sliceIndex].imageId);
			raster.position = pOut1.multiply(1.175);
			raster.scale(this.radius/raster.height/7);

			raster.sliceIndex = sliceIndex;
			raster.holonIndex = holonIndex;
			raster.lockColor = true;
			
			this.valueSliceGroups[sliceIndex].push(raster);
			textGroup.addChild(raster);
			
			raster.onMouseEnter = function(event) {
				app.highlightSelection(app, this, this.sliceIndex, holonIndex, false);
			}
			raster.onMouseLeave = function(event) {
				app.clearHighlightSelection(app,this.sliceIndex, holonIndex);
			}
			raster.onClick = function(event) {
				app.highlightSelection(app, this, this.sliceIndex, holonIndex, false);
				app.showDialog(holonIndex, this.sliceIndex);
			}
		}
	}
	
	var translateVector = view.center;
	this.holonCircleGroups[holonIndex].position = this.holonCircleGroups[holonIndex].position.add(translateVector);
	textGroup.position = textGroup.position.add(translateVector);
  },
	toggleAccordion: function(app, accordionsList, element, forceOpen){
		// If target element is currently showing, hide it, otherwise show target element and hide all others
		if(!forceOpen && element.nextElementSibling.classList.contains("show")) {
			// currently showing, hide it
			element.nextElementSibling.classList.remove("show");
			element.classList.remove("active");
		} else {
			// hide all others
			for (j = 0; j < accordionsList.length; j++) {
				accordionsList[j].nextElementSibling.classList.remove("show");
				accordionsList[j].classList.remove("active"); 
			}
			// show element
			element.nextElementSibling.classList.add("show");
			element.classList.add("active");
			
			// Load video(s)
			var iframeList = element.nextElementSibling.querySelectorAll(".accordion-section > iframe");
			for(var iframeIndex = 0; iframeIndex < iframeList.length; iframeIndex++) {
				if(iframeList[iframeIndex] && !iframeList[iframeIndex].src) {
					iframeList[iframeIndex].src = iframeList[iframeIndex].dataset.src;		
				}
			}
		}
	},
	highlightSelection: function (app, element, sliceIndex, holonIndex, setHighlightColor) {
		app.clearHighlightSelection(app, sliceIndex, holonIndex);
	//	console.log("onMouseEnter: slice: " + sliceIndex + ", holon: " + holonIndex);
	
		var highlightColor = app.getHighlightColor(app.numberHolons, app.numberSlices, holonIndex, sliceIndex);
		if(sliceIndex < 0) {
			app.overviewCircleButton.fillColor = highlightColor;
		} else if(sliceIndex == 0) {
			// Color the background color of the selected holon ring and below
			for(var i = 0; i <= holonIndex; i++) {
				app.holonCircleGroups[i].fillColor = app.holonCircleGroups[i].children[0].fillColor;
			}		
			// Highlight the background color of the selected cell (slice and holon)
			for(cell in app.valueSliceGroups[sliceIndex]) {
				if(app.valueSliceGroups[sliceIndex][cell].holonIndex == holonIndex
				&& !app.valueSliceGroups[sliceIndex][cell].lockColor) {
					app.valueSliceGroups[sliceIndex][cell].fillColor = highlightColor;
				}
			}
		} else {
			// Highlight the background color of the selected slice
			for(cell in app.valueSliceGroups[sliceIndex]) {
				if(!app.valueSliceGroups[sliceIndex][cell].lockColor) {
					app.valueSliceGroups[sliceIndex][cell].fillColor = highlightColor;
				}
			}
		}
		// Redraw
		view.draw();
	},
		
	clearHighlightSelection: function (app, sliceIndex, holonIndex) {
		console.log(sliceIndex + ", " + holonIndex);
		// Reset overviewCircleButton
		app.overviewCircleButton.fillColor = app.overviewCircleButton.fillColorTemp;
		
		// Reset all background colors
		for(var i = 0; i < app.numberHolons; i++) {
			for(j in app.holonCircleGroups[holonIndex].children) {
				app.holonCircleGroups[i].children[j].fillColor = app.holonCircleGroups[i].children[j].fillColorTemp;
			}
		}
		// Redraw
		view.draw();
	},
	showDialog: function (holonIndex, sliceIndex) {
		console.log("Show dialog. slice: " + sliceIndex + ", holon: " + holonIndex);
		var modalId = "";
		
		if(sliceIndex < 0) {
			modalId = this.data.overview.modalId;
		} else {
			var slice = this.data.slices[sliceIndex];
			if(slice) {
				if(Array.isArray(slice)) {
					var cell = slice[holonIndex];
					if(cell && cell.modalId) {
						modalId = cell.modalId;
					//	alert("Holon: " + modalId);
					}
				} else if(slice.title) {
					modalId = slice.modalId;
				//	alert("Slice: " + modalId);
				}
			}
		}
		
		if(modalId) {
			console.log(modalId);
			modal = document.getElementById(modalId);
			modal.style.display = "block";
			
			var span = modal.getElementsByClassName("close")[0];
			span.onclick = function() {
				modal.style.display = "none";
			}
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
			
			// Open Accordion
			var accordionList = modal.getElementsByClassName("accordion");
			if(accordionList && accordionList.length > 0) {
				this.toggleAccordion(this, accordionList, accordionList[0], true);
			}
		}
		
		

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
	getOverviewButtonColor: function (numberHolons, numberSlices, holonIndex, sliceIndex) {
		return this.getColor("overviewButtonBackground", holonIndex, sliceIndex);
	},
	getColor: function(colorProperty, holonIndex, sliceIndex) {
		// Set alternating background colors
		var sliceLevelArray = this.colorData[colorProperty];
		var holonLevelArray = sliceLevelArray[sliceIndex % sliceLevelArray.length];
		return holonLevelArray[holonIndex % holonLevelArray.length];
	},
	getTextSize: function (numberHolons, numberSlices, holonIndex, sliceIndex) {
		// 20 | 12
		
		return sliceIndex == 0 ? this.radius / 20 : this.radius / 14;
	}
};
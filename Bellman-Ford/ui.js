window.addEventListener("load", foo);

function foo(){
	document.getElementById("canvas").addEventListener("click", create_vertex);
}

var count = 0;

//-----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------The HTML Interface------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

var start_x = null;
var start_y = null;
var start_div = null;

var end_x = null;
var end_y = null;
var end_div = null;

function create_vertex(e){
	x = parseInt(e.clientX);		//getting x co-ordinate of mouseclick
	x = x - 30;						//shifting for appropriate position such that vertex's horizontal centre coincides with the cursor
	y = parseInt(e.clientY);		//getting y co-ordinate of mouseclick
	y = y - 90;						//shifting for appropriate position such that vertex's vertical centre coincides with the cursor


	var div = document.createElement("div");
	var div_text = document.createElement("p");

	count = count + 1

	//Stylings of the vertex
	div.style.zIndex = "2";
	div.style.position = "absolute";
	div.id = count;
	div_text.innerHTML = count;
	div_text.style.position = "relative";
	div_text.style.marginLeft = "15px";
	div_text.style.marginTop = "10px";
	div.style.backgroundColor = "white";
	div.style.border = "2px solid #404040";
	div.style.borderRadius = "50%";
	div.style.color = "black";
	div.style.transitionProperty = "background-color";
	div.style.transitionDuration = "1s";


	//Dimensions of the vertex
	div.style.height = "40px";
	div.style.width = "40px";

	//Positionings
	div.style.marginLeft = x + "px";
	div.style.marginTop = y + "px";
	
	div.appendChild(div_text);

	//Adding event listeners to create edges of the graph
	div.addEventListener("mousedown", get_origin_coordinates);
	div.addEventListener("mouseup", get_destination_coordinates);

	document.getElementById("canvas").appendChild(div);

	Graph.add_vertex(div);
}

function get_origin_coordinates(){
	start_x = parseInt(this.style.marginLeft) + 20;		//x co-ordinate of origin vertex
	start_y = parseInt(this.style.marginTop) + 20;		//y co-ordinate of origin vertex
	start_div = this;
}

function get_destination_coordinates(){
	end_x = parseInt(this.style.marginLeft) + 20;		//x co-ordinate of endpoint vertex
	end_y = parseInt(this.style.marginTop) + 20;		//y co-ordinate of endpoint vertex
	end_div = this;

	if(start_x != null && start_y != null && end_x != null && end_y != null) //draw a line only if all four co-ordinates are available
	{	
		createLine(start_div,end_div, start_x, start_y, end_x, end_y); 		//passing divs into the function to facilitate creatiing edges in the graph
	}

	start_x = null;			// Reassign null values
	start_y = null;			// to all the co-ordinates after
	end_x = null;			// drawing the line
	end_y = null;		
	start_div = null;
	end_div = null;	
}


function createLine(start_div, end_div, x1, y1, x2, y2){

	var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));	//getting the x length of the line according to Euclid's distance formula
	var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;	//getting angle using the slope of the line
	var transform = 'rotate('+angle+'deg)';						//rotate the line by the obtained angle
	var weight = window.prompt("Enter weight for this edge");

	//s = "";

	var line = document.createElement("div");	//creating the div that contains the line
	//var weight_text = document.createTextNode(weight);
	
	s = "<span style=\"font-size:20px;position:absolute;margin-top:10px;font-weight:bold;\">" + weight +"</span>";	//adding styles for the edge weight which has toappear in the div "line"

	if(document.getElementById("Directed").checked){
		line.className = "directedLine";					//class = line has css predefined css stylings in style.css
	}

	else{
		line.className = "undirectedLine";
	}

	line.id = "edge_" + start_div.id + "_" + end_div.id;		//id has the syntax edge_origin-vertex-id_destination-vertex-id
	
	//stylings of the line
	line.style.position = "absolute";
	line.style.transform = transform;
	line.style.width = length;
	line.style.marginLeft = x1;
	line.style.marginTop = y1;
	line.style.textAlign = "center";
	line.innerHTML = s;
	
	document.getElementById("canvas").appendChild(line);
	Graph.add_edge(start_div,end_div,line,weight);
}

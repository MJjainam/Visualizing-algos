//-----------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------Creating The Graph For Javascript-----------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

var Graph = new Object();

Graph.Vertices = new Array();	//Array of all the vertices of the graph (Adjacency List)
Graph.Edges = new Array();		//Array of all the edges of the graph

function _add_vertex(vertex){
/*
	Create a new Vertex ojbect which has the following attributes :
		element : contains the HTML div element corresponding the vertex of the graph in the DOM
		Adj : an array of all the vertices that are adjacent to the current vertex (Adjacency List)
		distance : a number that tells it's distance from the source vertex
		_parent : a pointer that points to it's predecessor in the shortest path
		visited : a boolean value that tells the program wheather the vertex has been visited or not in the traversal

	The Vertex object is then pushed into array "Graph.Vertices"
	The Array "Graph.Vertices" is the required Adjacency List representation of the graph
*/
	var V = new Object();	
	V.element = vertex;
	V.Adj = new Array();
	V.distance = 1000000000000000;
	V.visited = false;
	V._parent = null;
	V.NEXTS = new Array();

	Graph.Vertices.push(V);
}


function _add_edge(origin,endpoint,line,weight){
/*
	Create a new "edge" Object which has the following attributes:
		origin : a HTML div element corresponding to the origin vertex of the edge
		endpoint : a HTML div element corresponding to the endpoint vertex of the edge
		weight : a number that represents the weight of the edge
		line : a reference to the HTML div element the contains the line corresponding to the edge

  	The edge object is then pushed into array "Graph.Edges" 
  	The adjacency lists of the origin and endpoint vertices are modified here
*/
	edge = new Object();	
	edge.origin = origin;		
	edge.endpoint = endpoint;
	edge.weight = weight;
	edge.line = line;

	Graph.Edges.push(edge);

	s = get_graph_vertex(origin);
	d = get_graph_vertex(endpoint);

	if (check_duplicates_in_Adj(s,d))	//Checking if the edge already exists, multiple edges are disallowed
	{
		if(document.getElementById("Directed").checked){
			s.Adj.push(d);
		}

		else{
			s.Adj.push(d);
			d.Adj.push(s);
		}
	}

	else
	{
		alert("The edge already exists, multiple edges are not allowed.");
		line.parentNode.removeChild(line);	//Removes the duplicate edge line from the DOM
	}
}


function check_duplicates_in_Adj(u,v){
/*
	Returns 
		false : if the vertex "u" already has vertex "v" in it's adjacency list
				or if vertex "v" already has vertex "u" in it's adjacency list

		true : otherwise
	
	This function returns false if the edge with origin and endpoint vertices passed to it already exists, 
	otherwise, it returns true
*/
	var i;
	var j;
	for(i=0; i < Graph.Vertices.length; i++)
	{
		for(j=0; j < Graph.Vertices.length; j++)
		{
			if (Graph.Vertices[i] == u && Graph.Vertices[i].Adj[j] == v)
			{
				return false;
			}
		}
	}
	return true;
}


function get_graph_vertex(div){
/*
	Function for getting the graph vertex object corresponding to a div element.
	This is required because the div element doesn't have Adj attribute that can give the adjacenct vertices
	whereas the graph vertex object has adjacent vertices attribute.
*/

	var i;
	for(i=0; i < Graph.Vertices.length; i++)
	{
		if (Graph.Vertices[i].element.id == div.id)
		{
			return Graph.Vertices[i];
		}
	}
}

function _show_edges(){			//Display all the edges of the graph
	var i;
	for(i=0; i < this.Edges.length; i++)
	{
		alert(this.Edges[i].weight);
	}
}

function _show_vertices(){		//Display all the vertices of the graph
	var i;
	var j;
	var s = "";
	for(i=0; i < this.Vertices.length; i++)
	{
		s = s + this.Vertices[i].element.id + " : ";
		for(j=0; j< this.Vertices[i].Adj.length; j++)
		{
			s = s + this.Vertices[i].Adj[j].element.id + "--";
		}
		s = s + "\n";
	}
	alert(s);
}

function _weight(origin,endpoint){
	s = origin.element.id;
	d = endpoint.element.id;

	var i;

	if(document.getElementById("Directed").checked){
		for(i=0; i < Graph.Edges.length; i++)
		{
			if(Graph.Edges[i].origin.id == s && Graph.Edges[i].endpoint.id == d){
				return Graph.Edges[i].weight;
			}
		}
	}

	else{
		for(i=0; i < Graph.Edges.length; i++)
		{
			if((Graph.Edges[i].origin.id == s && Graph.Edges[i].endpoint.id == d) || (Graph.Edges[i].endpoint.id == s && Graph.Edges[i].origin.id == d)){
				return Graph.Edges[i].weight
			}
		}
	}

	alert("Error");
}


Graph.add_vertex = _add_vertex;
Graph.add_edge = _add_edge;
Graph.show_vertices = _show_vertices;
Graph.show_edges = _show_edges;
Graph.weight = _weight;

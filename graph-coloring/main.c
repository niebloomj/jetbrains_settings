/* main.c
// @author Jacob Niebloom
// @email  jniebloo@u.rochester.edu
// @course CSC 173
// @day    Sep 18, 2015
// CSC 173 Coloring Project
*/

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include "main.h"
#include "graph.h"

int main() {
	// read in the graph from stdin
	graph_t graph = stdin_to_graph();
	// do the necessary computations, and
	// write the result to stdout
	graph_to_stdout(graph);
}

// reads in the graph from stdin and
// stores it in a graph_t struct
graph_t stdin_to_graph() {
	// stub (delete when you implement this function)
	int numberOfVertices;
	int args = scanf("%d", &numberOfVertices);
	// If scanf didn't find 1 argument, return null;
	if (args != 1) {
		return NULL;
	}
	int numberOfEdges;
	args = scanf("%d", &numberOfEdges);
	// If scanf didn't find 1 argument, return null;
	if (args != 1) {
		return NULL;
	}
	// printf("%d %d\n", numberOfVertices, numberOfEdges);

	// Allocated enough memory for each vertex and edge
	vertex_t *vertices = malloc(numberOfVertices * sizeof(vertex_t));
	edge_t *edges = malloc(numberOfEdges * sizeof(edge_t));

	// Loop through the groupings of lines for each vertex
	for (int i = 0; i < numberOfVertices; i++) {
		int vertexID;
		char *vertexName = malloc(100 * sizeof(char));
		char *vertexColor = malloc(100 * sizeof(char));
		scanf("%d", &vertexID);
		scanf("%s", vertexName);
		scanf("%s", vertexColor);
		//Create a vertex
		vertex_t vertex = new_vertex(vertexID, vertexName, vertexColor);
		//Add it to the array of vertices
		vertices[i] = vertex;
	}

	// Loop through the groupings of lines for each edge
	for (int i = 0; i < numberOfEdges; i ++) {
		int edgeID, firstVertexID, secondVertexID;
		char *edgeName = malloc(100 * sizeof(char));
		scanf("%d", &edgeID);
		//Get the \n from the end of scanf out of the way
		scanf("\n");
		//Use fgets since the name can be of different formats
		fgets(edgeName, sizeof(edgeName) * 100, stdin);
		//Remove that trailing \n
		strtok(edgeName, "\n");
		scanf("%d", &firstVertexID);
		scanf("%d", &secondVertexID);
		//Create an edge
		edge_t edge = new_edge(edgeID, edgeName,
		                       get_vertex(firstVertexID, vertices),
		                       get_vertex(secondVertexID, vertices));
		//Add it to the array of edges
		edges[i] = edge;
	}

	graph_t graph = new_graph(vertices, edges,
	                          numberOfVertices, numberOfEdges);
	// print_graph(graph);
	return graph;
}

void graph_to_stdout(graph_t graph) {
	// If the graph exists
	if (graph) {
		if (has_valid_coloring(graph)) {
			int colors = num_colors(graph);
			printf("YES\n%d\n", colors);
		} else {
			printf("NO\n");
			print_why_not_valid(graph);
		}
	}
}







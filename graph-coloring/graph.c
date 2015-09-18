/* graph.c
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
#include "graph.h"

// C functions that are declared in graph.h
// Creates a new vertex from an ID, name, and color
vertex_t new_vertex(int id, char *name, char *color) {
	vertex_t vertex = malloc(sizeof(struct vertex));

	// Deep copy to pointer
	int *copyId = malloc(sizeof(id));
	memcpy(copyId, &id, sizeof(id));
	vertex->id = *copyId;
	// Deep copy to pointer
	char *copyName = malloc(sizeof(name) * 50);
	memcpy(copyName, name, strlen(name) * 50);
	vertex->name = copyName;
	// Deep copy to pointer
	char *copyColor = malloc(sizeof(color) * 50);
	memcpy(copyColor, color, strlen(color) * 50);
	vertex->color = copyColor;

	return vertex;
}

// Returns the desired vertex with the right id from a vertices pointer
vertex_t get_vertex(int id, vertex_t *vertices) {
	int i = 0;
	while (vertices[i]) {
		if (vertices[i]->id == id) {
			//Found it
			return vertices[i];
		}
		i ++;
	}
	return NULL;
}

// Creates a new edge from an ID, name, and source/destination vertices
edge_t new_edge(int id, char *name, vertex_t src, vertex_t dst) {
	edge_t edge = malloc(sizeof(struct edge));

	// Deep copy to pointer
	int *copyId = malloc(sizeof(id));
	memcpy(copyId, &id, sizeof(id));
	edge->id = *copyId;

	// Deep copy to pointer
	char *copyName = malloc(sizeof(name) * 50);
	memcpy(copyName, name, strlen(name) * 50);
	edge->name = copyName;

	//Don't deep copy, this should be the same object.
	edge->fromVertex = src;
	edge->toVertex = dst;

	return edge;
}

// Creates a new graph from a list of vertices and edges
graph_t new_graph(vertex_t *vertices, edge_t *edges, int vertCount, int edgeCount) {
	graph_t graph = malloc(sizeof(graph_t) * 500);

	// No need for deep copying
	graph->vertices = vertices;
	graph->edges = edges;

	// Deep copy to pointer
	int *copyVert = malloc(sizeof(vertCount));
	memcpy(copyVert, &vertCount, sizeof(vertCount));
	graph->numberOfVertices = *copyVert;
	// Deep copy to pointer
	int *copyEdge = malloc(sizeof(edgeCount));
	memcpy(copyEdge, &edgeCount, sizeof(edgeCount));
	graph->numberOfEdges = *copyEdge;

	return graph;
}

// Prints a vertex to stdout
void print_vertex(vertex_t vertex) {
	printf("Vertex: %d %s %s\n", vertex->id, vertex->name, vertex->color);
}

// Prints an edge to stdout
void print_edge(edge_t edge) {
	printf("Edge: %d %s\n",
	       edge->id,
	       edge->name);
	print_vertex(edge->fromVertex);
	print_vertex(edge->toVertex);
}

// Prints a graph to stdout
void print_graph(graph_t graph) {
	int i;
	//If the graph exists
	if (graph) {
		i = 0;
		for (i = 0; i < graph->numberOfEdges; i++) {
			print_edge(graph->edges[i]);
		}
	} else {
		puts("meh");
	}
}

// returns the number of distinct colors found within the graph's vertices
int num_colors(graph_t graph) {
	int numberOfColors, unique[graph->numberOfVertices];
	numberOfColors = 0;
	//For every i in the number of vertices
	for (int i = 0; i < graph->numberOfVertices; i++) {
		int j;
		// For every j in the number of colors we have found so far.
		for (j = 0; j < numberOfColors; ++j)
			if (!strcmp(graph->vertices[i]->color, graph->vertices[unique[j]]->color))
				break;
		if (j == numberOfColors)
			unique[numberOfColors++] = i;
	}
	return numberOfColors;
}

// returns true if the graph has a valid coloring, false otherwise
// NOTE: A graph is colored correctly *if and only if*
// each edge contains vertices of a different color
bool has_valid_coloring(graph_t graph) {
	for (int i = 0; i < graph->numberOfEdges; i++) {
		if (strcmp(graph->edges[i]->fromVertex->color,
		           graph->edges[i]->toVertex->color) == 0) {
			return false;
		}
	}
	return true;
}

// Prints why the graph was not valid.
void *print_why_not_valid(graph_t graph) {
	int numOfBad = 0;
	// Calculate the number of bad.
	for (int i = 0; i < graph->numberOfEdges; i++) {
		if (strcmp(graph->edges[i]->fromVertex->color,
		           graph->edges[i]->toVertex->color) == 0) {
			numOfBad++;
		}
	}
	printf("%d\n", numOfBad);
	// Bubble sorting!! By Id
	edge_t swap = malloc(sizeof(edge_t));
	for (int c = 0 ; c < ( graph->numberOfEdges - 1 ); c++) {
		for (int d = 0 ; d < graph->numberOfEdges - c - 1; d++) {
			if (graph->edges[d]->id > graph->edges[d + 1]->id) {
				swap = graph->edges[d];
				graph->edges[d] = graph->edges[d + 1];
				graph->edges[d + 1] = swap;
			}
		}
	}
	//For every edge, print the important details.
	for (int i = 0; i < graph->numberOfEdges; i++) {
		// If the vertices have the same color.
		if (strcmp(graph->edges[i]->fromVertex->color,
		           graph->edges[i]->toVertex->color) == 0) {
			printf("%d\n", graph->edges[i]->id);
			printf("%s\n", graph->edges[i]->name);
			printf("%s\n", graph->edges[i]->fromVertex->name);
			printf("%s\n", graph->edges[i]->toVertex->name);
			printf("%s\n", graph->edges[i]->fromVertex->color);
		}
	}
	return NULL;
}



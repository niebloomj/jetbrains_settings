/* graph.h
// @author Jacob Niebloom
// @email  jniebloo@u.rochester.edu
// @course CSC 173
// @day    Sep 18, 2015
// CSC 173 Coloring Project
 */

#ifndef _graph_h
#define _graph_h

#include <stdbool.h>

// C structures (structs) for vertices and edges
/* Each vertex has:
 * An integer ID
 * A name
 * A color
 */
typedef struct vertex {
	int id;
	char *name;
	char *color;
} *vertex_t;

/* Each edge has:
 * An integer ID
 * A name
 * A source vertex
 * A destination vertex
 */
typedef struct edge {
	int id;
	char *name;
	vertex_t fromVertex;
	vertex_t toVertex;
} *edge_t;

/* Each graph has:
 * An array of vertices
 * An array of edges
 * OPTIONAL: You may want to store some
 * properties of the graph in the struct.
 * For example, the number of colors,
 * whether the graph has a valid coloring,
 * etc.
 */
typedef struct graph {
	vertex_t *vertices;
	edge_t *edges;
	int numberOfVertices;
	int numberOfEdges;
} *graph_t;

// C functions that are defined in graph.c
vertex_t new_vertex(int id, char *name, char *color);
vertex_t get_vertex(int id, vertex_t *vertices);
edge_t new_edge(int id, char *name, vertex_t src, vertex_t dst);
graph_t new_graph(vertex_t *vertices, edge_t *edges, int vertCount, int edgeCount);
void print_vertex(vertex_t vertex);
void print_edge(edge_t edge);
void print_graph(graph_t graph);
int num_colors(graph_t graph);
bool has_valid_coloring(graph_t graph);
void *print_why_not_valid(graph_t graph);

#endif

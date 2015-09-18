# make_test.py
# generates a single random test case and puts it in the tests/ folder
# Input: a filename in which to store the input and result of the test case
# Ouptut: two files:
#   one called tests/in/<filename>.txt, which contains the input of the test case
#   the second called tests/correct/<filename>.txt, which contains the result your
#       program should get when running your C code on the input.
# 
# J. Hassler Thurston
# CSC 173 Fall 2015 -- Graph Coloring project
# 25 July 2015

# Instructions on how to run
# From the main project directory, navigate to the tests/ folder
# $ cd test
# run this script (e.g. if you want your test case to be named mytest.txt, do the following):
# $ python make_test.py mytest.txt

import sys
import random

colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]

# Vertex class
class Vertex(object):
    def __init__(self, id, name, color):
        self.id = id
        self.name = name
        self.color = color


# Edge class
class Edge(object):
    def __init__(self, id, name, src, dst):
        self.id = id
        self.name = name
        self.src = src
        self.dst = dst

# creates an array of vertices
def make_vertices(num_vertices):
    # By default, vertices are named after CS faculty + staff members
    with open("vertices.txt", 'r') as f:
        lines = f.readlines()
        lines = [l.strip() for l in lines]
        random.shuffle(lines)
        vertex_names = lines[:num_vertices]
    # create the vertex array, and shuffle them for good measure
    vertices = [Vertex(i, vertex_names[i], random.choice(colors)) for i in range(len(vertex_names))]
    random.shuffle(vertices)
    return vertices

# creates an array of edges
# NOTE: edge IDs may not be numbered consecutively!
def make_edges(vertices, num_edges):
    # there are n(n-1)/2 possible edges we can pick, so pick some of them
    possible_edges = [make_edge(vertices, i, j) for i in range(len(vertices)) for j in range(i)]
    num_possible_edges = len(vertices)*(len(vertices)-1)/2
    assert len(possible_edges) == num_possible_edges
    edge_indices = random.sample(range(num_possible_edges), num_edges)
    # return some edges, and shuffle them for good measure
    edges = [possible_edges[i] for i in edge_indices]
    random.shuffle(edges)
    return edges

# makes an Edge object from two vertices
def make_edge(vertices, i, j):
    name = "Edge " + vertices[i].name + "-" + vertices[j].name
    src = vertices[i]
    dst = vertices[j]
    return Edge(len(vertices)*i + j, name, src, dst)

# generates a random graph
# NOTE: The random graph is NOT guaranteed to be connected!
def create_random_graph():
    # the number of vertices will range from 2 to 20, inclusive
    num_vertices = random.randint(2, 20)
    # the number of edges will range from 1 to num_vertices(num_vertices-1)/2
    num_edges = random.randint(1, num_vertices * (num_vertices - 1) / 2)
    # store each vertex in an array, along with its name, color, and ID
    vertices = make_vertices(num_vertices)
    # store each edge in an array, along with its name, the
    # vertices it's connected to, and its ID
    edges = make_edges(vertices, num_edges)
    return vertices, edges

# converts a graph to its input representation
def graph_to_input(vertices, edges):
    string_to_write = ""
    # record the number of vertices and edges
    string_to_write += str(len(vertices)) + "\n" + str(len(edges)) + "\n"
    # for each vertex, record its ID, name, and color on separate lines
    for vertex in vertices:
        string_to_write += str(vertex.id) + "\n" + vertex.name + "\n" + vertex.color + "\n"
    # for each edge, record its ID, name, source vertex ID, and destination vertex ID
    for edge in edges:
        string_to_write += str(edge.id) + "\n" + edge.name + "\n" + str(edge.src.id) + "\n" + str(edge.dst.id) + "\n"
    return string_to_write

# computs the intended output of the graph
def graph_to_output(vertices, edges):
    string_to_write = ""
    # loop through the edges, recording the ones that have vertices of the same color
    bad_edges = [e for e in edges if e.src.color == e.dst.color]
    bad_edges.sort(key=lambda e: e.id)
    # if there are bad edges, output NO
    if len(bad_edges) > 0:
        string_to_write += "NO\n" + str(len(bad_edges)) + "\n"
        for e in bad_edges:
            string_to_write += str(e.id) + "\n" + e.name + "\n" + e.src.name + "\n" + e.dst.name + "\n" + e.src.color + "\n"
    # otherwise, there are no bad edges, so figure out the number of colors and output YES
    else:
        num_colors = len(set([v.color for v in vertices]))
        string_to_write += "YES\n" + str(num_colors) + "\n"
    return string_to_write

# main function: read the filename, generate a random graph, compute
# the intended result, and write the files to disk.
def main():
    # make sure you specify a filename!
    if len(sys.argv) < 2:
        print "Must specify a filename for the input/output pair."
        sys.exit(1)
    filename = sys.argv[1]
    # write the input and output to the relevant files
    # NOTE: Ideally, these files shouldn't exist yet. Otherwise,
    # this script will write over those files.
    infile = open("in/"+filename, 'w')
    outfile = open("correct/"+filename, 'w')
    # create the random graph
    vertices, edges = create_random_graph()
    # write the graph to the input file
    infile.write(graph_to_input(vertices, edges))
    infile.close()
    # write the output your program should get to the output file
    outfile.write(graph_to_output(vertices, edges))
    outfile.close()
    

if __name__ == '__main__':
    main()



// @author Jacob Niebloom
// @email  jniebloo@u.rochester.edu
// @course CSC 173
// @day    Sep 18, 2015

The assignment was to do a basic graph analysis to determine whether or not any edges have the same colored vertices. 
The hardest part to implement for me, was stdin and memory management. I have received more segment faults than I knew were possible. Luckily, that is resolved now. My implementation for stdin was to use scanf and its reformatted strings for everything, but I ended up using gets for the edge’s names because the format was inconsistent. After each group of lines, I created the proper struct and appended it to an array. Then I passed both the vertices array and the edges array into the new_graph method. The new graph now contains all the data from the file, but no logic has been performed yet. I created variables in the graph struct to hold the number of vertices and the number of edges. In graph_to_stdout in main.c is where I call the print_why_not_valid method which contains almost all of the graph logic. First, I calculate the number of bad edges and print that out. I then do a quick bubble sort. Finally, for every edge in the graph, if the colors on the from vertex and to vertex are the same, I print all the necessary detail about the graph.
I did use git version control in a private repository for the assignment.
Possible extra credit: I was able to figure out how to get scanf and fgets to work one right after another and back. 

I modified main.c, graph.h, and graph.c

Great assignment. Had a lot of fun. 
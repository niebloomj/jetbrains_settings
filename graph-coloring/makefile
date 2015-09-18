# makefile
# Compiles your C code for you
# To run, type 'make' at the command-line.
#
# J. Hassler Thurston
# CSC 173 Fall 2015 -- Graph Coloring project
# 25 July 2015

OBJECTS = main.o graph.o 
INCLUDES = main.h graph.h 
# -g: adds debugging symbols, allowing debuggers, such as gdb, to ID function and variable names.
# -std: tells the compiler which languauge standard the code should conform to. In this case, C99.
# -Wall: prints out all compiler warning messages, allowing you to catch more bugs in your code.
FLAGS = -g -std=c99 -Wall

# Generate an executable called coloring with the gcc command below.
# The first line (in this case, $(OBJECTS)) specifies dependencies. For example, creating the coloring
# executable depends on first creating the main.o and graph.o objects.
coloring:	$(OBJECTS)
			gcc -o coloring $(FLAGS) $(OBJECTS)

# Same format for these 2: figure out what we depend on, then generate the .o file with the specified GCC command.
main.o: 	main.c $(INCLUDES)
			gcc -c $(FLAGS) main.c

graph.o:	graph.c $(INCLUDES)
			gcc -c $(FLAGS) graph.c

# When you run "make clean", guarantee recompilation of all .o files and thus a complete rebuild.
clean:
			rm *.o coloring



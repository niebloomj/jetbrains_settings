#!/bin/bash
# grading_script.py
# runs your C code on randomly-generated graphs to check
# your code for correctness
# J. Hassler Thurston
# CSC 173 Fall 2015
# 25 July 2015

# Checks to see whether you've compiled your C code. 
# If you haven't, make sure to do that before
# running this script!
echo "checking for executable file..."
if [ ! -f coloring ]; then
    echo "No executable 'coloring' found." >&2;
    echo "Please run '\$ make' before running this script!" >&2;
    exit 1;
fi

# otherwise, this will first check your script
# against the 1000 test cases given in /tests.
echo "running your code on the given test cases..."
num_passes=0
num_tests=0
for file in tests/in/*; do
    echo -e "\tinput: $file"
    outfile=$(echo $file | sed 's/in/out/')
    correctfile=$(echo $file | sed 's/in/correct/')
    ./coloring < $file > $outfile 2>&1
    filediff=$(diff $outfile $correctfile 2>&1)
    test_result=
    if [[ -z $filediff ]]; then
        test_result="PASSED"
        num_passes=`expr $num_passes + 1`
    else
        test_result="FAILED"
    fi
    echo -e "\toutput: $test_result"
    num_tests=`expr $num_tests + 1`
done
echo "Number of tests that passed: $num_passes."
echo "Total number of tests: $num_tests."


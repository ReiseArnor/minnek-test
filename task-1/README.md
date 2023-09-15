# Task 1

Write a function to reverse the elements of a given array while keeping special characters in their original positions. The function should handle dynamic changes in the array and special character positions.

## Requirements
Lua >= 5.4

## Usage
``lua task-1.lua [input] [expected output(optional]``

The input needs to be a string with the elements separated by a comma.
### example
``lua task-1.lua "1,2,3,&,4,5,*,6,6,10"``
or
``lua task-1.lua "1,a,3,&,4,5,*,6,6,10" "10,6,6,&,5,4,*,3,a,1"``

You can also run it without arguments, just need to modify the "input" and "expected" variables inside the "default" function.
By default it uses {'n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8} as input.

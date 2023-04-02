# Hide Comments

Hide all comments in your code.

## Installation
`ppm install hide-comments`

## Keymap
Default keymap is: CTRL + ALT + H.

## Settings
#### Remove empty lines when hiding comments.
Enabled by default. If enabled, this:
```python
print("EXAMPLES") #this is a title
#This is
#a hello world
#example
print("Hello, World!")
```
becomes:
```python
print("EXAMPLES")
print("Hello, World!")
```
instead of:
```python
print("EXAMPLES")



print("Hello, World!")
```

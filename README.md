Coding Standards
================

Coding Standards and Practices for Javascript/ES6 used by [Pillar](https://pillarstudio.com).


# General

- Resolve all errors or warnings before pushing to production! 



# Variable Names

Variable name specifying content type followed by variable name using first upper-case letters.

- `sVariableName` strings
- `iVariableName` integers
- `nVariableName` floats
- `aVariableName` arrays
- `oVariableName` objects
- `bVariableName` booleans
- `fVariableName` functions and callbacks
- `tVariableName` unix timestamps

Also welcome:

- `isVariableName` booleans
- `hasVariableName` booleans

# Class Names

Use first upper-case letters for both class and file names.

- `ClassName`

# Comments and Documenting

## Class
```javascript
/**
 * @name ClassName
 *
 * @description
 * - Description 1
 * - Description 2
 * - Description 3
 * - ...
 */
```
## Class::Functions
```javascript
/**
 * @name ClassName.functionName
 * @function
 *
 * @param   {type}   xVariableName   Description
 * @param   {type}   ...             ...
 *
 * @returns {type}   xVariableName   Description
 *
 * @description
 * - Description 1
 * - Description 2
 * - Description 3
 * - ...
 */
```
## Class::Properties
```javascript
/**
 * @name ClassName.propertyName
 * @object
 *
 * @description
 * - Description
 * - ...
 */
```
## Code Explanations
```javascript
// Explanation content
// ...
```
## Todo
```javascript
// TODO: Task description
```

# References

1. [Folder Structure](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346)
2. [Angular Documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
3. [CSS BEM Syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)


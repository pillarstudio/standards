# Javascript Guidelines

## General

### Use a new let/const statement for each declaration
Minifier will do the job.

```
// Bad
let a = 'foo',
    b = a + 'bar',
    c = fn(a, b);
    
// Good
let a = 'foo';
let b = a + 'bar';
let c = fn(a, b);
```


### Common variables

```
// Event object

const onClick = function(e) {
    //
};


// Index and length

for(let i = 0, l = items.length; i < l; i++) {
    //
}
```



## ES6


### Block Scope

Whenever possible avoid the use of `var`.
Instead, use `const` as a default and whenever you need to mutate a value use `let`.

```
const speed = 100;

if(true) {
    let inMotion = false;
}

console.log(inMotion);
// Render => Error: inMotion is not defined!

speed = 50;
// Render => Error: speed is a constant!
```


### Classes

```
class Parent {
    constructor() {
    }
    
    foo() {
    }
    
    bar() {
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
    
    baz() {
    }
}

var parent = new Parent();
parent.foo();

var child = new Child();
child.foo();
```



### Requiring modules

```
import React from 'react';
import { Link } from 'react-router';
```


### Arrow functions

```
do.something(function(a, b) {
    return a + b;
});

// Can be cleaned up to
do.something((a, b) => {
    return a + b;
}

// For implicit returns (only applied to one-liners)
do.something((a, b) => a + b);


// Resolve context
var module = {
    age: 35,
    foo: function() {
        setTimeout(() => {
            console.log(this.age);
        }, 100);
    }
};
```



### Destructuring

To signal that you are destructuring, use extra spaces on either side.


```
// Objects
const foo = {
    bar: 1,
    baz: 2
};

const { bar, baz } = foo;

console.log(bar);
// renders => '1'

console.log(baz);
// renders => '2'
```

```
// Arrays
const foo = ['one', 'two', 'three'];
const [ first ] = tenses;

console.log(first);
// renders => 'one'
```

```
const foo = 2;

const obj = {
    bar: 1,
    foo
};

console.log(obj.foo);
// renders => '1'
```

```
const name = 'will';
const age = 26;

some.method({ name, age });

// will inject the following object
{
    name: 'will',
    age: 26
}
```

```
// bracket notation
const prop = 'opacity';

const style = {
    [prop]: .8
};
```

```

// destructuring with default values
function({ weight: w, height: h, max = 25, callback }) {
    const bmi = w / Math.pow(h, 2);
    
    if(bmi > max) {
        console.log('you are overweight');
    }
    
    if(callback) {
        callback(bmi);
    }
}

calcBmi({ weight, height, max: 25 });
calcBmi({ weight, height, callback: function() {} });
```


### Template Strings

```
const name = 'will';
const thing = 'party';

const greet = `Hi, my name is ${name} and I like to ${thing}!`;
```




## Documenting your code

### General

All files and classes should have JSDoc comments.

JSDoc can be parsed by a number of open source tools, and must be well-formed.

Syntax:

```
/**
 * A JSDoc comment should begin with a slash and 2 asterisks.
 */
```

Top-level comments: The top level file comment is designed to orient readers unfamiliar with the code to what is in this file and any other disclaimers clients of the code should be given. It should provide a description of the file's contents and any dependencies or compatibility information. As an example:

```
/**
 * Various components to handle management of lists of coaches for
 * the profile page.
 *
 * These utilities were not written to be a general purpose utility
 * for the entire code base, but has been optimized with the 
 * assumption that the Profile namespace is fully loaded.

 */
```

Class comments: Classes must be documented with a description, and appropriate type tags (see “Methods and properties” comments for more information on types on the constructor.

```
/**
 * Class making something fun and easy.
 *
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 */
function SomeFunClass(arg1, arg2) {

  // ...

}
```

### Methods and properties comments

All non-trivial methods and properties should also have JSDoc comments. Type annotations are strongly encouraged; if there is even a slight chance that the type will be ambiguous to future readers, put in a type annotation.

Type annotations are based on the ES4/JS2 type system, and are documented in the Google JavaScript style guide.

@param and @return type annotations that have comments that do not fit on one line wrap to the next line and indent 4 spaces.

Example:

```
/**
 * A UI component allows users to select badges from their full list
 * of earned badges, displaying them in a container.
 * Expects a Badges.BadgeList as a model.
 */
Badges.DisplayCase = Backbone.View.extend({
    /**
     * Whether or not this is currently in edit mode and the full
     * badge list is visible.
     */
    editing: false,

    /**
     * The full user badge list available to pick from when in edit mode.
     * @type {Badges.UserBadgeList}
     */
    fullBadgeList: null,

    /**
     * Enters "edit mode" where badges can be added/removed.
     * @param {number=} index Optional index of the slot in the display-case
     *     to be edited. Defaults to the first available slot, or if none
     *     are available, the last used slot.
     * @return {Badges.DisplayCase} This same instance so calls can be
     *     chained.
     */
    edit: function(index) {
    …
    },
   ...
};
```




http://ponyfoo.com/articles/tagged/es6-in-depth
http://projects.formidablelabs.com/es6-interactive-guide/#/
https://github.com/Khan/style-guides/blob/master/style/javascript.md
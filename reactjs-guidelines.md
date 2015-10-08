# Coding Guidelines - ReactJS



## Table of Contents

  1. [Basic Rules](#basic-rules)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)
  
  
  

## Basic Rules

- Only include one React component per file.
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.



## Naming
- File- and component name need to be identical.
- Use PascalCase naming convention for filename as well as component name, e.g. GlobalHeader.js

```javascript
// Bad
// Filename: foo.js

class Foo extends React.Component {}

export default Foo;


// Good
// Filename: Foo.js

class Foo extends React.Component {}

export default Foo;
```



## Ordering

- Ordering for class extends React.Component:

1. constructor
1. optional static methods
1. getChildContext
1. componentWillMount
1. componentDidMount
1. componentWillReceiveProps
1. shouldComponentUpdate
1. componentWillUpdate
1. componentDidUpdate
1. componentWillUnmount
1. *clickHandlers or eventHandlers* like onClickSubmit() or onChangeDescription()
1. *getter methods for render* like getSelectReason() or getFooterContent()
1. *Optional render methods* like renderNavigation() or renderProfilePicture()
1. render

- How to define propTypes, defaultProps, contextTypes, etc...  

```javascript
import React, { Component, PropTypes } from 'react';

const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
};

const defaultProps = {
    text: 'Hello World',
};

export default class Link extends Component {
    static methodsAreOk() {
        return true;
    }

    render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
    }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
```


## Alignment
- Follow these alignment styles for JSX syntax

```javascript
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
    <Spazz />
</Foo>
```


## Quotes

- Always use double quotes (`"`) for JSX attributes, but single quotes for all other JS.

```javascript
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />




## Props
- Always use camelCase for prop names.

```javascript
// bad
<Foo
    UserName="hello"
    phone_number={12345678}
/>

// good
<Foo
    userName="hello"
    phoneNumber={12345678}
/>
```



## Tags
- Always self-close tags that have no children.

```javascript
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
```

- If your component has multi-line properties, close its tag on a new line.
```javascript
// bad
<Foo
    bar="bar"
    baz="baz" />

// good
<Foo
    bar="bar"
    baz="baz"
/>
```


## Stateless function components
For stateless components use the function syntax, introduced in React 0.14.

```javascript
// Using an ES2015 (ES6) arrow function:
var Aquarium = (props) => {
    var fish = getFish(props.species);
    return <Tank>{fish}</Tank>;
};

// Or with destructuring and an implicit return, simply:
var Aquarium = ({species}) => (
    <Tank>
        {getFish(species)}
    </Tank>
);

// Then use: <Aquarium species="rainbowfish" />
```

[Read More](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)



## PropTypes declarations

- Setting propTypes declarations is mandatory
- Group them into required/none-required
- Alphabetically sort each group
- Separate them by a new line

```javascript
static propTypes = {
    blank: React.PropTypes.bool.isRequired,
    block: React.PropTypes.bool.isRequired,
    size: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
};
```


## Prefixing none React methods
Prefix all none React methods within a component with an underscore.

```javascript
class Foo extends React.Component {

    componentDidMount() {
        this._update();
    }
    
    _update() {
        // e.g. update position
    }
    
    render() {
        return (
            <div>foo</div>
        );
    }
}   
```

## Prefixing component wide variables
In the exception that you do not want to place a component wide variables on the state, you have to prefix it with an underscore.

```javascript
class Foo extends React.Component {

    componentDidMount() {
        this._el = React.FindDOMNode(this.refs.foo);
    }
    
    render() {
        return (
            <div>foo</div>
        );
    }
}   
```


## Using handler methods

- Name methods using `'_handle' + triggering event`, e.g. `_handleClick`
- Bind handler using the ES6 arrow syntax, so inside the callback it has always the right context

```javascript
class Foo extends React.Component {

    _handleClick = (e) => {
        this.setState(
            {
                clicked: true
            }
        );
    }
    
    render() {
        return (
            <button onClick={this._handleClick}>Submit</button>
        );
    }
}
```



## Using “container” components for loading data from Stores


```javascript
// CommentListContainer.js

class CommentListContainer extends React.Component {
    constructor() {
        super();
        this.state = { comments: [] }
    }
    componentDidMount() {
        $.ajax({
            url: "/my-comments.json",
            dataType: 'json',
            success: function(comments) {
            this.setState({comments: comments});
            }.bind(this)
        });
    }
    render() {
        return <CommentList comments={this.state.comments} />;
    }
}



// CommentList.js

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    _renderComment({body, author}) {
        return <li>{body}—{author}</li>;
    }
    render() { 
        return <ul> {this.props.comments.map(_renderComment)} </ul>;
    }
}
```

Source: https://medium.com/@learnreact/container-components-c0e67432e005



## Closing Components without children

```javascript
render() {
    return (
        <Foo>
            <Bar />
        </Foo>
    );
}
```


## List iterations

When rendering a list of components from an array, do it inline if it makes sense. If the map function is too long or complicated, consider extracting it out into its own method on the component class.

```javascript
render() {
    return (
        <ul>
            {this.state.fooList.map(fooItem => <FooItem>{fooItem}</FooItem>)}
        </ul>
    );
}
```


## Formatting Attributes

```javascript
<input
    type="text"
    value={this.state.foo}
    onChange={this._handleInputChange.bind(this, 'foo')}
/>
```



## Inline CSS styles
Static properties should be set in the SCSS, dynamic ones in JS.

```css
.Foo {
    background-color: #ff0;
}
```

```javascript
class Foo extends React.Component {

    render() {
        
        const styles = {
            'transform': 'translateX(' + this.state.position + ' + px)'
        };
    
        return (
            <div className="Foo" styles={classes}>Foo Header</div>
        )
    };

}
```




## Use "classnames" to set CSS classes

Use the [classnames](https://www.npmjs.com/package/classnames) node module for setting CSS classes on an element.

```javascript
import React from 'react';
import classnames from 'classnames';

class Foo extends React.Component {

    render() {
        
        const classes = classnames('FooHeader', {
            'is-fixed': this.state.fixed,
            'is-visible': this.state.visible
        });
    
        return (
            <div className={classes}>Foo Header</div>
        )
    };

}
```



## Working with DOM listeners
http://facebook.github.io/react/tips/dom-event-listeners.html


## Using StaticContainer for more granular control over shouldUpdate
https://github.com/reactjs/react-static-container


## Use higherOrder functions to add scroll/resize listeners
https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750


## Sources

- https://github.com/kriasoft/react-starter-kit/blob/master/docs/react-style-guide.md
- https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/

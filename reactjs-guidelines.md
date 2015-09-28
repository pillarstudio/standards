# Coding Guidelines - ReactJS


## Naming a component

- Its filename should use the PascalCase naming convention, e.g. GlobalHeader.js
- Its filename should be identical to its exported name, see below.

```javascript
// Filename: Foo.js

class Foo extends React.Component {}

export default Foo;
```


## Component organisation

```javascript
// node_modules
import React from 'react';

// helpers
import storeWatcher from 'helpers/storeWatcher';

// constants
import AppConstants from 'AppConstants';

// actions
import AppActions from 'AppActions';

// stores
import FooStore from 'FooStore';

// shared components
import Foo from 'components/foo/Foo';

// sub-components
import Bar from './components/Bar';


class Foo extends React.Component {

    static contextTypes = {}; // Only needed when using context!
    
    static propTypes = {};
    
    static defaultProps = {};
    
    state = {};
    
    // React lifecycle methods in order of occurrence
    
    componentWillMount() {
        // Add event listeners (Store, WebSocket, document, etc.)
    }
    
    componentDidMount() {
        // Use of refs (this.refs.foo)
    }
    
    componentWillReceiveProps() {}
    
    shouldComponentUpdate() {}
    
    componentWillUpdate() {}
    
    componentDidUpdate() {}
    
    componentWillUnmount() {
        // Remove event listeners (Store, WebSocket, document, etc.)
    }
    
    // None-react methods below
    
    _customMethodOne() {}
    
    _customMethodTwo() {}
    
    // Render method always comes last
    
    render() {}
}
```


## Stateless function components
Use the simpler syntax introduced in React 0.14.

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


## Formatting attributes
If an element/component has 2 or more attributes, split them over multiple lines. 

```javascript
<input
  type="foo"
  value={this.state.bar}
  onChange={this._handleBar} 
/>
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

# Coding Guidelines - ReactJS

TODO: create file template



## Naming a component

- Its filename should use the CamelCase naming convention
- Its filename should be identical to its exported name, see below

```
// Filename: Foo.js

class Foo extends React.Component {}

export default Foo;
```


## Component organisation

```
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

    static displayName = 'Foo';
    
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

```
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



## PropTypes declarations

- Setting propTypes declarations for every component is mandatory!
- Group them into required/none-required
- Alphabetically sort each group
- Separate them by a new line


```
static propTypes = {
    blank: React.PropTypes.bool.isRequired,
    block: React.PropTypes.bool.isRequired,
    size: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
};
```


## Prefixing none React methods
All none React methods are prefixed with an underscore.

```
class Foo extends React.Component {

    // Place all none-react methods here
    _handleClick() {}
    
    render() {
        return (
            <button onClick={this._handleClick}>Submit</button>
        );
    }
}
```


## Naming handler methods

- Name the handler methods after their triggering event
- Start the handler methods with '_handle' followed by the name of the event

```
class Foo extends React.Component {

    // Place all none-react methods here
    _handleClick() {}
    
    render() {
        return (
            <button onClick={this._handleClick}>Submit</button>
        );
    }
}
```


## Using “container” components for loading data from Stores


```
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



## Working with DOM listeners
http://facebook.github.io/react/tips/dom-event-listeners.html


## Closing Components without children
```
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

```
render() {
    return (
        <ul>
            {this.state.fooList.map(fooItem => <FooItem>{fooItem}</FooItem>)}
        </ul>
    );
}
```


## Formatting Attributes

```
<input
    type="text"
    value={this.state.foo}
    onChange={this._handleInputChange.bind(this, 'foo')} />
```



## Inline CSS styles
Static properties should be set in the SCSS, dynamic ones in JS.

```
// SCSS
.Foo {
    background-color: #ff0;
}


// JS
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

```
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

```
<input
  type="foo"
  value={this.state.bar}
  onChange={this._handleBar} 
/>
```

## Using StaticContainer for more granular control over shouldUpdate
https://github.com/reactjs/react-static-container


## Use higherOrder functions to add scroll/resize listeners
https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750


## Sources

- https://github.com/kriasoft/react-starter-kit/blob/master/docs/react-style-guide.md
- https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/

import React from 'react';



class ReactComponent extends React.Component {

    static contextTypes = {}; // Only needed when using context!

    static propTypes = {};

    static defaultProps = {};

    state = {
        foo: 'foo'
    };

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

    // clickHandlers/eventHandlers

    _handleClickSubmit() {}

    _handleChangeDescription() {}

    // Render method always comes last

    render() {}
}

export default ReactComponent;
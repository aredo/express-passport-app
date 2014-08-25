/**
 * @jsx React.DOM
 */
'use strict';

// config
var config = require('./config');
var api = require('./modules/api')(config);

// dependencies
var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');
var io = require('socket.io-client');
var sockets = require('./modules/home/sockets');

// custom components
var Counter = require('./modules/components/counter');
var Head = require('./modules/components/head');
var Header = require('./modules/components/header');

var App = React.createClass({

    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function (callback) {
        callback(null, this.props); // set the input props as state (equal to 'return this.props' in getInitialState, but async)
    },

    componentDidMount: function () {
        // intialize socket.io
        sockets(io);
    },

    render: function() {
        return (
            <html>
                <Head title={this.state.title} description={this.state.description} />
                <body id="profile">
                    <Header user={this.state.user} />
                    <div className="container">
                        <div className="jumbotron text-center">
                            <h1>Profile page</h1>
                        </div>
                    </div>

                    <div className="MainPage container">

                        <Counter initialCount={10} />

                    </div>
                </body>
            </html>
        );
    }
});

module.exports = App;

if (typeof window !== 'undefined') {
    if (config.environment == 'development') {
        window.React = require('react');
    }

    window.onload = function () {
        React.renderComponent(App(), document);
    }
}

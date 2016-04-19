import React from 'react';
import ReactDOM from 'react-dom';

// const React = window.nodeRequire('react');
// const ReactDOM = window.nodeRequire('react-dom');

class FileComponet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: ""
        };
    }
    dropFile(e) {
        console.log('file: ', file);
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        this.setState({
            filePath: file.path
        });
        return false;
    }
    dragoverFile(e) {
        console.log('dragoverFile');
        e.preventDefault();
        return false;
    }
    dragleaveFile(e) {
        console.log('dragoverLeave');
        e.preventDefault();
        return false;
    }
    render() {
        return ( < div ClassName = "row"
            id = "file-drag"
            onDrop = {
                this.dropFile.bind(this)
            }
            onDragover = {
                this.dragoverFile.bind(this)
            }
            onDragleave = {
                this.dragleaveFile.bind(this)
            } >
            < p > drag you file here... < /p> < p
            disabled = {
                this.state.filePath.length > 1
            } > {
                this.state.filePath
            } < /p> < /div >
        );
    }
}
ReactDOM.render( < FileComponet / > , document.getElementById('fileC'));

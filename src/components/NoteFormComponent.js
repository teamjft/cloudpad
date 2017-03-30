import React, {Component} from "react";
import {Button, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import jquery from "jquery";
import {UserData} from "../App";

class NoteFormComponent extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            note: {
                id: '',
                name: '',
                content: ''
            }
        }
    }

    render() {
        if (this.state.show) {
            return (
                <Form onSubmit={this._login.bind(this)}>
                    <FormGroup controlId="formControlsNoteName">
                        <ControlLabel>Notepad Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter notepad Name" value={this.state.note.name || ''}
                                     onChange={this._handleNameChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Notepad</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Write notes here" rows="10"
                                     value={this.state.note.content || ''}
                                     onChange={this._handleContentChange.bind(this)}/>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" className="pull-right">Save</Button>
                </Form>
            );
        } else {
            return null;
        }
    }

    _handleContentChange(event) {
        let note = this.state.note;
        note.content = event.target.value;
        this.setState({note: note});
    }

    _handleNameChange(event) {
        let note = this.state.note;
        note.name = event.target.value;
        this.setState({note: note});
    }

    _getNote(noteId) {
        let self = this;
        jquery.ajax({
            url: "http://localhost:8080/notepad/" + noteId,
            type: "GET",
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', UserData.getAccessToken());
            },
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (response) {
                self.setState({note: {id: response.id, name: response.name, content: response.content}, show: true});
            },
            error: function (xhr, status) {
                console.info("Error");
            }
        });
    }

    _login(event) {
        event.preventDefault();
        let self = this;
        jquery.ajax({
            url: "http://localhost:8080/notepad/" + this.state.note.id,
            type: "PUT",
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', UserData.getAccessToken());
            },
            data: JSON.stringify({"name": this.state.note.name, "content": this.state.note.content}),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (response) {
                alert("Notepad updated successfully.");
            },
            error: function (xhr, status) {
                console.info("Error");
            }
        });
    }
}

export default NoteFormComponent;
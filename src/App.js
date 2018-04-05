import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './components/Note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: '',
      notes: [],
      notesCount: 0,
    }
  }

  addNote() {
    let notesArr = this.state.notes;
    notesArr.push(this.state.noteText);
    this.setState({ noteText: '', notesCount: this.state.notes.length });
    this.textInput.focus();
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  deleteNote(index) {
    let notesArr = this.state.notes;
    notesArr.splice(index, 1);
    this.setState({ notes: notesArr, notesCount: this.state.notes.length });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      /*the mouse is automatically focused when enter key is pressed 
        so there is no need for this.textInput.focus();
      */
      let notesArr = this.state.notes;
      notesArr.push(this.state.noteText);
      this.setState({ noteText: '', notesCount: this.state.notes.length });
    }
  }

  render() {

    let notes = this.state.notes.map((val, key) => {
      if (val === '') {
        return
      }
      else {
        return <Note key={key} text={val} deleteMethod={() => this.deleteNote(key)} />
      }
    });

    return (
      <div className="container">
        <div className="header">
          <img src={logo} className="App-logo" alt="logo" />
          Task Manager
          <span className="header__note--count">Count : {this.state.notesCount}</span>
        </div>

        {notes}
        
        <div className="btn" onClick={this.addNote.bind(this)}>+</div>

        <input type="text" t
          ref={((input) => { this.textInput = input })}
          className="textInput"
          value={this.state.noteText}
          onChange={noteText => this.updateNoteText(noteText)}
          onKeyPress={this.handleKeyPress.bind(this)} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Evdrel').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
    
  }

  delete(id){
    firebase.firestore().collection('Evdrel').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">iRoad</Link></h4>
            {/* <h3 class="panel-title">
              {this.state.board.text}
            </h3> */}
          </div>
          <div class="panel-body">
            <dl>
            <dt>Мэдээлэл :</dt>
              <dd>{this.state.board.text}</dd>
              <dt>Зураг:</dt>
              <dd><img src={this.state.board.photo} alt={this.state.board.text} width="600" height="600"/></dd>
              <dt>Байршил:</dt>
              
              <dd><a target="_blank" href={`https://www.google.com/maps/place/${this.state.board.latitude},${this.state.board.longtitude}`}>{this.state.board.latitude},{this.state.board.longtitude}</a></dd>
              
              <dt>Мэдээлсэн:</dt>
              <dd>{this.state.board.email}</dd>
              
              
            </dl>
            {/* <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp; */}
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Устгах</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

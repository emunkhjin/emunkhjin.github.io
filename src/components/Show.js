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
          <h4><Link to="/">Буцах</Link></h4>
            {/* <h3 class="panel-title">
              {this.state.board.text}
            </h3> */}
          </div>


          



          <div class="panel-body">
            

          <div className="card mb-3" style={{maxWidth: 540}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={this.state.board.photo} alt={this.state.board.text} className="card-img" />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title"><dt>Мэдээлэл :</dt>
              <dd>{this.state.board.text}</dd></h5>
        <p className="card-text"><dt>Байршил:</dt>
              
              <dd><a target="_blank" href={`https://www.google.com/maps/place/${this.state.board.latitude},${this.state.board.longtitude}`}>{this.state.board.latitude},{this.state.board.longtitude}</a></dd>
              </p>
        <p className="card-text"><small className="text-muted"><dt>Мэдээлсэн:</dt>
              <dd>{this.state.board.email}</dd></small></p>
      </div>
    </div>
  </div>
</div>


            {/* <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp; */}
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Устгах</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

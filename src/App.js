import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Evdrel').orderBy("date", "desc");
    this.unsubscribe = null;
    this.state = {
      Evdrel: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const Evdrel = [];
    querySnapshot.forEach((doc) => {
      const { bairshil, email, photo, text, latitude, longtitude, date } = doc.data();
      Evdrel.push({
        key: doc.id,
        doc, // DocumentSnapshot
        bairshil,
        email,
        photo,
        text,
        latitude, 
        longtitude,
        date,
      });
    });
    this.setState({
      Evdrel
   });

   
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              iRoad
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/create" class="btn btn-primary">Add Board</Link></h4> */}
            <table class="table table-stripe table-hover  table-responsive">
            <thead class="thead-dark">
                <tr>
                  <th>Мэдээлэл</th>
                  <th>Зураг</th>
                  <th>Байршил</th>
                  <th>Мэдээлсэн</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Evdrel.map(board =>
                  <tr>
                   
                    <td><Link to={`/show/${board.key}`}><h4>{board.text}</h4></Link></td>
                    <td><img src={board.photo} alt={board.text} width="200" height="200" class="figure-img img-fluid rounded zoom"/></td>
                    <td><a target="_blank" href={`https://www.google.com/maps/place/${board.latitude},${board.longtitude}`}>{board.latitude},{board.longtitude}</a></td>
                    <td>{board.email}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStyles = {
  width: '30%',
  height: '20%'
};

// export default App;
export default (App);
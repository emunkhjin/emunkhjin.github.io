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
      const { bairshil, email, photo, text, latitude, longtitude, date, cat } = doc.data();
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
        cat
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


            <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Fluid jumbotron</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div>



                {this.state.Evdrel.map(board =>
                
                 
            <div className="card mb-3 border " style={{maxWidth: 540}}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={board.photo} className="card-img border border-danger" alt={board.text} />
                </div>
                <div className="col-md-8">
                  <div className="card-body ">
                  
                    <h5 className="card-title text-center"><a class="text-danger" href={`/show/${board.key}`}>{board.text}</a><small className="badge badge-danger float-right">{board.cat}</small></h5>
                    <p className="card-text"><small className="text-muted">Илгээсэн : {board.email}</small></p>
                    <p className="card-text"><small className="text-muted">Хүсэлт дугаар : {board.doc.id}</small></p>
                    <p className="card-text"><a className="btn btn-outline-danger btn-lg" target="_blank" href={`https://www.google.com/maps/place/${board.latitude},${board.longtitude}`}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path d="M7.5 4h1v9a.5.5 0 0 1-1 0V4z"/>
  <path fill-rule="evenodd" d="M6.489 12.095a.5.5 0 0 1-.383.594c-.565.123-1.003.292-1.286.472-.302.192-.32.321-.32.339 0 .013.005.085.146.21.14.124.372.26.701.382.655.246 1.593.408 2.653.408s1.998-.162 2.653-.408c.329-.123.56-.258.701-.382.14-.125.146-.197.146-.21 0-.018-.018-.147-.32-.339-.283-.18-.721-.35-1.286-.472a.5.5 0 1 1 .212-.977c.63.137 1.193.34 1.61.606.4.253.784.645.784 1.182 0 .402-.219.724-.483.958-.264.235-.618.423-1.013.57-.793.298-1.855.472-3.004.472s-2.21-.174-3.004-.471c-.395-.148-.749-.336-1.013-.571-.264-.234-.483-.556-.483-.958 0-.537.384-.929.783-1.182.418-.266.98-.47 1.611-.606a.5.5 0 0 1 .595.383z"/>
</svg></a></p>
                  </div>
                </div>
              </div>
            </div>

                )}
              

          </div>
        </div>
      </div>
    );
  }
}


// export default App;
export default (App);
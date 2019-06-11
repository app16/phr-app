import React from "react";
import {check} from 'react-icons-kit/feather/check'
import {x} from 'react-icons-kit/feather/x'
import { ButtonToolbar } from 'reactstrap';
import { Icon } from 'react-icons-kit'
import Nav from "./layouts/Nav";
import ProfileBar from "./layouts/ProfileBar";
import { withAuth } from '@okta/okta-react';
var param=null;
var patID=null;
const requests = []
const blockdata =[];


const TableRow1 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
    return (
      <tr>
        <td>{Req}</td>
        <td>{ProviderID}</td>
        <td>{Category}</td>
        <td>{CategoryID}</td>
        <td>{Status}</td>
        <td>
        <ButtonToolbar>
        <button type="button" onClick={()=>acceptRequest(Req,patID)} className="btn btn-success"><Icon size={'18'} icon={check}/></button>
        <button type="button" onClick={()=>rejectRequest(Req,patID)} className="btn btn-danger"><Icon size={'18'} icon={x}/></button>
       </ButtonToolbar>
       </td>
     </tr>
    );
  }

  const TableRow2 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
      return (
        <tr>
          <td>{Req}</td>
          <td>{ProviderID}</td>
          <td>{Category}</td>
          <td>{CategoryID}</td>
          <td>{Status}</td>
          <td>
          <ButtonToolbar>
            <button type="button" onClick={()=>revokeRequest(Req,patID)} className="btn btn-primary"><Icon size={'18'} icon={x}/></button>
          </ButtonToolbar>
          </td>
        </tr>
      );
    }

    const TableRow3 = ({ Req, ProviderID, Category, CategoryID, Status}) => {
        return (
          <tr>
            <td>{Req}</td>
            <td>{ProviderID}</td>
            <td>{Category}</td>
            <td>{CategoryID}</td>
            <td>{Status}</td>
            <td>
            </td>
          </tr>
        );
      }

      const TableRow4 = ({ SrNo, blockNumber, prevHash, currentHash}) => {
        return (
          <tr>
            <td>{SrNo}</td>
            <td>{blockNumber}</td>
            <td>{prevHash}</td>
            <td>{currentHash}</td>
          </tr>
        );
      }

function acceptRequest(Req,PatientID) {

  console.log('The accept button was clicked. ');
  var payload = {
    "reqID": Req,
    "response": "accepted",
    "patID": PatientID
  };

   fetch('http://130.147.175.222:8099/response',{
     method: 'post',
     body : JSON.stringify(payload),
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
   }).then(res =>{if (res.status>=200 && res.status<300) {
     console.log(res);
   }
 else {
   console.log('sometihng went wrong');
      }
    }).catch(err => err);

  console.log(payload);
}

function rejectRequest(Req,PatientID) {

  console.log('The button was clicked. ');
  var payload = {
    "reqID": Req,
    "response": "rejected",
    "patID": PatientID
  };

   fetch('http://130.147.175.222:8099/response',{
     method: 'post',
     body : JSON.stringify(payload),
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
   }).then(res =>{if (res.status>=200 && res.status<300) {
     console.log(res);
   }
 else {
   console.log('sometihng went wrong');
      }
    }).catch(err => err);

  console.log(payload);
}

function revokeRequest(Req,PatientID) {

  console.log('The button was clicked. ');
  var payload = {
    "reqID": Req,
    "patID": PatientID
  };

   fetch('http://130.147.175.222:8099/revoke',{
     method: 'post',
     body : JSON.stringify(payload),
     headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
   }).then(res =>{if (res.status>=200 && res.status<300) {
     console.log(res);
   }
 else {
   console.log('sometihng went wrong');
      }
    }).catch(err => err);

  console.log(payload);
}


export default withAuth(class PatientPermissions extends React.Component {
  constructor (props){
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.putblockdata = this.putblockdata.bind(this);
  }

  componentWillMount(){
    blockdata.length=0;
    requests.length=0;
    this.props.auth.getUser().then(res =>{
      console.log(res);
      patID = res.preferred_username;
      console.log(patID);
      param="patID="+patID;       
    }).then(()=>{
    fetch('http://130.147.175.222:8099/querypatreq?'+`${param}`,{
     method: 'get'
   }).then(res =>{if (res.status>=200 && res.status<300) {
    return res.json();
  }
 else {
   console.log('sometihng went wrong');
      }
    }).then(function (json){
      console.log(json)
      for (var i in json){
      console.log(json[i].Key);
      console.log(json[i].Record);
      let req={
        reqID:json[i].Key,
        record:json[i].Record
      }
      requests.push(req);
      }
      console.log(requests);
    }).then(()=>{
      console.log(param);
      this.putblockdata();
    });
  });
}

  putblockdata(){
    fetch('http://130.147.175.222:8099/chaindashboard?'+`${param}`,{
     method: 'get'
   }).then(res =>{if (res.status>=200 && res.status<300) {
     return res.json();
  }
 else {
   console.log('sometihng went wrong');
      }
    }).then(function (json){
      var count = 1;
      for (var i in json){
        let blocks={
          srno:count,
          block:json[i]
        };
        blockdata.push(blocks);
        count = count +1;
      }
      console.log(blockdata)
    });
  }

  render() {
    console.log("featured");
    return (
      <div>
        <div>
          <ProfileBar />
          <Nav />
        </div>
        <div className="container">
      <div className="well well-lg">
         <div className = "row">
          <div className ="col-8">
            <div className ="row-1">
              <div className ="panel panel-primary">                
              <div className="panel-body">
                <div className="table-hover">
                  <table className ="table">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">DoctorID</th>
                        <th scope="col">Category</th>
                        <th scope="col">CategoryID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Response</th>
                      </tr>
                      </thead>
                      <tbody>

                      {
                          requests.map((request) => {
                            if (request.record.Status == "pending"){
                            return (
                                <TableRow1
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                            );
                          } else if( request.record.Status == "accepted"){
                            return (
                                <TableRow2
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                            );
                          } else {
                            return (
                                <TableRow3
                                  key={request.reqID}
                                  Req={request.reqID}
                                  ProviderID={request.record.ProviderID}
                                  Category={request.record.Category}
                                  CategoryID={request.record.CategoryID}
                                  Status={request.record.Status}
                                />
                                );
                          }
                              })
                        }
                    </tbody>
                    </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div className ="col-4">
      <div className ="panel panel-primary">
          <div className="panel-body">
            <center>
                  <img src="https://static0.fitbit.com/simple.b-cssdisabled-jpg.h0c2a5f210795535caebd5d7da4a1d7e0.pack?items=%2Fcontent%2Fassets%2Fapp2%2Fimages%2Fscreen-04-log-weight.jpg" height="400" width="250"/>
            </center>
          </div>
       </div>
    </div>
</div>
<div className ="col-12">
    <div className ="row-1">
        <div className="panel-heading"> BLOCKS</div>
           <div className ="panel panel-primary">
          <div className="panel-body">
           <div className="table-hover">
            <table className ="table" style={{fontSize:'15px'}}>
            <thead>
           <tr>
           <th scope="col">#</th>
           <th scope="col">Block Number</th>
           <th scope="col">Previous Hash</th>
           <th scope="col">Current Hash</th>
           </tr>
           </thead>
           <tbody style={{'wordBreak': 'break-all'}}>
            {
               blockdata.map((upload) => {
                 return (
                     <TableRow4
                       key={upload.srno}
                       SrNo={upload.srno}
                       blockNumber={upload.block.blockNumber}
                       prevHash={upload.block.prevHash}
                       currentHash={upload.block.dataHash}
                     />
                 );
               })
             }

           </tbody>
           </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
});
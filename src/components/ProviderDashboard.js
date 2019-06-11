import React from "react";
import { Icon } from 'react-icons-kit';
import {plus} from 'react-icons-kit/ikons';
import { withAuth } from '@okta/okta-react';
import { ButtonToolbar } from 'reactstrap';
import ProfileBar from "./layouts/ProfileBar";
import ProviderNav from "./layouts/ProviderNav";
const patientUploads = [];
var param=null;
var username=null;
const blockdata =[];
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

export default withAuth(class ProviderDashboard extends React.Component {
  constructor (props){
    super(props);
    this.state={
      counter:0,
      reqResponse:{},
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.putblockdata = this.putblockdata.bind(this);
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

  handleRequest(PatientID, Category,CategoryID) {
    console.log('The button was clicked. ');
    var reqCounter = 'REQ'+this.state.counter;
    var reqPayload = {
      "reqID": reqCounter,
      "proID": username,
      "patID": PatientID,
      "category": Category,
      "categoryID":CategoryID
    };

     fetch('http://130.147.175.222:8099/request',{
       method: 'post',
       body : JSON.stringify(reqPayload),
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
     }).then(res =>{if (res.status>=200 && res.status<300) {
       return res.json();
     }
   else {
     console.log('sometihng went wrong');
        }
      }).then(data =>{
        this.setState({reqResponse:data});
        console.log(this.state.reqResponse);
      }).catch(err => err);
    console.log(reqPayload);
    var updatedCounter = this.state.counter + 1;
    this.setState({counter:updatedCounter});
    console.log(this.state);
  }

  componentWillMount(){
    blockdata.length=0;
    patientUploads.length=0;
    this.props.auth.getUser().then(res =>{
        console.log(res);
        username = res.preferred_username;
        console.log(username);
        param="patID="+username;       
      }).then(()=>{
            fetch('http://130.147.175.222:8099/querydb',{
            method: 'get'
            }).then(res =>{
                if (res.status>=200 && res.status<300) {
                    return res.json();
                }
                else {
                    console.log('sometihng went wrong');
                }
            }).then(function (json){
            var count=1;
            for(var i in json){
                for(var j in json[i].data){
                if(json[i].category=='Medication'){
                    let patreq={
                    id:count,
                    category:json[i].category,
                    patID:json[i].data[j].PatientID,
                    categoryID:'MED'+json[i].data[j].MedID
                    };
                    patientUploads.push(patreq);
                }
                else if (json[i].category=='History'){
                    let patreq={
                    id:count,
                    category:json[i].category,
                    patID:json[i].data[j].PatientID,
                    categoryID:'HIST'+json[i].data[j].HistID
                    };
                    patientUploads.push(patreq);
                }
                else {
                    let patreq={
                        id:count,
                        category:json[i].category,
                        patID:json[i].data[j].PatientID,
                        categoryID:'LIFE'+json[i].data[j].LifeID
                    };
                    patientUploads.push(patreq);
                    }
                    count = count +1;
                }
                }
                console.log(patientUploads);
                }
    );
    this.putblockdata();
  });
}
  render() {
    console.log("Upload Data");

    const TableRow = ({ SrNo, PatientID, Category, CategoryID}) => {
        return (
          <tr>
            <td>{SrNo}</td>
            <td>{PatientID}</td>
            <td>{Category}</td>
            <td>{CategoryID}</td>
            <td>
            <ButtonToolbar>
              <button type="button" onClick={()=>this.handleRequest(PatientID, Category,CategoryID)} className="btn btn-primary"><Icon size={'18'} icon={plus}/></button>
            </ButtonToolbar>
            </td>
          </tr>
        );
      }

    return (
        <div>
        <div>
          <ProfileBar />
          <ProviderNav />
        </div>
        <div className="container">
        <div className="card card-lg">
           <div className ="card card-primary">
                  <div className="card-heading">
                    <b>Patients List</b>
                  </div>
                  <div className="card-body">
                    <div className="table-hover">
                      <table className ="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">PatientID</th>
                            <th scope="col">Category</th>
                            <th scope="col">CategoryID</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                         {
                           patientUploads.map((upload) => {
                             return (
                                 <TableRow
                                   key={upload.id}
                                   SrNo={upload.id}
                                   PatientID={upload.patID}
                                   Category={upload.category}
                                   CategoryID={upload.categoryID}
                                 />
                             );
                           })
                         }
                        </tbody>
                      </table>
                    </div>
                  </div>
            </div>
            <div className ="col-12">
    <div className ="row-1">
        <div className="card-heading"> BLOCKS</div>
           <div className ="card card-primary">
          <div className="card-body">
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

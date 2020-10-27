import React, {Component} from 'react';
import './App.css';
import imageCompression from 'browser-image-compression';


class App  extends React.Component{
    constructor(props) {
        super(props);
        this.onFileCompress = this.onFileCompress.bind(this);
        this.state = {
        selectedFile: null,
        compressed: false,
        }
    }

    onChangeHandler = event => {
        if (event.target.files[0]) { 
            this.setState({
                selectedFile: event.target.files[0],
            });
            console.log('file selected');
        }
    }

    fileData = () => { 
        if (this.state.selectedFile && this.state.compressed) { 
            return ( 
                <div> 
                    <h2>File Details:</h2>
                    <p> File size:{this.state.selectedFile.size} bytes</p>
                    <a href="" id="dlbtn"><button className="button" onClick={this.save}>click here to download your Image</button></a>
                </div> 
            ); 
        }
        else if (this.state.selectedFile)
        {
            return ( 
                <div> 
                <h2> File size :{this.state.selectedFile.size} bytes</h2>
                </div> 
            );
        }
        else { 
            return ( 
                <div className="rounded-list">
                    <h1>STEPS TO COMPRESS AN IMAGE:</h1> 
                        <ol>
                            <li><a href="">Click on the "Up-head arrow".</a></li>
                            <li><a href="" >Select an image from the device.</a></li>
                            <li><a href="" >Click on the compress button.</a></li>
                            <li><a href="">click on "Download" button.</a></li>
                            
                        </ol>
                </div> 
            ); 
        } 
    }
    
    onFileCompress = async() => {
        console.log('xxxxxx');
        if (this.state.selectedFile && this.state.compressed===false) {
            console.log('file compressing');
            var imageFile = this.state.selectedFile;
            console.log(imageFile);
            console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
            console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
            
    
            var options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(imageFile, options);
            this.setState({
                selectedFile: compressedFile,
                compressed: true,
            });
            console.log(compressedFile);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        }    
        else {
            console.log('selectedfile is null');
            return ( 
                <div class="rounded-list"> 
                        <ol>
                            <li>Click on the "Choose file".</li>
                            <li>Select an image from the device.</li>
                            <li>Click on the compress button.</li>
                            <li>click on "Download" button</li>
                            <li>You can now view the compressed image</li>
                        </ol>
                </div> 
            );
        }
    }
    
    save=() => {
        if (this.state.selectedFile) {
            var name = "new file";
            var dlbtn = document.getElementById("dlbtn");
            var file = new Blob([this.state.selectedFile], {type:'image/jpeg'});
            dlbtn.href = URL.createObjectURL(file);
            dlbtn.download = name;
            this.setState({
                selectedFile: null,
                compressed: false,
            });
        }
    }
    
    render() {
        return (
            
            <div className= "app">
                     <header>
                    <h3>IMAGE COMPRESSOR</h3>
                    </header>
                <div class="wrapper">
                    <div class="file-upload">
                        <input className="input-field" type="file"  accept="image/*" onChange={this.onChangeHandler} id="my file" name="file name" size="file size"></input>
                        <i class="fa fa-arrow-up"></i>
                    </div>
                </div>
                <div class="wrapper">
                    <button className="button" onClick={() => this.onFileCompress()}>Compress</button>
                </div>
                {this.fileData()}
            </div>
        );
    }
    

}
 
  

export default App;


// import React,{Component} from 'react';
//  import './App.css';
//  import imageCompression from 'browser-image-compression';


//  class App  extends React.Component{
//      constructor(props) {
//          super(props);
//          this.state = {
//          selectedFile: null
//          }
//      }

//      onChangeHandler = event => {
//          this.setState({
//              selectedFile: event.target.files[0],
//          });
//          console.log('file selected');
//      }

//      fileData = () => { 
//          if (this.state.selectedFile) { 
//              return ( 
//                  <div> 
//                      <h2>Selected File Details:</h2> 
//                     <p>File Name: {this.state.selectedFile.name}</p> 
//                      <p>File Type: {this.state.selectedFile.type}</p> 
//                      <p> 
//                          Last Modified:{" "} 
//                          {this.state.selectedFile.lastModifiedDate.toDateString()} 
//                      </p>
//                      <p> Original File size:{this.state.selectedFile.size} bytes</p>
//                  </div> 
//              ); 
//          } 
//          else { 
//              return ( 
//                  <div> 
//                      <br />                     
//                     <p>Click on the "Choose file" button to compress a file</p>
//                 </div> 
//              ); 
//          } 
//      }

//      onFileCompress = () => {
//          if (this.state.selectedFile) {
//            console.log('file compressing');
//                var imageFile = this.state.selectedFile;
//              console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
//              console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
            
//              var options = {
//                  maxSizeMB: 1,
//                 maxWidthOrHeight: 1920,
//                  useWebWorker: true
//              }
//              const compressedFile =  await imageCompression(imageFile, options);
//             console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
//             console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
//         }
//         else {
//             console.log('selectedfile is null');
//             return ( 
//                 <div> 
//                     <br /> 
//                     <p>Click on the "Choose file" button to compress a file</p>
//                 </div> 
//             );
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     <form>
//                         <input type="file"  accept="image/*" onChange={this.onChangeHandler} id="my file" name="file name" size="file size"></input>
//                         <button onClick={() => this.onFileCompress()}>Compress</button>
//                     </form>
//                 </div>
//                 {this.fileData()}
//             </div>
//         );
//     }
// }
 
 
  

// export default App;



import React, {  useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main_Service from "../Service/mainservice";
import {thumbnailbaseurl} from "../Service/http-Common"

function Mainpage(props) {

    const [previewimages, setpreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [thumbnailedimage, setThumbnailedimage] = useState([])
    const [flag, setFlag] = useState()

    const handleMultipleImages =(e)=>{
        const selectedFIles =[];
        const targetFiles =e.target.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file)=>{
           return selectedFIles.push(URL.createObjectURL(file))
        })
        setImages(e.target.files)
        setpreviewImages(selectedFIles);
        setFlag(false)
      }

      // this function is used for upload image to backend
      const handleupload = async(e) => {
        const allimages = new FormData() 
        Object.values(images).forEach(image=>{
            allimages.append("images", image);
        });        
        await Main_Service.uploadimage(allimages)   // service which is created to make api request
        .then((response) => {
            setThumbnailedimage(response.data.data)
        });
    }

    return (
        <div style={{margin: "7rem"}}>
            <center><h3 style={{color: 'green'}}>FARO TASK</h3></center><br />
            <div className="mb-3">
                <input className="form-control" type="file" id="formFile" onChange={handleMultipleImages} accept=".jpg,.gif,.png" multiple/>
            </div>
            <button className="btn btn-success" onClick={handleupload}>Upload</button>
            <span style={{color: 'red'}}> Please click on Upload button to create thumbnail and to store image and thumbnails in storage.</span>
            <hr />
            <button style={{marginRight: "2rem"}} className="btn btn-dark" onClick={(e) => setFlag(false)}>See original</button>
            
            <button className="btn btn-primary" onClick={(e) => setFlag(true)}>See Thumbnails</button>
            {
                flag ? 
                <div>
                    <h3 style={{color: 'blue', marginTop: '1rem'}}>Thumbnailed Images</h3> <span style={{color: 'red'}}> This Thumbnailed image is reduced to size 200*200 px.</span>
                    <div className="row" style={{marginTop: "3rem"}}>
                    {
                        thumbnailedimage.map((url)=>{
                            return (
                                <div className="col" >
                                <div className="col ">
                                <img src={thumbnailbaseurl + url} alt="Thumbnail not found" />
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                :
                <div>
                    <h3 style={{ marginTop: '1rem'}}>Original Images</h3> <span style={{color: 'red'}}> I have give fix size to this Original images to 400*500 px.</span>
                    <div className="row" style={{marginTop: "3rem"}}>
                    {
                        previewimages.map((url)=>{
                            return (
                                <div className="col" >
                                <div className="col ">
                                <img src={url} alt="No img found"  style={{height: "400px", width: "500px"}}/>
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            
            }
            
        </div>
    );
}

export default Mainpage;
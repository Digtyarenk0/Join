import {actionPromiseAdding} from "../../../redux/adding/actions";
import getGQL from "../../../getGQL";
import Dropzone from "react-dropzone";
import {connect} from "react-redux";
import React from "react";


const dispatchUploadFile = (file) => async dispatch => {
    const fd = new FormData()
    fd.append('photo', file)
    let uploadDone = await fetch('/upload',
        {
            method: 'POST',
            body: fd
        }).then(res => res.json())
    console.log("FILE", uploadDone)
    let msg = await dispatch(actionPromiseAdding(await getGQL('/graphql')
    (`mutation UploadUserIco($originalFilename: String, $filename: String){
                      uploadUserIco(originalFilename: $originalFilename, filename: $filename ){
                       id
                        urlFilename
                            user{
                              id
                            }
                      }
                    }`, `{"originalFilename": \"${uploadDone.filename}\",
                                  "filename": \"${uploadDone.urlFilename}\"}`), 'uploadUserIco'))
}


const DropZone = ({uploadFile}) => {
    return (
        <Dropzone onDrop={acceptedFiles => {
            acceptedFiles.map(file => uploadFile(file))
        }}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} accept=".jpg, .jpeg, .png , .ico"/>
                        <label style={{cursor: "pointer"}}
                               className="w-100 h-100 pl-2 d-flex justify-content-center align-content-center">
                            <svg viewBox="0 0 16 16" style={{maxWidth: "80px", minWidth: "25px"}}
                                 className="bi bi-file-earmark-arrow-up h-50 w-50"
                                 fill="rgb(114, 137, 218)">
                                <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                                <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
                                <path fillRule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path d="M8 12c4 0 5 1.755 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12z"/>
                            </svg>
                        </label>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}


export default connect(null, {uploadFile: dispatchUploadFile})(DropZone)
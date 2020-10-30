import {actionPromiseAdding} from "../../../redux/adding/actions";
import getGQL from "../../../getGQL";
import Dropzone from "react-dropzone";
import checkNested from "../../../checkNested";
import {connect} from "react-redux";
import React from "react";


const dispatchUpdateFile = (file) => async dispatch => {
    const fd = new FormData()
    fd.append('photo', file)
    let uploadDone = await fetch('/upload',
        {
            method: 'POST',
            body: fd
        }).then(res => res.json())
    console.log("FILE", uploadDone)
    let msg = await dispatch(actionPromiseAdding(await getGQL('/graphql')
    (`mutation UpdateUserIco($originalFilename: String, $filename: String){
                      updateUserIco(originalFilename: $originalFilename, filename: $filename ){
                       id
                        urlFilename
                        userId
                      }
                    }`, `{"originalFilename": \"${uploadDone.filename}\",
                                  "filename": \"${uploadDone.urlFilename}\"}`), 'uploadUserIco'))
}


const UserIco = ({url}) => {
    return (
        <img style={{height: "70px", width: "70px", borderRadius: "50%"}} src={"http://localhost:4000/media/" + url}
             alt=""/>
    )
}

const DropZoneUpdateIco = ({uploadFile, user}) => {
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
                            <UserIco url={user.ico.urlFilename}/>
                        </label>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

const mapUserIco = state => {
    return {
        user: checkNested(state, 'user', 'user')
    }
}

export default connect(mapUserIco, {uploadFile: dispatchUpdateFile})(DropZoneUpdateIco)

import React from "react";

const MSGTypeText = ({media, username, createdAt, content, index}) => {

    return (
        <li className="p-0 m-0 " style={{listStyle: "none"}} key={index}>
            <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                <div className="m-1"><img
                    src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                    alt="avatar"
                    style={{height: "25px", width: "25px", borderRadius: "100%"}}/></div>
                <div className="d-flex flex-column">
                    <div className="d-flex m-1 p-0"><p className="mb-0" style={{color: "#43b581"}}>{username}</p><p
                        className="mb-0 p-1 pb-0"
                        style={{fontSize: "12px"}}>{createdAt}</p>
                    </div>
                    <div className="m-0 ml-1 p-0 pb-1 text-left"><p className="m-0 clip" style={{
                        color: "#b9bbbe",
                        maxWidth: "42vw"
                    }}>{content}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

const MSGTypePhoto = ({media, username, createdAt, content, index}) => {

    return (
        <li className="p-0 m-0 " style={{listStyle: "none"}} key={index}>
            <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                <div className="m-1"><img
                    src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                    alt="avatar"
                    style={{height: "25px", width: "25px", borderRadius: "100%"}}/></div>
                <div className="d-flex flex-column">
                    <div className="d-flex m-1 p-0"><p className="mb-0" style={{color: "#43b581"}}>{username}</p><p
                        className="mb-0 p-1 pb-0"
                        style={{fontSize: "12px"}}>{createdAt}</p>
                    </div>
                    <div className="m-0 ml-1 p-0 pb-1 text-left">
                        <a href={content}>
                            <img style={{maxHeight: "150px"}} src={"http://localhost:4000/media/" + content}
                                 alt="ERRLOAD"/>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}


export default ({message: {id, content, createdAt, user: {id: userId, username, media}, type}}, index) => {
    media ? media[0] ? media = media[0] : media = {} : media = {}
    media ? media.urlFilename ? media = media : media.urlFilename = "" : media.urlFilename = ""
    createdAt === "Загрузка..." ? createdAt = "" : createdAt = new Date(Number(createdAt)).getHours() + ":" + new Date(Number(createdAt)).getMinutes()
    if (type == "text") {
        return <MSGTypeText media={media} content={content} username={username} createdAt={createdAt} index={index}/>
    }
    if (type == "photo") {
        return <MSGTypePhoto media={media} content={content} username={username} createdAt={createdAt} index={index}/>
    }
    return (
        <li className="p-0 m-0 " style={{listStyle: "none"}} key={index}>
            <div className="m-1 d-flex MessageItem" style={{background: "#36393f", borderRadius: "15px"}}>
                <div className="m-1"><img
                    src={"http://localhost:4000/media/" + (media.urlFilename ? media.urlFilename : "deffaultAvatar.ico")}
                    alt="avatar" style={{height: "25px"}}/></div>
                <div className="d-flex flex-column">
                    <div className="d-flex m-1 p-0"><p className="mb-0" style={{color: "#43b581"}}>*</p><p
                        className="mb-0 p-1 pb-0"
                        style={{fontSize: "12px"}}></p>
                    </div>
                    <div className="m-0 ml-1 p-0 pb-1 text-left">
                        <p className="m-0 clip" style={{
                            color: "#b9bbbe",
                            maxWidth: "42vw"
                        }}>Данные об этом сообщении повреждены</p>
                    </div>
                </div>
            </div>
        </li>

    )
}
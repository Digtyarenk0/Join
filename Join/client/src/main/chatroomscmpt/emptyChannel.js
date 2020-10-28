import React from 'react';


export default  () =>
    <ul className="p-0 m-0" id="UlChatsUserForMain">
        <li className="m-0 p-0 text-center RoomsChatsElement" style={{listStyle: 'none'}}>
            <label className="m-0 p-0" htmlFor="inputSearchRooms">
                <div className=" p-1 m-0 d-flex" style={{background: "transparent"}}></div>
                <div className="d-flex flex-column w-100 h-100">
                    <div className="d-flex justify-content-center p-0 pt-1 w-100 h-100">
                        <p className="pb-0 m-0" style={{color: "#e3e3e3", fontWeight: "500"}}>Ждем чатов</p>
                    </div>
                    <div className="m-0 ml-0 p-0 pb-1" style={{maxHeight: "50px", overflow: "hidden"}}>
                        <p style={{color: "#b9bbbe"}}>Давай найдем твоего Bro!</p>
                    </div>
                </div>
            </label>
        </li>
    </ul>


import axios from "axios";
import React, {useState, useEffect} from "react";
import { setSourceMapRange } from "typescript";
import './Profile.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import {useGlobalContext} from "/src/context/StateContext";

function Profile() {
    
    const { User, setUser } = useGlobalContext();
    const user = JSON.parse(User);
    const update = async(e)=>{
        const FlatNo = e.target.FlatNo.value;
        const ParkingSlot = e.target.ParkingSlot.value;
        const Block = e.target.Block.value;
        const Mobile = e.target.Mobile.value;
        const Email = e.target.Email.value;
        const OwnerName = e.target.OwnerName.value;
        const RegisteredName = e.target.RegisteredName.value;

        const { data } = await axios.put("http:localhost:4000/api/v1/userupdate",{
            OwnerName: OwnerName,
            RegisteredName: RegisteredName,
            Email: Email,
            Mobile: Mobile,
            ParkingSlot: ParkingSlot,
            FlatNo: FlatNo, 
            Block: Block
        })
        const user = data.user;
        if(user!==[] && !user){
            navigate('/UserProfile');
        }
        else{
            localStorage.getItem("User",JSON.stringify(user));
            setUser(JSON.stringify(user));
        }

    }
    const UpdateSubmit = (e) => {
        e.preventDefault();
        update(e);
    };

    return (
        <>
        <LoginNavBar/>
            <div>
                <form onSubmit={UpdateSubmit}>
                    <div className="UserProfileDiv">
                        <p id="userProfileTitle">USER PROFILE</p>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src="/src/assests/user.svg" id="userProfileImg" ></img>
                        </div>
                        <div className="ProfileInput" style={{marginTop:"40px"}}>
                            <p className="EditTitle">NAME</p>
                           
                            <input placeholder={user.OwnerName} name="OwnerName" className="EditInput"></input>
                             
                        </div>
                        <div className="ProfileInput">
                            <p className="EditTitle">EMAIL ADDRESS</p>
                            <input placeholder={user.Email} name="Email" className="EditInput"></input>
                             
                        </div>
                        <div className="ProfileInput">
                            <p className="EditTitle">MOBILE NUMBER</p>
                            
                            <input placeholder={user.Mobile} name="Mobile" className="EditInput"></input>
                             
                        </div>
                        <div className="ProfileInput">
                            <p className="EditTitle">BLOCK</p>
                            
                            <input placeholder={user.Block} name="Block" className="EditInput"></input>
                             
                        </div>
                        <div className="ProfileInput">
                            <p className="EditTitle">FLAT NUMBER</p>
                            <input placeholder={user.FlatNo} name="FlatNo" className="EditInput"></input>
                             
                        </div>
                        
                        <div className="ProfileInput" >
                            <p className="EditTitle">PROPERTY REGISTERED NAME</p>
                            <input placeholder={user.RegisteredName} name="RegisteredName" className="EditInput"></input>
                             
                        </div>

                        <div className="ProfileInput" >
                            <p className="EditTitle">PARKING SLOT</p>
                            <input placeholder={user.ParkingSlot} name="ParkingSlot" className="EditInput"></input>
                             
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        <button className="UserProfileSubmit" type="submit">UPDATE</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile;
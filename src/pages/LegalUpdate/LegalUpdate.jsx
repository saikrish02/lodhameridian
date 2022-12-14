import { Alert } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import './LegalUpdate.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar';
import { useGlobalContext } from '/src/context/StateContext';

function LegalUpdate() {
    const { User, setLoading, loading } = useGlobalContext();
    const [DuplicateLegalUpdate, setDuplicateLegalUpdate] = useState(0);
    const PostLegalUpdate = async (Title, Description) => {
        setLoading(true);
        const { data } = await axios.post("http://localhost:4000/api/v1/notification/new", {
            Title: Title,
            Description: Description
        });
        if(data.success === false){
            setDuplicateLegalUpdate(2);
        }
        else{
            setDuplicateLegalUpdate(1);
        }
    }
    const LegalUpdateSubmit = (e) => {
        const Title = e.target.Title.value;
        const Description = e.target.Description.value;
        e.preventDefault();
        PostLegalUpdate(Title, Description);
        e.target.Title.value = "";
        e.target.Description.value = "";
    };



    return (
        <>
            <LoginNavBar />
            <div>

                <p id="title2">LEGAL UPDATE</p>

                <div style={{ marginLeft: "55px", height: "3px", width: "200px", backgroundColor: "gold" }}></div>
                {
                    DuplicateLegalUpdate > 0 ? DuplicateLegalUpdate===2? <Alert message="Error" type="error" description="Legal Update Details Already Exists! Please try again" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%",letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} />
                    :
                    <Alert message="Success" type="success" description="Legal Update Details Posted Successfully!" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%", letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} /> : <></>
                }               
                <div class="container" >
                    <div class="row mx-0 justify-content-center">
                        <div class="col-md-10 col-lg-9 px-lg-2 col-xl-8 px-xl-0">
                            <form
                                className="w-100 rounded p-4 border backgroundcolor HelpDeskSection"
                                onSubmit={LegalUpdateSubmit}
                            >

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Legal Update Title</span>
                                    <input
                                        name="Title"
                                        type="text"
                                        id="activity"
                                        class="form-control temp"
                                        placeholder="Legal Update Title"
                                    />
                                </label>

                                <div class="mb-4">
                                    <label class="d-block mb-2 head">Related Files</label>
                                    <p style={{ fontSize: "14px" }}>(.xlsx, .xls, images, .doc, .docx, .pdf are only accepted)</p>
                                    <div class="form-control h-auto temp">
                                        <input name="receipt" type="file" class="form-control-file" multiple accept=".xlsx,.xls,image/*,.doc, .docx,.pdf" />
                                    </div>
                                </div>

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Description</span>
                                    <textarea
                                        name="Description"
                                        class="form-control temp"
                                        rows="3"
                                        placeholder="Description for Legal Update"
                                    ></textarea>
                                </label>

                                <div class="mb-3">
                                    <button type="submit" class="btn btn-dark px-3 w-100 Help-desk-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LegalUpdate;
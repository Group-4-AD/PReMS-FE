import moment from "moment"
import { useEffect, setState, useState } from "react"
import { useDispatch, useSelector, Loading} from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import {useLocation} from 'react-router-dom';

function ProjectDetails(){

    const loadingStatus= true;
    const dispatch = useDispatch()
    const location = useLocation();
    const [data, setData] = useState([]);
    const [startDate] = useState("-");
    const [endDate] = useState("-");
    const [projectCode] = useState("-");
    const [type] = useState("-"); 
    const [category] = useState("-");
    const [cost] = useState("-");
    const [description] = useState("-");
    const [status] = useState("-");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // location.state.id
              const token = localStorage.getItem('token')
  
              fetch('https://presm-be.vercel.app/api/api/getProjectDetail/'+location.state.id)
              .then(response => response.json())
              .then(data => setData(data))
              .catch(error => console.log(error));

              this.setState ({
                projectCode : data[0].projectCode,
                description: data[0].projectDetail,
              });
            } catch (error) {
              console.log('An error occurred while fetching data:', error);
            }
          };
            // Optionally, you can set a polling interval to fetch data continuously
            const interval = setInterval(() => {
                fetchData();
            }, 5000); // Fetch data every 5 seconds
        
            // Clean up the interval when the component is unmounted
            return () => clearInterval(interval);
      }, []);

    // Call API to update
    const updateProfile = () => {
        dispatch(showNotification({message : "Project Details Updated", status : 1}))
        
    }

    const uploadfile = () => {
        try {
            dispatch(showNotification({message : "Project File Uploaded", status : 1}))
            
        } catch (error) {
            dispatch(showNotification({message : "An Error Had Occurred", status : 0}))
           
        }
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            <TitleCard title="Project Details" topMargin="mt-2">
            
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Project Start Date" defaultValue={startDate} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project End Date" defaultValue={endDate} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Code" defaultValue={location.state.id ?? "-"} updateFormValue={updateFormValue}>{location.state.id}</InputText>
                        <InputText labelTitle="Project Type" defaultValue={type} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Category" defaultValue={category} updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Cost" defaultValue={cost} updateFormValue={updateFormValue}/>
                        <TextAreaInput labelTitle="Project Description" defaultValue={useState.description} updateFormValue={updateFormValue}/>
                        <labelTitle labelTitle="Project Status" defaultValue={status}></labelTitle>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextAreaInput labelTitle="Project Team Members" defaultValue="-" updateFormValue={updateFormValue}/>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => uploadfile()}>Upload</button></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th> Document Name</th>
                                    <th> Date</th>
                                    <th></th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default ProjectDetails
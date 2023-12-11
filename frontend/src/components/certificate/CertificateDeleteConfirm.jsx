import { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import Alert from "../site/Alert";
import Swal from "sweetalert2";

export default function CertificateDeleteConfirm(){
    const { certificateId } = useParams();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [res,setRes] = useState(null)

    const {register,handleSubmit,formState: { errors }} = useForm();

    const submitForm = async (data) => {
        setLoading(true);

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
            }
         });

        try {
            const response = await fetch(`http://localhost:8080/api/certificate/${certificateId}`,
            {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();
            const payload = {
                payload: resData,
                status: response.status,
            };
            setRes(payload);
  
            if(response.status === 200){
                Toast.fire({
                    icon: "success",
                    title: `Certificate has been deleted succesfully`
                  });
                setLoading(false);
                navigate('/')
            }else{
                setLoading(false);
            }
      
          } catch (error) {
                setLoading(false);
                console.error('Error submitting form:', error);
          }

      };

    return (
        <>
            {res && <Alert type={res.status} message={res.payload.message}/>}
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={handleSubmit(submitForm)} method="post" action='/certificate/delete' className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Please Enter 12 digit license ID </label>
                        <input
                            id="license_id"
                            type="text"
                            className="form-control" 
                            {...register('license_id',{ required: "Please enter your License id here" })} 
                            placeholder="Add user name"
                        />
                        <div style={{'color': 'red'}}>
                            {errors?.license_id && errors.license_id.message}
                        </div>
                        
                    </div>
                    <button type="submit" className="btn btn-danger" disabled={loading}>{loading === true ? 'Please Wait..' : 'Delete'}</button>
                </form>
                <hr/>
            </div>
        </>
    );
}

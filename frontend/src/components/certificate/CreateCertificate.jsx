import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../site/Alert";

export default function CreateCertificate(){
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [loading,setLoading] = useState(false)
    const [res,setRes] = useState(null)

    const submitForm = async (data) => {
        setLoading(true);
      
        try {
          const response = await fetch(`http://localhost:8080/api/certificate`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const clonedResponse = response.clone();
            const resData = await response.json();
            
            const fileName = resData.certificate.file_name;            

            //function for download certificate file
            downloadFileFromResponse(clonedResponse,fileName)
            
        
            const payload = {
                payload: resData,
                status: response.status,
            };
        
            setRes(payload);
        
            setLoading(false);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
    
        } catch (error) {
            console.error('Error submitting form:', error);
            setLoading(false);
        }
      };

    
    const downloadFileFromResponse = async(response,fileName)=>{

        const blob = await response.blob();
        console.log(fileName)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            {res && <Alert type={res.status} message={res.payload.message}/>}
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={handleSubmit(submitForm)} method="post" action='/certificate/create' className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control" 
                            {...register('name',{ required: "Name is required" })} 
                            placeholder="Add user name"
                        />
                        <div style={{'color': 'red'}}>
                            {errors?.name && errors.name.message}
                        </div>
                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control" 
                            {...register('email',{ required: "Email is required" })} 
                            placeholder="Add user email"
                        />
                        <div style={{'color': 'red'}}>
                            {errors?.email && errors.email.message}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading === true ? 'Please Wait..' : 'Submit'}</button>
                </form>
                <hr/>
            </div>
        </>
    );
}

import { Form, useLoaderData } from "react-router-dom";

export default function List(){

    const certificates = useLoaderData()

    return (
        <>
            {certificates.length === 0 ? (
            <p className="mt-5">Records not found.</p>
            ) : (
            <table className="table mt-5">
                <thead>
                    <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                {certificates.map((item,index)=>(
                    <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                    <Form
                        method="get"
                        action={`/certificate/${item.id}/delete`}
                        // onSubmit={(event) => {
                        //     if (!window.confirm("Please confirm you want to delete this record.")){
                        //     event.preventDefault();
                        //     }
                        // }}
                        >
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </Form>
                        
                    </td>
                    </tr>
                ))} 
                </tbody>
            </table>
            )}
        </>
    );
}


export async function loadCertificates({request}){

    const data = await fetch('http://localhost:8080/api/certificate',{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(data=>{
                return data
            });
            console.log('loading..')
    return data;
}

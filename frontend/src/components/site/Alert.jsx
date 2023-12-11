export default function Alert({ message, type}){
    const errorClass = "alert alert-danger"
    const successClass = "alert alert-success"
    return (
        <div className={type === 200? successClass : errorClass} role="alert">
            {message}
        </div>
    );
}
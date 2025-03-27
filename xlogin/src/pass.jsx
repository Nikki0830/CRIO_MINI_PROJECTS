import React , { useState } from "react";
function Password(){
    const[pass,setPass]=useState("");
    const[userName,setUsername]=useState("");
    const[error,setError]=useState("");
    const[isSubmitted,setIsSubmitted]=useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(userName==="user" && pass==="password"){
            setError("");
            setIsSubmitted(true);
        }else{
          setError("Invalid username or password");
          setIsSubmitted(false);
        }
    };

    return(
        <div>
            <h1>Login Page</h1>
            {isSubmitted ? (
                <div>
                    <p>Welcome, {userName}!</p>
                    </div>
            ):(
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="usename">Username:</label>
                <input
                type="text"
                id="usename"
                placeholder="usename"
                value={userName}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                type="text"
                id="password"
                placeholder="password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                required
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
            )}
        </div>
        
  );
}
export default Password;
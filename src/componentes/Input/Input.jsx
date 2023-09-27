import React from "react";

function Input(props){
    return(
        <>
        <p>{props.def}</p>
        <input type={props.type}/>
        </>
    )
}

export default Input
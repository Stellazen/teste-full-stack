import React from "react";

function Button(props){
    return(
        <>
        <button type="submit"> {props.children} </button>
        </>
    )
}

export default Button
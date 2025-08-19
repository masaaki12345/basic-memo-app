import React from 'react'


function Button(props){
  // const {btn_txt} = props;
  return(
    <button onClick={props.btn_click}>{props.btn_txt}</button>
  )
}

export default Button

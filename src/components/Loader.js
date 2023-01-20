import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Loader(props) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={props.isLoading}
      nodeRef={nodeRef}
      timeout={3000}
      classNames="load"
      appear={true}      
    >
      <div className="loading" ref={nodeRef}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </CSSTransition>
  );
}

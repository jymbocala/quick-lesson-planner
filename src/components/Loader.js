import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Loader(props) {
  const nodeRef = useRef(null);
  const [isLoadingExtended, setIsLoadingExtended] = useState(false);

  function handleExtendedLoading() {
    if (props.response === "") {
      setIsLoadingExtended(true)
    } else {
      setIsLoadingExtended(false)
    }
  }
  
  setTimeout(handleExtendedLoading, 10000);

  return (
    <CSSTransition
      in={props.isLoading}
      nodeRef={nodeRef}
      timeout={3000}
      classNames="load"
      appear={true}
    >
      <div className="loader">
        {isLoadingExtended && (
          <div className="loader__error-cont">
            <h4>
              ⚠️ Heads up! Generating your lesson plan might take a bit longer
              than usual 🕰️. There's a lot of traffic on the GPT-3 technology at
              the moment 🚦.
            </h4>
            <h4>Hang tight, your lesson plan is on its way. ⚡</h4>
          </div>
        )}
        <div className="loader__load-animation" ref={nodeRef}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </CSSTransition>
  );
}

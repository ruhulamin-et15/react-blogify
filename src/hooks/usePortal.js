/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const usePortal = () => {
  const [portalNode, setPortalNode] = useState();

  useEffect(() => {
    //new div create
    const portalElement = document.createElement("div");
    document.body.appendChild(portalElement);

    setPortalNode(portalElement);

    //cleanup fn
    return () => document.body.removeChild(portalElement);
  }, []);

  const renderPortal = (children) => {
    if (!portalNode) return null;
    return createPortal(children, portalNode);
  };

  return renderPortal;
};

export default usePortal;

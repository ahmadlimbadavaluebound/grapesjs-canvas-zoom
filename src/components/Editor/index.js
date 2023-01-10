import * as React from "react";
import { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gsWebpage from "grapesjs-preset-newsletter";
import ZoomComponent, { zoomPlugin } from "./Plugins/Zoom";

const Editor = () => {
  const [gjsEditor, setGjsEditor] = useState();
  const [showZoomComponent, setShowZoomComponent] = useState(false);

  useEffect(() => {
    const e = grapesjs.init({
      color: "white",
      height: "calc(100vh - 72px)",
      width: "100%",
      container: "#grapesjs-editor",
      plugins: [gsWebpage, zoomPlugin],
      pluginsOpts: {
        [zoomPlugin]: {
          setShowZoomComponent: setShowZoomComponent,
        },
      },
    });
    setGjsEditor(e);
  }, []);

  return (
    <>
      <div id="grapesjs-editor"></div>
      {showZoomComponent && <ZoomComponent editor={gjsEditor} />}
    </>
  );
};
export default Editor;

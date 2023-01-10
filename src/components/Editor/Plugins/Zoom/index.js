import { useEffect, useState } from "react";
import "./style.css";

export const setZoom = (zoom, el) => {
  const transformOrigin = [0, 0];

  var p = ["webkit", "moz", "ms", "o"],
    s = "scale(" + zoom + ")",
    oString = transformOrigin[0] * 100 + "% " + transformOrigin[1] * 100 + "%";

  for (var i = 0; i < p.length; i++) {
    el.style[p[i] + "Transform"] = s;
    el.style[p[i] + "TransformOrigin"] = oString;
  }

  el.style["transform"] = s;
  el.style["transformOrigin"] = oString;
};

export const showVal = (editor, a) => {
  setZoom(
    Number(a) / 10,
    editor.Canvas.getDocument().getElementById(
      editor.Components.getWrapper().ccid
    )
  );
};

export const zoomPlugin = (editor, options) => {
  editor.Panels.addButton("options", {
    id: "gjs-magnifier",
    className: "fa fa-search-plus",

    command: {
      run: function (editor) {
        options.setShowZoomComponent(true);
        editor.Canvas.getBody().style["overflow-x"] = "auto";
      },
      stop: function (editor) {
        showVal(editor, 10);
        options.setShowZoomComponent(false);
        editor.Canvas.getBody().style["overflow-x"] = "hidden";
      },
    },

    attributes: { title: "Toggle Magnifier" },

    active: false,
  });
};

const ZoomComponent = ({ editor }) => {
  const [zoomLevel, setZoomLevel] = useState(11);

  useEffect(() => {
    showVal(editor, zoomLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomLevel]);

  return (
    <div className="gjs-zoomContainer">
      <input
        value={`${zoomLevel * 10}%`}
        readOnly
        className="gjs-zc-input-container"
      />

      <div className="gjs-zc-btn-container">
        <button
          onClick={() => zoomLevel < 30 && setZoomLevel(zoomLevel + 1)}
          className="btn-zoom"
        >
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>

        <button
          onClick={() => zoomLevel > 1 && setZoomLevel(zoomLevel - 1)}
          className="btn-zoom"
        >
          <i class="fa fa-minus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default ZoomComponent;

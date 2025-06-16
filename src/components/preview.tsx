import "./styles/preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string | undefined;
}
const html = `
<html>
  <head>
    <style>
      html{
        background-color: white;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector("#root");
        root.innerHTML =
          '<div style="color:red"> <h4>Runtime Error</h4> ' + error + "</div>";
        console.error(err);
      };
      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener(
        "message",
        (event) => {
          try {
            eval(event.data);
          } catch (error) {
            handleError(error);
          }
        },
        false,
      );
    </script>
  </body>
</html>
  `;
const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcDoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;

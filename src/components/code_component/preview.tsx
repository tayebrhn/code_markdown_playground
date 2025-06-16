import "./styles/preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  output:
    | {
        code: string;
        err: string;
      }
    | undefined;
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
      const root = document.querySelector("#root");      
      const handleError = (error) => {
        root.innerHTML = '<div style="color:red">' + error + "</div>";
        console.error(error);
      };
      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener(
        "message",
        (event) => {
          try {
            if (event.data) {
              if (event.data.err) {
                throw event.data.err;
              }
              root.innerHTML = '';
              eval(event.data.code);
            }
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
const Preview: React.FC<PreviewProps> = ({ output }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcDoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(output, "*");
    }, 50);
  }, [output]);
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

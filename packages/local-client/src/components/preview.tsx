import './preview.css';
import { useEffect, useRef } from 'react';

interface previewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
  <style>html {background-color: white;}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err)=> {
      const root = document.querySelector('#root');
      root.innerHTML= '<div style="color: red;"><h4>Runtime ERROR</h4>' + err + '</div>';
      console.error(err);
    }
      window.addEventListener('error', (e) => {
        e.preventDefault();
        handleError(e.error);
      });
      window.addEventListener('message', (e)=>{
        try{
          eval(e.data);
        } catch (err) {
         handleError(err);
        }
      }, false)
    </script>
  </body>  
</html> 
`;

const Preview: React.FC<previewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 100);
  }, [code]);

  /* Other user alternative to setTimeout that I liked:
  The problem is that we reset srcDoc everytime the code state changes with the previous aproach
  useEffect(() => {
    if (!iframe.current) return;
 
    iframe.current.srcdoc = html;
  }, []);
 
  useEffect(() => {
    if (!iframe.current) return;
 
    iframe.current.contentWindow!.postMessage(code, "*");
  }, [code]);

  */

  //With this approach iframe (sanbox""" instead of using an api for bundling and to fetch JS file) we will not able to use local storage, cookies, etc...
  return (
    <div className='preview-wrapper'>
      <iframe
        title='code preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  );
};

export default Preview;

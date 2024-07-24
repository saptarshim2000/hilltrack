import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.css'; // Import CSS for styling

const SignaturePad = ({ onSave }) => {
    const sigCanvas = useRef({});

    const clear = () => sigCanvas.current.clear();

    const save = () => {
        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        onSave(dataURL); // Call the onSave function passed as a prop
    };

    return (
        <div className="signature-pad">
            <SignatureCanvas
                penColor="black"
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                ref={sigCanvas}
            />
            <div>
                <button onClick={clear}>Clear</button>
                <button onClick={save}>Save</button>
            </div>
        </div>
    );
};

export default SignaturePad;

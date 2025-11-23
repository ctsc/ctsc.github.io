import React from 'react';
import '../styles/minecraft.css';

const Options = ({ onBack }) => {
    return (
        <div className="app-container mc-bg">
            <div className="menu-container" style={{ width: '90%', height: '90%', maxWidth: '1200px' }}>
                <h1 style={{ color: 'white', marginBottom: '10px', textShadow: '2px 2px 0 #3f3f3f' }}>Options / Resume</h1>

                <div className="options-content" style={{
                    flex: 1,
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '2px solid #a0a0a0',
                    borderTopColor: '#505050',
                    borderLeftColor: '#505050',
                    borderBottomColor: '#fff',
                    borderRightColor: '#fff',
                    padding: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <object data="/resume.pdf" type="application/pdf" width="100%" height="100%">
                        <p style={{ color: 'white' }}>
                            It appears you don't have a PDF plugin for this browser.
                            No biggie... you can <a href="/resume.pdf" style={{ color: '#ffff55' }}>click here to download the PDF file.</a>
                        </p>
                    </object>
                </div>

                <div className="button-row">
                    <button className="mc-button" style={{ width: '200px' }} onClick={() => window.open('/resume.pdf', '_blank')}>Download PDF</button>
                    <button className="mc-button" style={{ width: '200px' }} onClick={onBack}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default Options;

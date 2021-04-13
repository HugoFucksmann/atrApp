import React from 'react';
import fondo from '../assets/fondos/error-404.jpg'

function Error404(){
    return (
      <div
        style={{
          backgroundImage: "url(" + fondo + ")",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh"
        }}
      >
      <h1 className="text-center" style={{marginTop: '40%'}}>ERROR 404</h1>
      </div>
    );
};


export default Error404;

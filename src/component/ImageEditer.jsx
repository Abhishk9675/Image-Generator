import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';

const ImageEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;

  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [caption, setCaption] = useState('');
  const [debouncedCaption, setDebouncedCaption] = useState('');

  useEffect(() => {
    if (!imageUrl) {
      navigate('/');
      return;
    }

    const initCanvas = async () => {
      if (canvasRef.current && !fabricRef.current) {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
          height: 500,
          width: 500,
          backgroundColor: 'white',
        });

        fabricRef.current = fabricCanvas;

        try {
          const img = await fabric.Image.fromURL(imageUrl, {
            crossOrigin: 'anonymous',
          });
          img.scaleToWidth(fabricCanvas.width);
          img.set({ left: 0, top: 0 });
          fabricCanvas.add(img);
          fabricCanvas.renderAll();

          if (debouncedCaption) {
            const textObj = new fabric.Text(debouncedCaption, {
              left: fabricCanvas.width / 2,
              top: fabricCanvas.height - 40,
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              originX: 'center',
              originY: 'bottom',
              fill: 'red',
            });
            fabricCanvas.add(textObj);
            fabricCanvas.renderAll();
          }
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    };

    initCanvas();

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, [imageUrl, debouncedCaption, navigate]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCaption(caption);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [caption]);

  const downloadImage = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL({ format: 'png', quality: 1 });
    link.download = 'modified-image.png';
    link.click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Add Caption Page</h1>
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <button style={{ width: '10%' }} onClick={() => navigate('/')}>
          ⬅ Back
        </button>
        <h2>Edit Image</h2>
        <div style={{ display: 'flex', gap: '6%' }}>
          <canvas ref={canvasRef} />
          <div>
            <input
              type="text"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Enter caption"
              style={{ marginTop: '10px', width: '100%', padding: '10px' }}
            />
            <button onClick={downloadImage} style={{ marginTop: '10px' }}>
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;

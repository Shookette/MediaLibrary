import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {CameraDevice, Html5Qrcode} from 'html5-qrcode';
import {BsUpcScan} from 'react-icons/bs';
import './QRCodeReader.scss';

type QRCodeReader = {
  label: string;
  onSuccessCallback: (result: string) => void;
  onErrorCallback: (result: string) => void;
};

const QRCodeReader: FC<QRCodeReader> = ({label, onSuccessCallback, onErrorCallback}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const memoizedResultHandler = useRef(onSuccessCallback);
  const memoizedErrorHandler = useRef(onErrorCallback);
  const [scanning, setScanning] = useState(false);
  const [cameraId, setCameraId] = useState('');
  const [cameraList, setCameraList] = useState<CameraDevice[]>([]);

  useEffect(() => {
    memoizedResultHandler.current = onSuccessCallback;
  }, [onSuccessCallback]);

  useEffect(() => {
    memoizedErrorHandler.current = onErrorCallback;
  }, [onErrorCallback]);

  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        setCameraList(devices);
        setCameraId(devices[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;
    const html5QrcodeScanner = new Html5Qrcode(previewRef.current.id);
    const cameraConfig: string | MediaTrackConstraints = cameraId
      ? cameraId
      : {facingMode: 'environment'};

    const didStart = html5QrcodeScanner
      .start(
        cameraConfig,
        {fps: 10},
        (result) => {
          setScanning(false);
          memoizedResultHandler.current(result);
        },
        (error) => {
          memoizedErrorHandler.current(error);
        }
      )
      .then(() => true);
    return () => {
      didStart
        .then(() => html5QrcodeScanner.stop())
        .catch(() => {
          console.error('Error stopping scanner');
        });
    };
  }, [scanning, previewRef, memoizedResultHandler, memoizedErrorHandler, cameraId]);

  const handleOnChangeCameraList = (event: ChangeEvent<HTMLSelectElement>) => {
    setCameraId(event.target.value);
  };

  if (scanning) {
    return <div ref={previewRef} id="qrcode-reader" data-testid="qrcode-reader" />;
  }

  return (
    <section className="qr-code-reader">
      <div>
        <h4 className="qr-code-reader_title">{label}</h4>
        <select onChange={handleOnChangeCameraList}>
          {cameraList.map((camera: CameraDevice) => (
            <option key={camera.id} value={camera.id}>
              {camera.label}
            </option>
          ))}
        </select>
      </div>
      <BsUpcScan
        className="qr-code-reader_icon"
        role="button"
        title="qrCodeReader"
        onClick={() => setScanning(true)}
      />
    </section>
  );
};

export default QRCodeReader;

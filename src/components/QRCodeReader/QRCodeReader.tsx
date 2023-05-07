import React, {FC, useEffect, useRef, useState} from 'react';
import {Html5Qrcode} from 'html5-qrcode';
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

  useEffect(() => {
    memoizedResultHandler.current = onSuccessCallback;
  }, [onSuccessCallback]);

  useEffect(() => {
    memoizedErrorHandler.current = onErrorCallback;
  }, [onErrorCallback]);

  useEffect(() => {
    if (!previewRef.current) return;
    const html5QrcodeScanner = new Html5Qrcode(previewRef.current.id);
    const didStart = html5QrcodeScanner
      .start(
        {facingMode: 'environment'},
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
  }, [scanning, previewRef, memoizedResultHandler, memoizedErrorHandler]);

  if (scanning) {
    return <div ref={previewRef} id="qrcode-reader" data-testid="qrcode-reader" />;
  }

  return (
    <div className="qr-code-reader">
      <h4 className="qr-code-reader_title">{label}</h4>
      <BsUpcScan
        className="qr-code-reader_icon"
        role="button"
        title="qrCodeReader"
        onClick={() => setScanning(true)}
      />
    </div>
  );
};

export default QRCodeReader;

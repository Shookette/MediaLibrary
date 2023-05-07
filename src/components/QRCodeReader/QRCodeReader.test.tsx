import {render, fireEvent} from '../../test-utils';
import React from 'react';
import * as messages from '../../translations/fr.json';
import QRCodeReader from './QRCodeReader';

describe('QRCodeReader test', () => {
  it('should show only label and icon by default', () => {
    const {getByRole, getByTitle} = render(
      <QRCodeReader
        label={messages['scan_book_bar_code']}
        onSuccessCallback={() => console.log('success')}
        onErrorCallback={() => console.error('error')}
      />
    );
    expect(getByRole('heading', {name: messages['scan_book_bar_code']})).toBeTruthy();
    expect(getByTitle(/qrCodeReader/i)).toBeTruthy();
  });

  it('should show div camera when clicking on the icon', () => {
    const {getByTestId, getByTitle} = render(
      <QRCodeReader
        label={messages['scan_book_bar_code']}
        onSuccessCallback={() => console.log('success')}
        onErrorCallback={() => console.error('error')}
      />
    );

    fireEvent.click(getByTitle(/qrCodeReader/i));
    expect(getByTestId('qrcode-reader')).toBeTruthy();
  });
});

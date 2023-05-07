import {Meta} from '@storybook/react';
import QRCodeReader from './QRCodeReader';

export default {
  title: 'Component/QRCodeReader',
  component: QRCodeReader,
} as Meta<typeof QRCodeReader>;

const onSuccessCallback = (isbnCode: string) => {
  console.log('onSuccessCallback::isbnCode::', isbnCode);
};

const onErrorCallback = (error: string) => {
  console.log('onErrorCallback::error::', error);
};

export const QRCode = {
  args: {
    label: 'Story QR Code',
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  },
};

import { Metadata } from 'next';

export const metadata: Metadata = {
  // title: 'meta test',
  title: {
    // default: 'meta',
    absolute: 'meta ',
  },
};

export default function Meta() {
  return <div>meta</div>;
}

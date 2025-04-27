import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { pages } from './routes';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [...pages],
  },
]);

export default router;

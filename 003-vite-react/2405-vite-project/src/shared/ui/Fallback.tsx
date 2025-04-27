import { Link, useRouteError } from 'react-router-dom';

export default function Fallback() {
  const error = useRouteError();

  return (
    <div>
      {String(error)}
      <Link to="/">go to home</Link>
    </div>
  );
}

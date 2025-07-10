// src/views/lounge/page/index.tsx
import { Outlet } from 'react-router-dom';

export default function LoungeLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

'use client';

import { Suspense } from 'react';
import LoginSuccessPageUI from './page-ui';

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginSuccessPageUI />
    </Suspense>
  );
}

// disable eslint for this file
/* eslint-disable */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator } from '@/components/calculator';

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  return (
    <main className="min-h-screen p-4 max-w-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Calculator initialAmount={amount ? parseInt(amount) : undefined} />
      </Suspense>
    </main>
  );
}

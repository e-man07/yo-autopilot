'use client';

import { useState, useCallback } from 'react';
import { AdvisorRequest, AdvisorResponse } from '@/types';

export function useAIAdvisor() {
  const [recommendation, setRecommendation] = useState<AdvisorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendation = useCallback(async (request: AdvisorRequest) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data: AdvisorResponse = await res.json();
      setRecommendation(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setRecommendation(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { recommendation, isLoading, error, getRecommendation, reset };
}

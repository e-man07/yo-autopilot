'use client';

import { useState, useEffect, useCallback } from 'react';
import { Goal } from '@/types';
import { getGoals, saveGoals, generateId } from '@/lib/goals';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGoals(getGoals());
    setMounted(true);
  }, []);

  const persist = useCallback((updated: Goal[]) => {
    setGoals(updated);
    saveGoals(updated);
  }, []);

  const addGoal = useCallback(
    (goal: Omit<Goal, 'id' | 'createdAt'>) => {
      const newGoal: Goal = {
        ...goal,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...getGoals(), newGoal];
      persist(updated);
      return newGoal;
    },
    [persist]
  );

  const updateGoal = useCallback(
    (id: string, updates: Partial<Goal>) => {
      const current = getGoals();
      const idx = current.findIndex((g) => g.id === id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...updates };
        persist(current);
      }
    },
    [persist]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      const updated = getGoals().filter((g) => g.id !== id);
      persist(updated);
    },
    [persist]
  );

  const getGoalById = useCallback(
    (id: string) => goals.find((g) => g.id === id),
    [goals]
  );

  return { goals, mounted, addGoal, updateGoal, deleteGoal, getGoalById };
}

import { Goal } from '@/types';

const STORAGE_KEY = 'yo-autopilot-goals';

export function getGoals(): Goal[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveGoals(goals: Goal[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export function addGoal(goal: Goal): void {
  const goals = getGoals();
  goals.push(goal);
  saveGoals(goals);
}

export function updateGoal(id: string, updates: Partial<Goal>): void {
  const goals = getGoals();
  const idx = goals.findIndex((g) => g.id === id);
  if (idx !== -1) {
    goals[idx] = { ...goals[idx], ...updates };
    saveGoals(goals);
  }
}

export function deleteGoal(id: string): void {
  const goals = getGoals().filter((g) => g.id !== id);
  saveGoals(goals);
}

export function getGoalById(id: string): Goal | undefined {
  return getGoals().find((g) => g.id === id);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

import { useState, useEffect } from 'react';
import { initialDeliverables } from '../data/progress';

const STORAGE_KEY = 'mpidism_deliverables_progress_v1';

export function useProgress() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load progress from localStorage', e);
    }

    // Default values from initialDeliverables
    const initialMap: Record<string, boolean> = {};
    initialDeliverables.forEach((item) => {
      initialMap[item.id] = item.defaultCompleted;
    });
    return initialMap;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMap));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }, [completedMap]);

  const toggleItem = (id: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetToDefault = () => {
    const initialMap: Record<string, boolean> = {};
    initialDeliverables.forEach((item) => {
      initialMap[item.id] = item.defaultCompleted;
    });
    setCompletedMap(initialMap);
  };

  const totalCount = initialDeliverables.length;
  const completedCount = initialDeliverables.filter((item) => completedMap[item.id]).length;
  const progressPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  return {
    deliverables: initialDeliverables,
    completedMap,
    toggleItem,
    resetToDefault,
    totalCount,
    completedCount,
    progressPercentage,
  };
}

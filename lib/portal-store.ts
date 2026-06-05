'use client';

import { useState, useEffect, useCallback } from 'react';
import { Deal } from './portal-types';
import { MOCK_DEALS } from './portal-mock-data';

const KEY = 'al_portal_deals_v1';

function read(): Deal[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Deal[];
    localStorage.setItem(KEY, JSON.stringify(MOCK_DEALS));
    return MOCK_DEALS;
  } catch {
    return MOCK_DEALS;
  }
}

function write(deals: Deal[]) {
  try { localStorage.setItem(KEY, JSON.stringify(deals)); } catch {}
}

export function usePortalDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDeals(read());
    setReady(true);
  }, []);

  const addDeal = useCallback((deal: Deal) => {
    const current = read();
    const updated = [deal, ...current];
    write(updated);
    setDeals(updated);
  }, []);

  const updateDeal = useCallback((id: string, patch: Partial<Deal>) => {
    const current = read();
    const updated = current.map(d =>
      d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d
    );
    write(updated);
    setDeals(updated);
  }, []);

  const deleteDeal = useCallback((id: string) => {
    const current = read();
    const updated = current.filter(d => d.id !== id);
    write(updated);
    setDeals(updated);
  }, []);

  return { deals, ready, addDeal, updateDeal, deleteDeal };
}

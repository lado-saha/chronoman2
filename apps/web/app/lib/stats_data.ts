'use server';
// The place where we load all the data
import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
// Use this to avoid caching and thus enable dynamic rendering
import { unstable_noStore as noStore } from 'next/cache';
import { Site, Worker } from './models';

const BASE_URL = process.env.API_BASE_URL;

// Site Stats

export async function fetchCompletionPercentageForSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/completion`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch site completion percentage');
  }
  return response.json();
}

export async function fetchTotalBudgetForSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/budget`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch site total budget');
  }
  return response.json();
}

export async function fetchTotalDurationForSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/duration`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch site total duration');
  }
  return response.json();
}

export async function fetchAllWorkersFromSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/workers`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch workers for site');
  }
  return response.json();
}

export async function fetchActivitiesForSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/activities`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch activities for site');
  }
  return response.json();
}

// Activity Stats
export async function fetchCompletionPercentageForActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/completion`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch activity completion percentage');
  }
  return response.json();
}

export async function fetchTotalBudgetForActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/budget`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch activity total budget');
  }
  return response.json();
}

export async function fetchTotalDurationForActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/duration`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch activity total duration');
  }
  return response.json();
}

export async function fetchTasksForActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/tasks`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks for activity');
  }
  return response.json();
}

export async function fetchWorkersForActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/workers`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch workers for activity');
  }
  return response.json();
}

// Task Stats

export async function fetchCompletionPercentageForTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}/completion`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task completion percentage');
  }
  return response.json();
}

export async function fetchDurationForTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}/duration`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task duration');
  }
  return response.json();
}

export async function fetchWorkersForTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}/workers`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch workers for task');
  }
  return response.json();
}

export async function fetchRealStartDateForTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}/real-start`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task real start date');
  }
  return response.json();
}

export async function fetchRealEndDateForTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}/real-end`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task real end date');
  }
  return response.json();
}

// Additional Utility Methods

export async function fetchAllWorkersFromActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/workers/all`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch workers from activity');
  }
  return response.json();
}


export async function fetchTotalWorkersForSite(id: number) {
  const response = await fetch(`${BASE_URL}/sites/${id}/workers/total`, {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch total workers for site');
  }
  return response.json();
}

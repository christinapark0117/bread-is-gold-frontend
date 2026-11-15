import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './container/App';

beforeEach(() => {
  // Pages fetch from the Rails API; keep tests offline.
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it('renders the landing page at /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { level: 1, name: /Bread Is Gold/i })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'Featured Chefs' })).toBeTruthy();
});

it('renders the sign-in screen at /signin', () => {
  render(
    <MemoryRouter initialEntries={['/signin']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy();
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchResource, RESOURCE } from '../../lib/swapi';
import { SWAPI_PROVIDERS } from '@/utils/consts';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('swapi service', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch from primary API first', async () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'Luke Skywalker', height: '172' }],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchResource(RESOURCE.PEOPLE);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(SWAPI_PROVIDERS.PRIMARY));
    expect(result).toEqual(mockData);
  });

  it('should fallback to secondary API when primary fails', async () => {
    const fallbackData = [
      { name: 'Luke Skywalker', height: '172' },
      { name: 'Darth Vader', height: '202' },
    ];

    // Primary fails
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    // Fallback succeeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fallbackData),
    });

    const result = await fetchResource(RESOURCE.PEOPLE);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(1, expect.stringContaining(SWAPI_PROVIDERS.PRIMARY));
    expect(mockFetch).toHaveBeenNthCalledWith(2, expect.stringContaining(SWAPI_PROVIDERS.FALLBACK));
    expect(result.results).toHaveLength(2);
  });
});

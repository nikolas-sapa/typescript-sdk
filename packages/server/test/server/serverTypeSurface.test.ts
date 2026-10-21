import { describe, expect, expectTypeOf, test } from 'vitest';

import type { CacheableResultMethod, LegacyPromptCallback, LegacyToolCallback } from '../../src/index';
import { isCacheableResultMethod } from '../../src/index';

describe('server type surface exports', () => {
    test('exports LegacyToolCallback and LegacyPromptCallback types from public barrel', () => {
        expectTypeOf<LegacyToolCallback<undefined>>().toBeFunction();
        expectTypeOf<LegacyPromptCallback<undefined>>().toBeFunction();
    });

    test('exports CacheableResultMethod and isCacheableResultMethod from public barrel', () => {
        expectTypeOf<CacheableResultMethod>().toBeString();
        expect(isCacheableResultMethod('tools/list')).toBe(true);
        expect(isCacheableResultMethod('tools/call')).toBe(false);
    });
});

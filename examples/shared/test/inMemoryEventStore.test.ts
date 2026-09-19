/**
 * Regression tests for the example InMemoryEventStore (#2560).
 *
 * The standalone GET stream's id is `_GET_stream`, which starts with an
 * underscore. Deriving the stream id from an event id by splitting on '_'
 * therefore yielded '' for standalone-stream events: resume replayed nothing
 * and the transport registered the successor stream under the wrong key.
 */

import { describe, expect, it } from 'vitest';

import type { JSONRPCMessage } from '@modelcontextprotocol/server';

import { InMemoryEventStore } from '../src/inMemoryEventStore';

const notification = (level: string): JSONRPCMessage => ({
    jsonrpc: '2.0',
    method: 'notifications/message',
    params: { level, data: `payload-${level}` }
});

describe('InMemoryEventStore', () => {
    it('replays and resolves the standalone stream id from a standalone-stream event id', async () => {
        const store = new InMemoryEventStore();
        const standaloneStreamId = '_GET_stream';

        const firstId = await store.storeEvent(standaloneStreamId, notification('info'));
        const secondId = await store.storeEvent(standaloneStreamId, notification('warning'));

        const sent: Array<[string, JSONRPCMessage]> = [];
        const send = async (eventId: string, message: JSONRPCMessage) => {
            sent.push([eventId, message]);
        };

        const resolvedStreamId = await store.replayEventsAfter(firstId, { send });

        expect(resolvedStreamId).toBe(standaloneStreamId);
        expect(sent).toEqual([[secondId, notification('warning')]]);
    });

    it('replays and resolves a regular stream id from a regular event id', async () => {
        const store = new InMemoryEventStore();
        const streamId = 'c1f2b3a4-0000-4000-8000-000000000000';

        const firstId = await store.storeEvent(streamId, notification('info'));
        const secondId = await store.storeEvent(streamId, notification('warning'));
        await store.storeEvent('_GET_stream', notification('debug'));

        const sent: Array<[string, JSONRPCMessage]> = [];
        const send = async (eventId: string, message: JSONRPCMessage) => {
            sent.push([eventId, message]);
        };

        const resolvedStreamId = await store.replayEventsAfter(firstId, { send });

        expect(resolvedStreamId).toBe(streamId);
        expect(sent).toEqual([[secondId, notification('warning')]]);
    });

    it('returns an empty stream id for an unknown or empty event id', async () => {
        const store = new InMemoryEventStore();

        const send = async () => {};

        expect(await store.replayEventsAfter('', { send })).toBe('');
        expect(await store.replayEventsAfter('does-not-exist', { send })).toBe('');
    });
});

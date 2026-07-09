import React, { useEffect, useMemo } from 'react';
import { Tldraw, createTLStore, defaultShapeUtils, type TLRecord } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { Socket } from 'socket.io-client';

interface WhiteboardProps {
  roomId: string;
  socket: Socket;
}

export default function Whiteboard({ roomId, socket }: WhiteboardProps) {
  const store = useMemo(() => createTLStore({ shapeUtils: defaultShapeUtils }), []);

  useEffect(() => {
    const unsubscribe = store.listen(
      (update) => {
        if (update.source === 'user') {
          socket.emit('whiteboard_update', { roomId, changes: update.changes });
        }
      },
      { source: 'user', scope: 'document' }
    );
    return () => unsubscribe();
  }, [store, roomId, socket]);

  useEffect(() => {
    socket.emit('request_whiteboard', { roomId });

    const handleInit = (data: { records: any[] }) => {
      if (data.records && data.records.length > 0) {
        try {
          store.mergeRemoteChanges(() => {
            store.put(data.records as TLRecord[]);
          });
        } catch (err) {
          console.error('Failed to init whiteboard records', err);
        }
      }
    };
    
    socket.on('whiteboard_init', handleInit);
    return () => {
      socket.off('whiteboard_init', handleInit);
    };
  }, [store, socket, roomId]);

  useEffect(() => {
    const handleUpdate = (data: { changes: any }) => {
      try {
        store.mergeRemoteChanges(() => {
          const { added, updated, removed } = data.changes;
          
          if (added) {
            store.put(Object.values(added as Record<string, TLRecord>));
          }
          if (updated) {
            store.put(Object.values(updated as Record<string, [TLRecord, TLRecord]>).map(pair => pair[1]));
          }
          if (removed) {
            store.remove(Object.values(removed as Record<string, TLRecord>).map(r => r.id));
          }
        });
      } catch (err) {
        console.error('Failed to merge remote changes', err);
      }
    };
    
    socket.on('whiteboard_update', handleUpdate);
    return () => {
      socket.off('whiteboard_update', handleUpdate);
    };
  }, [store, socket]);

  return (
    <div className="w-full h-full relative" style={{ zIndex: 10 }}>
      <Tldraw store={store} />
    </div>
  );
}

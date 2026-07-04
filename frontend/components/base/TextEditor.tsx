'use client';

import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function TextEditor(){
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        let cleanup = () => {};
        let cancelled = false;

        // Quill touches `document` as soon as it's evaluated, so it can only be
        // imported here — 'use client' still prerenders this file on the server.
        (async () => {
            const { default: Quill } = await import('quill');
            if (cancelled) return;

            const editor = document.createElement('div');
            container.append(editor);

            const quill = new Quill(editor, { theme: 'snow' });
            const socket = io('http://localhost:8000');
            console.log(socket, 'this is the sockket connections')

            cleanup = () => {
                socket.disconnect();
                // Quill injects the toolbar as a sibling of the editor, so clear
                // the whole wrapper rather than just the editor node.
                container.replaceChildren();
            };
        })();

        return () => {
            cancelled = true;
            cleanup();
        }
    }, []);

    return (
        <div ref={containerRef} />
    )
}

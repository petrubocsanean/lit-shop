import { directive, NodePart } from 'lit-html';

const resolved = new WeakSet();

export const lazyLoad = directive(
  (importPromise: Promise<any>, value: any) => async (part: NodePart) => {
    if (!resolved.has(part)) {
      await importPromise;
      resolved.add(part);
      const event = new CustomEvent('pending-state', {
        composed: true,
        bubbles: true,
        detail: { promise: importPromise },
      });
      part.startNode.parentNode!.dispatchEvent(event);
    }
    part.setValue(value);
  }
);

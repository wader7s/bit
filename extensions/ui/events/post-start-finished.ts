import { BitBaseEvent } from '@teambit/pubsub';

export type PostStartFinishedEvent = BitBaseEvent & {
  readonly type: 'post-start-finished';
  readonly version: '0.0.1';
  readonly timestamp: string;
  readonly body: {
    props: string;
  };
};

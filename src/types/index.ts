// src/types/index.ts
export interface FacebookMessageEvent {
  object: string;
  entry: {
    id: string;
    time: number;
    messaging: [
      {
        sender: { id: string };
        recipient: { id: string };
        message: { text: string };
      }
    ];
  }[];
}

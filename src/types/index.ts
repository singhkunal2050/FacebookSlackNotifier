export type MessageResponse = {
  object: string;
  entry: Array<{
    time: number;
    id: string;
    messaging: Array<{
      sender: { id: string };
      recipient: { id: string };
      timestamp: string;
      message: {
        is_echo: boolean;
        mid: string;
        text: string;
      };
    }>;
  }>;
};

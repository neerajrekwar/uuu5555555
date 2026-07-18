import { GoogleTagManager as GoogleTagManagerLib } from "@next/third-parties/google";

interface GoogleTagManagerProps {
  containerId: string;
}

export default function GoogleTagManager({ containerId }: GoogleTagManagerProps) {
  return <GoogleTagManagerLib gtmId={containerId} />;
}

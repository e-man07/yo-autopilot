import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'YO Autopilot',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'placeholder_build_id',
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fe-project-albaform.vercel.app',
        port: '',
        pathname: '/**',
      },
      // 추후 실제 이미지 넣으며 삭제 예정
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
    ],
  },

  compiler: {
    reactRemoveProperties: false,
  },

  // 인터셉션 라우트 관련 설정 제거 (기본값 사용)
  // rewrites와 redirects도 제거 (사용하지 않는 경우)
};

export default nextConfig;

'use client';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMaps {
  load: (callback: () => void) => void;
  Map: unknown;
  Marker: unknown;
  services: unknown;
}

interface KakaoSDK {
  maps: KakaoMaps;
}

declare global {
  interface Window {
    kakao: KakaoSDK;
  }
}

export default function KakaoMap() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps SDK');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (!isLoaded) return <div>지도를 불러오는 중입니다...</div>;

  return (
    <>
      <p>지도가 성공적으로 로드되었습니다!</p>
      <Map
        center={{ lat: 37.5665, lng: 126.978 }}
        level={3}
        style={{ width: '100%', height: '400px' }}
      >
        <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
          서울 시청
        </MapMarker>
      </Map>
    </>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

/**
 * KakaoMap 컴포넌트
 *
 * - 카카오맵을 렌더링하고 지정된 위치에 마커를 표시합니다.
 * - 추후 실제 API 데이터 및 지오코딩 유틸로 대체 예정입니다.
 *
 * @author sumin
 * @date 2025-07-13
 *
 * @component
 * @example
 * <KakaoMap location="서울특별시 중구 세종대로 110" />
 *
 * @param {Object} props
 * @param {string} props.location - 마커를 표시할 주소 문자열
 * @returns {JSX.Element} 카카오맵과 마커를 렌더링하는 컴포넌트
 */

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

interface KakaoMapProps {
  location: string;
}

export default function KakaoMap({ location }: KakaoMapProps) {
  // TODO: 추후 geocoding util 함수 제작 필요
  // - 카카오맵 Geocoder API를 사용하여 주소 → 좌표 변환
  // - 에러 처리 및 캐싱 로직 추가 고려
  const locationCoords: Record<string, { lat: number; lng: number }> = {
    [location]: { lat: 37.5665, lng: 126.978 },
  };

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // 이미 로드된 경우 중복 로드 방지
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

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
      const errorMessage = 'Failed to load Kakao Maps SDK';
      console.error(errorMessage);
      setLoadError(errorMessage);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 에러 상태 처리
  if (loadError) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-red-500">지도를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (!isLoaded) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-600">지도를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 좌표 데이터가 없는 경우 처리
  if (!locationCoords[location]) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-yellow-600">
          해당 위치의 좌표 정보를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const coords = locationCoords[location];

  return (
    <>
      <p>{location}</p>
      <Map
        center={{
          lat: coords.lat,
          lng: coords.lng,
        }}
        className="h-210 w-full rounded-lg lg:h-380"
        level={3}
      >
        <MapMarker
          position={{
            lat: coords.lat,
            lng: coords.lng,
          }}
          title={location}
        />
      </Map>
    </>
  );
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// 주소 → 좌표 캐시 맵
const coordCache = new Map<string, Coordinates>();

/**
 * 카카오 Geocoder API를 통해 주소 → 좌표를 반환하는 함수
 * - 내부적으로 캐싱을 적용하여 동일한 주소 요청 시 API 중복 호출 방지
 *
 * @param address 변환할 주소 문자열
 * @returns 좌표 객체 또는 null
 */
export const getCoordsByAddress = (
  address: string
): Promise<Coordinates | null> => {
  return new Promise((resolve, reject) => {
    // 1. 캐시에 값이 있으면 바로 반환
    if (coordCache.has(address)) {
      resolve(coordCache.get(address)!);
      return;
    }

    // 2. 카카오 맵 SDK가 로드되지 않은 경우
    if (!window.kakao || !window.kakao.maps) {
      reject(new Error('Kakao map is not loaded'));
      return;
    }

    // 3. Geocoder 호출
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (
        status === window.kakao.maps.services.Status.OK &&
        result.length > 0
      ) {
        const { y, x } = result[0]!;

        const coords = {
          lat: parseFloat(y),
          lng: parseFloat(x),
        };

        // 결과를 캐시에 저장
        coordCache.set(address, coords);

        resolve(coords);
      } else {
        console.warn(`Geocoding failed for "${address}":`, status);
        resolve(null);
      }
    });
  });
};

export interface Coordinates {
  lat: number;
  lng: number;
}

// 주소 → 좌표 캐시 맵
const coordCache = new Map<string, Coordinates>();

/**
 * 주소 또는 장소명을 좌표로 변환하는 함수
 * - 1차: 주소 기반 검색
 * - 2차: 키워드 기반 장소 검색
 * - 내부적으로 캐싱 적용
 *
 * @param address 주소 또는 장소명
 * @returns 좌표 또는 null
 */
export const getCoordsByAddress = (
  address: string
): Promise<Coordinates | null> => {
  return new Promise((resolve, reject) => {
    // 1. 캐시 확인
    if (coordCache.has(address)) {
      resolve(coordCache.get(address)!);
      return;
    }

    // 2. SDK 로드 확인
    if (!window.kakao || !window.kakao.maps) {
      reject(new Error('Kakao map is not loaded'));
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    // 3. 주소 기반 검색 시도
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

        coordCache.set(address, coords);
        resolve(coords);
      } else {
        // 4. 주소 검색 실패 → 키워드 기반 검색 시도
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(address, (placesResult, placesStatus) => {
          if (
            placesStatus === window.kakao.maps.services.Status.OK &&
            placesResult.length > 0
          ) {
            const { y, x } = placesResult[0]!;
            const coords = {
              lat: parseFloat(y),
              lng: parseFloat(x),
            };

            coordCache.set(address, coords);
            resolve(coords);
          } else {
            console.warn(`Geocoding failed for "${address}"`);
            resolve(null);
          }
        });
      }
    });
  });
};

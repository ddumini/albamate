// components/Map.tsx
import { useEffect, useRef } from 'react';

interface MapProps {
  address: string;
}

const Map = ({ address }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && mapRef.current) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: coords,
        });
      }
    });
  }, [address]);

  return (
    <div ref={mapRef} className="h-60 w-full rounded-md sm:h-72 md:h-80" />
  );
};

export default Map;

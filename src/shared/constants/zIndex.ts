/**
 * 전체 애플리케이션의 z-index 값들을 중앙에서 관리
 * 레이어 순서: 낮은 값일수록 아래층, 높은 값일수록 위층
 */
export const Z_INDEX = {
  /** 기본 콘텐츠 레이어 */
  BASE: 1,

  /** 플로팅 버튼 */
  FLOATING_BUTTON: 1000,

  /** 모달 */
  MODAL: 1040,

  /** 최상위 (긴급 알림 등) */
  MAXIMUM: 9999,
} as const;

/**
 * z-index 값에 대한 타입
 */
export type ZIndexValue = (typeof Z_INDEX)[keyof typeof Z_INDEX];

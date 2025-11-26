import { useEffect, useState, useRef } from 'react';

/**
 * useScrollAnimation Hook
 *
 * Intersection Observer를 사용하여 요소가 화면에 보일 때 애니메이션 트리거
 *
 * @param {Object} options - Intersection Observer 옵션
 * @param {number} options.threshold - 감지 임계값 (기본값: 0.1)
 * @param {string} options.rootMargin - 루트 마진 (기본값: '0px')
 * @param {boolean} options.triggerOnce - 한 번만 트리거할지 여부 (기본값: true)
 *
 * @returns {Object} { ref, isVisible }
 *   - ref: 관찰할 요소에 연결할 ref
 *   - isVisible: 요소가 화면에 보이는지 여부
 *
 * Example usage:
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
 * <Box ref={ref}>
 *   <Fade in={isVisible}>...</Fade>
 * </Box>
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // triggerOnce가 true면 관찰 중지
            if (triggerOnce && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!triggerOnce) {
            // triggerOnce가 false면 화면 밖으로 나갈 때 다시 숨김
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export default useScrollAnimation;

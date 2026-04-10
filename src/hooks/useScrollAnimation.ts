import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation
 *
 * Attaches an IntersectionObserver to a container ref.
 * When elements with the `.reveal` class inside the container
 * become visible, the `.visible` class is added — triggering
 * the CSS fade+slide-up transition defined in index.css.
 *
 * Usage:
 *   const sectionRef = useScrollAnimation();
 *   <section ref={sectionRef}>
 *     <div className="reveal reveal-delay-1">...</div>
 *   </section>
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, no need to keep observing
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const targets = container.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, [threshold]);

  return ref;
}

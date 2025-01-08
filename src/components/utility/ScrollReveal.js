import React, { useRef, useState, useEffect, useMemo } from "react";
import { useWindowSize, useWindowScroll, useIntersection } from "react-use";

export function ScrollReveal({
  children,
  className,
  once = true,
  trigger = "visible",
  offset = 0,
  as: Component = "div",
  ...props
}) {
  const container = useRef(null);

  const { y: windowScroll } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();

  const intersection = useIntersection(container, {
    threshold: 0,
  });

  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const isIntersecting = useMemo(() => {
    if (container.current && intersection) {
      const y = container.current.getBoundingClientRect().top;
      const height = container.current.getBoundingClientRect().height;

      if (trigger === "top") {
        return intersection.isIntersecting && y <= 0;
      } else if (trigger === "middle") {
        return y > windowHeight / 2 - height && y <= windowHeight / 2;
      }

      return intersection.isIntersecting && y <= windowHeight - offset;
    }
    return false;
  }, [windowScroll, intersection, windowHeight, offset, trigger]);

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (isInViewport(container.current)) {
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (once && isIntersecting) {
      setActive(true);
    } else if (!once) {
      setActive(isIntersecting);
    }
  }, [isIntersecting, once]);

  return (
    <Component ref={container} className={className} {...props}>
      {children(isActive)}
    </Component>
  );
}

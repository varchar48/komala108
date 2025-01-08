import React from "react";
import { ScrollReveal } from "@/components/utility/ScrollReveal";
import clsx from "clsx";

export default function ScrollRevealWrapper({
  children,
  className = "",
  delay = 0,
  index = 0,
  asChild = false,
  ...props
}) {
  return (
    <ScrollReveal {...props}>
      {(isActive) => {
        const transitionStyles = {
          transitionDelay: `${(index + 1) * delay}ms`,
          transitionDuration: "500ms",
        };

        const classes = clsx(
          className,
          "h-full transition-all ease-in-out",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        );

        if (asChild && React.isValidElement(children)) {
          return React.cloneElement(children, {
            style: { ...children.props.style, ...transitionStyles },
            className: clsx(children.props.className, classes),
          });
        }

        return (
          <div style={transitionStyles} className={classes}>
            {children}
          </div>
        );
      }}
    </ScrollReveal>
  );
}

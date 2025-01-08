import React from 'react';
import { QualiIcon } from './icons';

export const UL = ({ children }) => {
  return (
    <ul className="relative list-none pl-6">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === 'li') {
          return React.cloneElement(child, {}, 
            <>
              <QualiIcon size={18} className="absolute top-1 left-[-25px]" strokeWidth={1} />
              {child.props.children}
            </>
          );
        }
        return child;
      })}
    </ul>
  );
};

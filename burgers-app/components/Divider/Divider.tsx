import * as React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    scale?: number;
    size?: number;
}

const Divider = ({
    scale = 1,
    size,
    style,
    ...props
}: DividerProps): JSX.Element => {
    return (
        <div style={{
            ...containerStyles, 
            ...style, margin: size || scale * 8 
            }} {...props}>
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
    margin: '8px 0',
};

export default Divider;
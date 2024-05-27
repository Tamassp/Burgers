import * as React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    
}

const Divider = ({
    style,
    ...props
}: DividerProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...style}} {...props}>
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
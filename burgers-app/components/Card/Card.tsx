import React from 'react';


export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Card = ({
    children,
    style,
    ...props
}: CardProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...style}} {...props}>
            {children}
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    padding: 12,
    boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',

    
};

export default Card;
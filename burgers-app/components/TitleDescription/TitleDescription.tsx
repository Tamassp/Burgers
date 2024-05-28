'use client'
export interface TitleDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    childrenStyle?: React.CSSProperties;
    description?: string;
    descriptionStyle?: React.CSSProperties;
    textAlign?: 'center' | 'left' | 'right'
    title: string;
    titleStyle?: React.CSSProperties;
}

const TitleDescription = ({
    children,
    childrenStyle,
    description,
    descriptionStyle,
    style,
    title,
    titleStyle,
    ...props
}: TitleDescriptionProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...style}} {...props} >
            <h2 style={{...titleStyles, ...titleStyle}}>
                {title}
            </h2>
            {description && 
                <p style={{...descriptionStyles, ...descriptionStyle}}>
                    {description}
                </p>}
            {children && 
                <div style={{...childrenStyles, ...childrenStyle}}>
                    {children}
                </div>}
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // width: '100%',
    // margin: '0 auto',
    // height: '400px',
    // maxHeight: '400px',
    // backgroundColor: 'lightgray',
    // borderRadius: '12px',
};

const titleStyles: React.CSSProperties = {
}

const descriptionStyles: React.CSSProperties = {
    marginTop: 4,
};

const childrenStyles: React.CSSProperties = {

    marginTop: 8,
};

const textAlign: React.CSSProperties = {
    textAlign: 'center',
}



export default TitleDescription;
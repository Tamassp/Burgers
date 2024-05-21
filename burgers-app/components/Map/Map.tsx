
export interface MapProps {
    icon?: string;
    title?: string;
}

const Map = ({
    icon,
    title
}: MapProps): JSX.Element => {
    return (
        <div style={containerStyles}>
            
            
            
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    height: '400px',
    maxHeight: '400px',
    backgroundColor: 'lightgray',
    borderRadius: '12px',
};

export default Map;
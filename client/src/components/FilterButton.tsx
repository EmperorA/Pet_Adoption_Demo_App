interface filterProps {
    key: string;
    id: string;
    selected: boolean;
    on: boolean;
    handleClick: () => void;
    handleClickWhenSelected: () => void;
    image: string;
    imgWidth?: string; 
    imgHeight?: string;
}



export default function FilterButton(props: filterProps) {
    const styles = {
        backgroundColor: props.on ? "grey" : "#949494",
        fontSize: '15px',
        padding: '10px', 
        border: 'none', 
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const imgStyles = {
        width: props.imgWidth || '70px', // Default width if not provided
        height: props.imgHeight || '70px', // Default height if not provided
    };
    return (
        <button 
        onClick={props.selected ? props.handleClickWhenSelected : props.handleClick} 
        style={styles}>
            <img 
            src={props.image} 
            alt={`Select ${props.id}`} 
            style={imgStyles}
            />
            <p>{props.id}</p>
        </button>
    )
}
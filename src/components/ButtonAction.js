const ButtonAction = ({ text, action }) => {
    return (
        <button
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 ml-3"
            onClick={action}
        >
            {text}
        </button>
    );
}

export default ButtonAction;
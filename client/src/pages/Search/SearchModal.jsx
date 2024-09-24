import PropTypes from 'prop-types';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, commonName, addPlant, children }) => {
    if (!isOpen) return null;

    const handleAddPlant = () => {
        if (commonName) {
            addPlant(commonName);
        }  
    };

    return (
        <div className='overlay' onClick={onClose}>
            <div className='content' onClick={(e) => e.stopPropagation()}>
                <button className='close-button' onClick={onClose}>Close</button>
                {children}
                <button className='add-button' onClick={handleAddPlant}>Add</button>
            </div>
        </div>
    );
};

SearchModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    commonName: PropTypes.string.isRequired,
    addPlant: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default SearchModal;
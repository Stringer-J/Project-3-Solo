import PropTypes from 'prop-types';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='overlay' onClick={onClose}>
            <div className='content' onClick={(e) => e.stopPropagation()}>
                <button className='close-button' onClick={onClose}>Close</button>
                {children}
                <button className='add-button'>Add</button>
            </div>
        </div>
    );
};

SearchModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default SearchModal;
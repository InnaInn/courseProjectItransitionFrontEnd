import React from 'react';
import editImg from '../../images/editIcon.png';
import addImg from '../../images/addIcon.png';
import deleteImg from '../../images/deleteIcon.png';


function ToolBar() {
    return (
        <div>
            <div className="flex items-center gap-3">
                <button className="hover:opacity-70 transition-opacity">
                    <img src={addImg} alt="Add" className="w-5 h-5" />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                    <img src={editImg} alt="Edit" className="w-5 h-5" />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                    <img src={deleteImg} alt="Delete" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default ToolBar;
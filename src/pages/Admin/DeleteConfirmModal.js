import React from 'react';
import './DeleteConfirmModal.scss';

const DeleteConfirmModal = ({ 
    isOpen, 
    onConfirm, 
    onCancel, 
    title = "Xác nhận xóa", 
    message = "Bạn có chắc chắn muốn xóa mục này không?",
    itemName = ""
}) => {
    if (!isOpen) return null;

    return (
        <div className="delete-confirm-modal-overlay">
            <div className="delete-confirm-modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                
                <div className="modal-body">
                    <div className="warning-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <p className="message">{message}</p>
                    {itemName && (
                        <p className="item-name">
                            <strong>"{itemName}"</strong>
                        </p>
                    )}
                    <p className="warning-text">
                        Hành động này không thể hoàn tác!
                    </p>
                </div>
                
                <div className="modal-actions">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="btn btn-secondary"
                    >
                        Hủy
                    </button>
                    <button 
                        type="button" 
                        onClick={onConfirm} 
                        className="btn btn-danger"
                    >
                        <i className="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

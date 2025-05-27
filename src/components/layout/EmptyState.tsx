import React from 'react';

interface EmptyStateProps {
    title: string;
    message: string;
    actionText?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    actionText,
    onAction,
    icon
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-8 text-center">
            {icon || (
                <svg className="mx-auto h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            <h3 className="mt-2 text-lg font-medium text-amber-900">{title}</h3>
            <p className="mt-1 text-gray-500">{message}</p>
            {actionText && onAction && (
                <button
                    onClick={onAction}
                    className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
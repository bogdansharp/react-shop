import './Loading.css';
import React from 'react';

export default function Loading() {
    return (
        <div className="loading progress bg-indigo-100">
            <div className="indeterminate bg-indigo-600"></div>
        </div>
    );
}

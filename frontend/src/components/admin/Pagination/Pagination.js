import React from 'react';

function Pagination({ postPerPage, totalPost, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="mt-4 flex justify-center">
            <ul className="pagination" >
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" style={{ display: 'inline-block' }}>
                        <a onClick={() => paginate(number)} className="page-link px-3 py-2 rounded-lg border text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;

import React from 'react'
import { getPagesArray } from '../../utils/pages'

const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = getPagesArray(totalPages)

    return (
        <div style={{margin: '30px 0'}}>
            {pagesArray.map(p => 
            <span
                key={p}
                onClick={() => changePage(p)}
                className={page === p ? 'page page__current' : 'page'}
            >
                {p}
            </span>
            )}
        </div>
    )
}

export default Pagination
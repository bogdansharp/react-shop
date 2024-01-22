import './Pagination.css';
import React from 'react';

function PageLink({page, goToPage, curPage}) {
    return curPage === page ? (
        <span
            href="#!" 
            aria-current="page" 
            className="relative select-none z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {page}
        </span>
    ) : (
        <a 
            href="#!" 
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 focus:z-20 focus:outline-offset-0"
            onClick={(e) => { e.preventDefault(); goToPage(page); }}
        >
            {page}
        </a>
    );
}

export default function Pagination({page, totalResults, goToPage, perPage}) {
    if (perPage <= 0) return null;
    const maxPage = Math.ceil(totalResults / perPage);
    return (
        <div className="pagination flex items-center justify-between bg-white px-3 md:px-4 mt-7 sm:px-1">
        <div className="flex flex-1 justify-between sm:hidden max-w-md ml-auto mr-auto">
            {page >  1 ? (
                <a 
                    href="#!" 
                    className="page-prev-btn relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50"
                    onClick={(e) => { e.preventDefault(); goToPage(page - 1); }}
                >
                    Previous
                </a>
            ) : (
                <span href="#!" className="select-none page-prev-btn relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-200 ">Previous</span>
            )}
            {page < maxPage ? (
                <a 
                    href="#!" 
                    className="page-next-btn relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50"
                    onClick={(e) => { e.preventDefault(); goToPage(page + 1); }}
                >
                    Next
                </a>
            ) : (
                <span href="#!" className="select-none page-next-btn relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-200 ">Next</span>
            ) }
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    <span className='hidden md:inline'>Showing&nbsp;</span>
                    <span className="font-medium">{(page - 1) * perPage + 1}</span>
                    <span>&nbsp;to&nbsp;</span>
                    <span className="font-medium">{Math.min(page * perPage, totalResults)}</span>
                    <span>&nbsp;of&nbsp;</span>
                    <span className="font-medium">{totalResults}</span>
                    <span className='hidden md:inline'>&nbsp;results</span>
                </p>
            </div>
            <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {page >  1 ? (
                    <a 
                        href="#!" 
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 focus:z-20 focus:outline-offset-0"
                        onClick={(e) => { e.preventDefault(); goToPage(page - 1); }}
                    >
                        <span className="sr-only" disabled="disabled">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </a>
                ) : (
                    <span href="#!" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-200 ring-1 ring-inset ring-gray-300">
                        <span className="sr-only" disabled="disabled">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </span>
                )}
                { maxPage <= 7 ? (
                    Array.from({ length: maxPage }, (_, i) => (
                        <PageLink key={i + 1} curPage={page} goToPage={goToPage} page={i + 1} />
                    ))
                ) : (
                    <>
                        <PageLink key={1} curPage={page} goToPage={goToPage} page={1}/>
                        {page <= 2 || page >= maxPage - 1 ? (
                            <>
                                <PageLink key={2} curPage={page} goToPage={goToPage} page={2}/>
                                <PageLink key={3} curPage={page} goToPage={goToPage} page={3}/>
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                <PageLink key={maxPage-2} curPage={page} goToPage={goToPage} page={maxPage-2}/>
                                <PageLink key={maxPage-1} curPage={page} goToPage={goToPage} page={maxPage-1}/>
                            </>
                        ) : ( 
                            page === 3 ? (
                                <>
                                    <PageLink key={2} curPage={page} goToPage={goToPage} page={2}/>
                                    <PageLink key={3} curPage={page} goToPage={goToPage} page={3}/>
                                    <PageLink key={4} curPage={page} goToPage={goToPage} page={4}/>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                    <PageLink key={maxPage-1} curPage={page} goToPage={goToPage} page={maxPage-1}/>
                                </>
                            ) : (
                                page === maxPage - 2 ? (
                                    <>
                                        <PageLink key={2} curPage={page} goToPage={goToPage} page={2}/>
                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                        <PageLink key={maxPage-3} curPage={page} goToPage={goToPage} page={maxPage-3}/>
                                        <PageLink key={maxPage-2} curPage={page} goToPage={goToPage} page={maxPage-2}/>
                                        <PageLink key={maxPage-1} curPage={page} goToPage={goToPage} page={maxPage-1}/>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                        <PageLink key={page-1} curPage={page} goToPage={goToPage} page={page-1}/>
                                        <PageLink key={page} curPage={page} goToPage={goToPage} page={page}/>
                                        <PageLink key={page+1}curPage={page} goToPage={goToPage} page={page+1}/>
                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                    </>
                                )
                            )
                        )}
                        <PageLink key={maxPage} curPage={page} goToPage={goToPage} page={maxPage}/>
                    </>
                ) }
                {page < maxPage ? (
                    <a 
                        href="#!" 
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 focus:z-20 focus:outline-offset-0"
                        onClick={(e) => { e.preventDefault(); goToPage(page + 1); }}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </a>
                ) : (
                    <span href="#!" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-200 ring-1 ring-inset ring-gray-300">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </span>
                ) }
            </nav>
            </div>
        </div>
        </div>
    );
}
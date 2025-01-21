import React from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

// A simple global filter for searching
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="mb-3">
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="form-control"
        placeholder="Search..."
      />
    </div>
  );
}

// Reusable DataTable component
export default function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Set initial page index to 0
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      {/* Global Search Filter - Positioned at the top right */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          {/* Show entries dropdown */}
          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

      {/* Table */}
      <table {...getTableProps()} className="table table-bordered table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls - Previous/Next on the right and page info centered */}
        <div className="d-flex justify-content-between align-items-center mt-3">
        {/* Previous and Next buttons aligned to the right */}
        <div className="d-flex justify-content-end">
            <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            >
            Previous
            </button>
            <button
            className="btn btn-sm btn-primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            >
            Next
            </button>
        </div>

        {/* Page Info - Centered */}
        <div className="d-flex justify-content-center flex-grow-1">
            Page{' '}
            <strong>
            {pageIndex + 1} of {pageOptions.length}
            </strong>
        </div>
        </div>

    </div>
  );
}

// import React from 'react';
// import DataTable from 'react-data-table-component';

// export default (columns, rows) => {
//     return (
//         <DataTable
//             columns={columns}
//             data={rows}
//         />
//     );
// };

import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Nº Parcela',
        selector: row => row.numParcela,
    },
    {
        name: 'Dias',
        selector: row => row.diasParcela,
    },
    {
        name: 'Perc. Parcela',
        selector: row => row.percParcela
    },
];

// const data = [
//     {
//         id: 1,
//         title: 'Beetlejuice',
//         year: '1988',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
// ]

export default ( {columns, data} ) => {
    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
};
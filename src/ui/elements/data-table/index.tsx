import { FC } from 'react'
import Header from './header'
import Cell from './cell'
import DataRow from './data-row'

type Props = {
    //** Items to be displayed in the table. Example: [{name: "John", age: 20}] */
    items: any[]
    //** Columns to be displayed in the table. Example: [{name: "name", label: "Name", width: "w-12"}] */
    columns: IColumn[]
    /** Url of more info about item page. Example: "/meals/products"*/
    url?: string
}

export interface IColumn {
    /** Key of the property in the items array. Example: "name"*/
    key: string
    /** Label of the column. Example: "Name"*/
    label: string
    /** Surfix of the data in cell. Example: "euro"*/
    surfix?: string
    /** Width in tailwind string format. Example: "w-12"*/
    width?: string
}

/**
 * DataTable component to display tabular data
 *
 * @param {Object[]} items - Array of objects to display in table
 * @param {IColumn[]} columns - Columns configuration
 * @param {string} [url] - Optional url for more info on row item
 */
const DataTable: FC<Props> = ({ items, columns, url }) => {
    return (
        <div className={`flex flex-col`}>
            <Header>
                {columns.map((column, index: number) => (
                    <Cell key={index} width={column.width}>
                        {column.label}
                    </Cell>
                ))}
            </Header>

            {items?.map((item, index: number) => (
                <DataRow
                    key={index}
                    href={url ? `${url}/${item.slug}` : undefined}
                >
                    {columns.map((column, index: number) => (
                        <Cell key={index} width={column.width}>
                            {item[column.key]}
                            {column.surfix ? ` ${column.surfix}` : ''}
                        </Cell>
                    ))}
                </DataRow>
            ))}
        </div>
    )
}

export default DataTable

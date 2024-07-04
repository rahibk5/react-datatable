import React from "react";
interface Props {
    columns: {
        uid: string;
        name: string;
        sortable?: boolean;
        customRenderer?: (item: any) => React.ReactNode;
        isIndexColumn?: boolean;
    }[];
    data: any[];
    filterOptions?: {
        uid: string;
        name: string;
        options: {
            uid: string | number;
            name: string;
        }[];
    }[];
    searchable?: boolean;
}
export default function App({ columns, data, filterOptions, searchable }: Props): import("react/jsx-runtime").JSX.Element;
export {};

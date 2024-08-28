import React from "react";
import { Selection } from "@nextui-org/react";
import "../global.css";
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
        searchable?: boolean;
        selectMode: "single" | "multiple";
        selectedKeys?: any[];
        options: {
            uid: string | number;
            name: string;
        }[];
        onChange?: (filterUid: string, selection: Selection, filteredData: any[]) => void;
    }[];
    searchable?: boolean;
    customClass?: {
        base?: [];
        wrapper?: [];
        table?: [];
        thead?: [];
        tbody?: [];
        tr?: [];
        th?: [];
        td?: [];
    };
}
export default function App({ columns, data, filterOptions, searchable, customClass }: Props): import("react/jsx-runtime").JSX.Element;
export {};

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { capitalize } from "../utils/utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["index", "name", "role", "status", "actions"];

interface Props {
  columns: {
    uid: string;
    name: string;
    sortable?: boolean;
    customRenderer?: (item: any) => React.ReactNode;
    isIndexColumn?: boolean; // Add this property to identify the custom index column
  }[];
  data: any[]; // Replace 'any' with your specific data type if possible
  filterOptions?: {
    uid: string;
    name: string;
    searchable?: boolean;
    selectMode: "single" | "multiple";
    selectedKeys?: any[];
    options: { uid: string | number; name: string }[];
  }[];
  searchable?: boolean;
  customClass?: {
    base? : [],
    wrapper? : [],
    table? : [],
    thead? : [],
    tbody? : [],
    tr? : [],
    th? : [],
    td? : [],
  };

}

export default function App({ columns, data, filterOptions, searchable, customClass }: Props) {
  type Model = typeof data[0];

  const initialFilters = React.useMemo(() => {
    const filters: { [key: string]: Selection } = {};
    if (filterOptions) {
      filterOptions.forEach((filter) => {
        filters[filter.uid] = new Set(filter.selectedKeys || []);
      });
    }
    return filters;
  }, [filterOptions]);

  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [filters, setFilters] = React.useState<{ [key: string]: Selection }>(initialFilters);
  const [filterSearch, setFilterSearch] = React.useState<{ [key: string]: string }>({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({ column: "index", direction: "ascending" });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  if (typeof filterOptions === 'undefined') {
    filterOptions = [];
  }
  if (typeof searchable === 'undefined') {
    searchable = true;
  }

  const processFilterOptions = (filterOptions: any) => {
    return filterOptions.map((option: { searchable: any; }) => ({
      ...option,
      searchable: option.searchable ?? false  // Default to false if not provided
    }));
  };

  const processedFilterOptions = React.useMemo(() => processFilterOptions(filterOptions), [filterOptions]);
  
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return [...columns];

    return [...columns];
  }, [visibleColumns, columns]);

  const filteredOptions = (filter: typeof filterOptions[0]) => {
    if (!filterSearch[filter.uid]) {
      return filter.options;
    }
    return filter.options.filter(option =>
      option.name.toLowerCase().includes(filterSearch[filter.uid].toLowerCase())
    );
  };

  const updateFilter = (filterUid: string, selection: Selection) => {
    if (!selection || selection === "all" || selection.size === 0) {
      // When no selection is made, show all items by clearing the filter for this UID
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterUid]: new Set(),
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterUid]: selection,
      }));
    }
  };

  const filteredAndSortedItems = React.useMemo(() => {
    let filteredData = [...data];
  
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }
  
    if (filterOptions) {
      filterOptions.forEach((filterOption) => {
        const filterValue = filters[filterOption.uid];
        if (filterValue && filterValue !== "all" && (filterValue instanceof Set && filterValue.size > 0)) {
          filteredData = filteredData.filter((item) =>
            Array.from(filterValue).includes(item[filterOption.uid])
          );
        }
      });
    }
  
    return filteredData.sort((a: Model, b: Model) => {
      const first = a[sortDescriptor.column as keyof Model] as number;
      const second = b[sortDescriptor.column as keyof Model] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
  
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [data, filterValue, filters, sortDescriptor, filterOptions]);

  const pages = Math.ceil(filteredAndSortedItems.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredAndSortedItems.slice(start, end).map((item, index) => ({
      ...item,
      index: start + index + 1,
    }));
  }, [page, filteredAndSortedItems, rowsPerPage]);

  const renderCell = React.useCallback((item: any, columnKey: string) => {
    const column = columns.find((col) => col.uid === columnKey);
    if (!column) return null;

    if (column.customRenderer) {
      return column.customRenderer(item);
    }

    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
      case "index":
      case column.isIndexColumn ? column.uid : undefined:
        return item.index;
      default:
        return cellValue;
    }
  }, [columns]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);


  const renderDropdowns = React.useMemo(() => {
    return processedFilterOptions?.map((filter: any) => (
      filter.searchable ? (
        <Autocomplete 
        label={filter.name}
        className="max-w-xs" 
      >
        {filteredOptions(filter).map((option: any) => (
          <AutocompleteItem key={option.uid} value={option.uid}>
            {option.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      ) :
      
      (
        <Dropdown key={filter.uid}>
        <DropdownTrigger className="hidden sm:flex">
          <Button
            endContent={<ChevronDownIcon className="text-small" />}
            size="sm"
            variant="flat"
            className="min-w-min rounded px-3 py-2"
          >
            {filter.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          aria-label="Table Columns"
          closeOnSelect={false}
          selectedKeys={filters[filter.uid] || new Set()}
          selectionMode={filter?.selectMode || "single"}
          onSelectionChange={(selection) => updateFilter(filter.uid, selection)}
          className="bg-white dark:bg-[#122031] rounded shadow"
        >
          {filter.searchable && (
            <DropdownItem key="search" className="p-2">
              <Input
                isClearable
                placeholder={`Search ${filter.name}...`}
                size="sm"
                value={filterSearch[filter.uid] || ""}
                onClear={() => setFilterSearch({ ...filterSearch, [filter.uid]: "" })}
                onValueChange={(value) => setFilterSearch({ ...filterSearch, [filter.uid]: value })}
              />
            </DropdownItem>
          )}
          {filteredOptions(filter).map((option) => (
            <DropdownItem key={option.uid} className="capitalize">
              {capitalize(option.name)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      )
      
    ));
  }, [filterOptions, filters, filterSearch]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex justify-between items-center">
            <label className="flex items-center text-default-400 text-small">
              <select
                className="bg-transparent outline-none text-default-400 text-small border border-gray-200 p-1 rounded-lg mr-2"
                onChange={onRowsPerPageChange}
                value={rowsPerPage} // Ensure the dropdown reflects the current state
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
              entries per page
            </label>
          </div>
          <div className="flex gap-3">
            {renderDropdowns}
            {searchable && (<Input
              isClearable
              classNames={{
                base: "w-full",
                inputWrapper: "border-1",
              }}
              placeholder="Search..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />)}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    filters,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    filterOptions,
    rowsPerPage // Ensure the dropdown reflects the current state
  ]);

  const bottomContent = React.useMemo(() => {
    const startItem = (page - 1) * rowsPerPage + 1;
    const endItem = Math.min(page * rowsPerPage, filteredAndSortedItems.length);

    let entriesText = `Showing ${startItem} to ${endItem} of ${filteredAndSortedItems.length} entries`;

    if (filteredAndSortedItems.length === 0) {
      entriesText = "No entries found";
    }
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="text-default-400 text-small">
          {entriesText}
        </div>
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [paginatedItems.length, page, pages, hasSearchFilter, rowsPerPage, filteredAndSortedItems.length]);

  const classNames = React.useMemo(
    () => customClass || {
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:bg-default-100",
        "text-small",
        "cursor-pointer",
        "border-b",
        "border-divider",
      ],
    },
    [customClass]
  );

  

  return (
    <div className="w-full flex flex-col">
      <Table
        aria-label="Example table with client side sorting"
        bottomContent={bottomContent}
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Data Found"} items={paginatedItems}>
          {(item: Model) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey.toString())}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

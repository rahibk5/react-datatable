'use strict';

var React = require('react');
var react = require('@nextui-org/react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var VerticalDotsIcon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 24 : _b, width = _a.width, height = _a.height, props = __rest(_a, ["size", "width", "height"]);
    return (React.createElement("svg", __assign({ "aria-hidden": "true", fill: "none", focusable: "false", height: size || height, role: "presentation", viewBox: "0 0 24 24", width: size || width }, props),
        React.createElement("path", { d: "M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z", fill: "currentColor" })));
};

var ChevronDownIcon = function (_a) {
    var _b = _a.strokeWidth, strokeWidth = _b === void 0 ? 1.5 : _b, otherProps = __rest(_a, ["strokeWidth"]);
    return (React.createElement("svg", __assign({ "aria-hidden": "true", fill: "none", focusable: "false", height: "1em", role: "presentation", viewBox: "0 0 24 24", width: "1em" }, otherProps),
        React.createElement("path", { d: "m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 10, strokeWidth: strokeWidth })));
};

var SearchIcon = function (props) { return (React.createElement("svg", __assign({ "aria-hidden": "true", fill: "none", focusable: "false", height: "1em", role: "presentation", viewBox: "0 0 24 24", width: "1em" }, props),
    React.createElement("path", { d: "M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }),
    React.createElement("path", { d: "M22 22L20 20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }))); };

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
var INITIAL_VISIBLE_COLUMNS = ["index", "name", "role", "status", "actions"];
function App(_a) {
    var columns = _a.columns, data = _a.data, filterOptions = _a.filterOptions, searchable = _a.searchable;
    var _b = React.useState(""), filterValue = _b[0], setFilterValue = _b[1];
    var _c = React.useState(new Set([])), selectedKeys = _c[0]; _c[1];
    var _d = React.useState(new Set(INITIAL_VISIBLE_COLUMNS)), visibleColumns = _d[0]; _d[1];
    var _e = React.useState({}), filters = _e[0], setFilters = _e[1];
    var _f = React.useState(5), rowsPerPage = _f[0], setRowsPerPage = _f[1];
    var _g = React.useState({ column: "index", direction: "ascending" }), sortDescriptor = _g[0], setSortDescriptor = _g[1];
    var _h = React.useState(1), page = _h[0], setPage = _h[1];
    var hasSearchFilter = Boolean(filterValue);
    if (typeof filterOptions === 'undefined') {
        filterOptions = [];
    }
    if (typeof searchable === 'undefined') {
        searchable = true;
    }
    var headerColumns = React.useMemo(function () {
        if (visibleColumns === "all")
            return __spreadArray([], columns, true);
        return __spreadArray([], columns, true);
    }, [visibleColumns, columns]);
    var updateFilter = function (filterUid, selection) {
        setFilters(function (prevFilters) {
            var _a;
            return (__assign(__assign({}, prevFilters), (_a = {}, _a[filterUid] = selection, _a)));
        });
    };
    var filteredAndSortedItems = React.useMemo(function () {
        var filteredData = __spreadArray([], data, true);
        if (hasSearchFilter) {
            filteredData = filteredData.filter(function (item) {
                return Object.values(item).some(function (value) {
                    return typeof value === 'string' && value.toLowerCase().includes(filterValue.toLowerCase());
                });
            });
        }
        if (filterOptions) {
            filterOptions.forEach(function (filterOption) {
                var filterValue = filters[filterOption.uid];
                if (filterValue && filterValue !== "all" && Array.from(filterValue).length !== filterOption.options.length) {
                    filteredData = filteredData.filter(function (item) {
                        return Array.from(filterValue).includes(item[filterOption.uid]);
                    });
                }
            });
        }
        return filteredData.sort(function (a, b) {
            var first = a[sortDescriptor.column];
            var second = b[sortDescriptor.column];
            var cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [data, filterValue, filters, sortDescriptor, filterOptions]);
    var pages = Math.ceil(filteredAndSortedItems.length / rowsPerPage);
    var paginatedItems = React.useMemo(function () {
        var start = (page - 1) * rowsPerPage;
        var end = start + rowsPerPage;
        return filteredAndSortedItems.slice(start, end).map(function (item, index) { return (__assign(__assign({}, item), { index: start + index + 1 })); });
    }, [page, filteredAndSortedItems, rowsPerPage]);
    var renderCell = React.useCallback(function (item, columnKey) {
        var column = columns.find(function (col) { return col.uid === columnKey; });
        if (!column)
            return null;
        if (column.customRenderer) {
            return column.customRenderer(item);
        }
        var cellValue = item[columnKey];
        switch (columnKey) {
            case "index":
            case column.isIndexColumn ? column.uid : undefined:
                return item.index;
            case "name":
                return cellValue;
            case "role":
                return (React.createElement("div", { className: "flex flex-col" },
                    React.createElement("p", { className: "text-bold text-small capitalize" }, cellValue)));
            case "status":
                return (React.createElement(react.Chip, { className: "capitalize border-none gap-1 text-default-600", color: statusColorMap[item.status], size: "sm", variant: "dot" }, cellValue));
            case "actions":
                return (React.createElement("div", { className: "relative flex justify-end items-center gap-2" },
                    React.createElement(react.Dropdown, { className: "bg-background border-1 border-default-200" },
                        React.createElement(react.DropdownTrigger, null,
                            React.createElement(react.Button, { isIconOnly: true, radius: "full", size: "sm", variant: "light" },
                                React.createElement(VerticalDotsIcon, { className: "text-default-400" }))),
                        React.createElement(react.DropdownMenu, null,
                            React.createElement(react.DropdownItem, null, "View"),
                            React.createElement(react.DropdownItem, null, "Edit"),
                            React.createElement(react.DropdownItem, null, "Delete")))));
            default:
                return cellValue;
        }
    }, [columns]);
    var onRowsPerPageChange = React.useCallback(function (e) {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    var onSearchChange = React.useCallback(function (value) {
        if (value) {
            setFilterValue(value);
            setPage(1);
        }
        else {
            setFilterValue("");
        }
    }, []);
    var topContent = React.useMemo(function () {
        return (React.createElement("div", { className: "flex flex-col gap-4" },
            React.createElement("div", { className: "flex justify-between gap-3 items-end" },
                React.createElement("div", { className: "flex justify-between items-center" },
                    React.createElement("label", { className: "flex items-center text-default-400 text-small" },
                        React.createElement("select", { className: "bg-transparent outline-none text-default-400 text-small border border-gray-200 p-1 rounded-lg mr-2", onChange: onRowsPerPageChange },
                            React.createElement("option", { value: "5" }, "5"),
                            React.createElement("option", { value: "10" }, "10"),
                            React.createElement("option", { value: "15" }, "15")),
                        "entries per page")),
                React.createElement("div", { className: "flex gap-3" },
                    filterOptions && filterOptions.map(function (filter) { return (React.createElement(react.Dropdown, { key: filter.uid },
                        React.createElement(react.DropdownTrigger, { className: "hidden sm:flex" },
                            React.createElement(react.Button, { endContent: React.createElement(ChevronDownIcon, { className: "text-small" }), size: "sm", variant: "flat", className: "min-w-min" }, filter.name)),
                        React.createElement(react.DropdownMenu, { disallowEmptySelection: true, "aria-label": "Table Columns", closeOnSelect: false, selectedKeys: filters[filter.uid] || new Set(), selectionMode: "multiple", onSelectionChange: function (selection) { return updateFilter(filter.uid, selection); } }, filter.options.map(function (option) { return (React.createElement(react.DropdownItem, { key: option.uid, className: "capitalize" }, capitalize(option.name))); })))); }),
                    searchable && (React.createElement(react.Input, { isClearable: true, classNames: {
                            base: "w-full",
                            inputWrapper: "border-1",
                        }, placeholder: "Search...", size: "sm", startContent: React.createElement(SearchIcon, { className: "text-default-300" }), value: filterValue, variant: "bordered", onClear: function () { return setFilterValue(""); }, onValueChange: onSearchChange }))))));
    }, [
        filterValue,
        filters,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        filterOptions,
    ]);
    var bottomContent = React.useMemo(function () {
        var startItem = (page - 1) * rowsPerPage + 1;
        var endItem = Math.min(page * rowsPerPage, filteredAndSortedItems.length);
        var entriesText = "Showing ".concat(startItem, " to ").concat(endItem, " of ").concat(filteredAndSortedItems.length, " entries");
        if (filteredAndSortedItems.length === 0) {
            entriesText = "No entries found";
        }
        return (React.createElement("div", { className: "py-2 px-2 flex justify-between items-center" },
            React.createElement("div", { className: "text-default-400 text-small" }, entriesText),
            React.createElement(react.Pagination, { showControls: true, classNames: {
                    cursor: "bg-foreground text-background",
                }, color: "default", page: page, total: pages, variant: "light", onChange: setPage })));
    }, [selectedKeys, paginatedItems.length, page, pages, hasSearchFilter]);
    var classNames = React.useMemo(function () { return ({
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
        td: [
            "group-data-[first=true]:bg-default-100",
            "text-small",
            "cursor-pointer",
            "border-b",
            "border-divider",
        ],
    }); }, []);
    return (React.createElement("div", { className: "w-full flex flex-col" },
        React.createElement(react.Table, { "aria-label": "Example table with client side sorting", bottomContent: bottomContent, classNames: classNames, sortDescriptor: sortDescriptor, topContent: topContent, onSortChange: setSortDescriptor },
            React.createElement(react.TableHeader, { columns: headerColumns }, function (column) { return (React.createElement(react.TableColumn, { align: column.uid === "actions" ? "center" : "start", allowsSorting: column.sortable, key: column.uid }, column.name)); }),
            React.createElement(react.TableBody, { emptyContent: "No users found", items: paginatedItems }, function (item) { return (React.createElement(react.TableRow, { key: item.id }, function (columnKey) { return React.createElement(react.TableCell, null, renderCell(item, columnKey.toString())); })); }))));
}

exports.Table = App;
//# sourceMappingURL=index.js.map

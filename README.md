# Advanced React Datatable 
React Table Adv is a customizable and feature-rich table component for React applications, designed to handle complex data display and interaction.
### Note : use in your next js projects.

## Features

### Customizable Columns

Define columns with custom headers, data accessors, and optional custom rendering.

### Sorting

Enable sorting by column headers in ascending or descending order.

### Filtering

Implement filters to narrow down data based on specific criteria.

### Pagination

Divide large datasets into pages with navigation controls for easier data browsing.

### Search

Allow users to search through data rows to find specific information quickly.

### Custom Cell Rendering

Render cells with custom components or styles based on data content.

### Actions Column

Provide actions like view, edit, and delete for each row.

### Responsive Design

Ensure the table adapts to different screen sizes for optimal usability.

### Customization Options

Offer various customization options such as colors, styles, and behavior settings.

## Installation

You can install React Table Adv via npm :

```bash
npm install react-table-adv
```

add this code  to tailwind.config.js
```js 
//tailwind.config.ts
....... 
content: [
    ...,
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-table-adv/dist/**/*.{js,ts,jsx,tsx}"
  ],
  .....
```
## Usage

Import the `Table` component in your React application and configure it with your data:

```jsx
import React from 'react';
import { Table } from 'react-table-adv';

const App = () => {
  const columns = [
    { uid: 'name', name: 'Name', sortable: true },
    { uid: 'role', name: 'Role' },
  ];

  const data = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
  // Add more row
  ];

  return (
    <Table columns={columns} data={data} />
  );
};

export default App;
```

## Props

- `columns`: An array of column configurations.
- `data`: An array of data objects to be displayed.
- `filterOptions`: Enable filterOptions feature (optional).
  
    ```js
    //add filter options, you can implement multiple filter if you want.
    const filterOptions = [
    {
      uid: "role",
      name: "Role",
      selectMode: "single",
      searchable: true, // only in single mode
      options: [
        { name: "Admin", uid: "Admin" },
        { name: "User", uid: "User" },
      ],
      onChange: (filterUid: any, selection: any, filteredData: any) => {
        console.log(`Filter ${filterUid} changed to ${selection}`);
        console.log('Filtered data:', filteredData);
        // Perform additional actions with filteredData if needed
      },
    },
  ];
  ........
    
  // pass filterOptions in Table component:
    
  <Table columns={columns} data={data} filterOptions={filterOptions}/>
    ```
- `searchable` : boolean element to show/hide search field, default searchable is true so if you don't need search field just searchable={false}

## Examples

### Customizing Column Rendering

```jsx
const columns = [
    { uid: 'name', name: 'Name', sortable: true },
    { uid: 'role', name: 'Role' },
    {
      uid:'status', 
      name:'Status', 
      customRenderer:(item:any) => <strong>Active</strong>
    },
  ];
  // Add more customized columns
```


## Custom Style

### Customizing Table Style

```jsx
const classNames = {
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-red-500", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:bg-default-100",
        "text-small",
        "cursor-pointer",
        "border-b",
        "border-divider",
      ],
      // more props: base, table, thead, tbody, tr
    }

    // and pass in table
    
    <Table data={data} columns={columns} filterOptions={filterOptions} customClass={classNames}/>
    
```

## Acknowledgments

- Thank you to the React community for their valuable contributions.


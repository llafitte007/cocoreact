# cocoreact

[![NPM](https://img.shields.io/npm/v/cocoreact.svg)](https://www.npmjs.com/package/cocoreact)

CocoReact is a set of tools and [material-ui](https://material-ui.com) components.

Made with [create-react-library](https://www.npmjs.com/package/create-react-library).

## Install

```bash
npm install --save cocoreact
```

## core

Main features & descriptions :

- request : use hooks or/and functions to easily send a request using a specified http client.
- message : hooks and functions overcoating previous request sender to add a custom serializer for exchange data.
- form builder : manage your form fields options to create fast and reusable form with your own widget.
- table builder : same as form builder but to manage your table fields options.
- odata : tools for odata grid (order, filter & pagination) and builder to manage table fields options.
- url : a tools to manage all you route (with parameters) and rapid access.

## components

All components & descriptions :

- Auth : a complete auth system (context, provider, hook) to manage an auth token based with your personal auth service.
- ErrorBoundary : an error boundary to catch error and display your specified component.
- Form : display all form field using core/form options, and manage submit using core/message (*).
- Notification : a notification system (widget, context, provider, hook) to easy display different types of notification.
- Table : display all table field using core/table options (*).
- TableOData : display an odata table using core/odata options and manage column order & filter and pagination (*).
- Theme : a complete theme system (context, provider, hook) to use and hot swap your app theming.

*\*a set of form and table widget to quickly start dev of your app.*

### License MIT ©

# Nova 4 Theming Classes

This [Laravel Nova](https://nova.laravel.com/) package adds the theming classes functionality back to Nova 4 which was previously supplied by `Nova::enableThemingClasses()` in Nova 3

## Requirements

- `php: >=8.0`
- `laravel/nova: ^4.0`

## Features

This package restores the missing Theming Classes from Nova 3 back into Nova 4.

It should work for all Nova components and any components from third party packages.

Classes are applied on Component Mount and Component Update (for dependsOn compatability) via a global mixin.

The component names, field names, resource names, panel names, and Nova Flexible Content layout group names are added kebab cased with an optional prefix.

If you have other packages with custom properties that do not work in the default configuration (such as the Nova Flexible Content layout group names) submit a Pull Request or an Issue. (Pull requests will be actioned faster)

## Installation

Install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require formfeed-uk/nova-theming-classes
```

## Usage

### General

No additional configuration is required, the package will by default start working as soon as it is installed with all options enabled by default.

The theming classes are by default prefixed by the following:
- Components: component-
- Fields: field-
- Resources: resource-
- Nova Flexible Content Layout Groups: flex-group-
- Panels: panel-

This can be changed in the configuration options (see below)

### Configuration Options

By default all theming options are enabled with the above default prefixes.

To configure which theming classes are displayed and their prefix, add the following to your `config/nova.php`

Note that the final delimiter in prefixes must be applied manually if required (to allow for empty string prefixes, or alternative prefix delimiters)

```php
// config/nova.php

return [

...

    'theming' => [
         'component' => true|false, // Enable/Disable the component classes
         'field' => true|false, // Enable/Disable the field name classes
         'resource' => true|false, // Enable/Disable the resource name classes
         'flex_group' => true|false, // Enable/Disable the Nova Flexible Content Layout Groups classes
         'panel' => true|false, // Enable/Disable the panel name classes
         'prefix'=> [
            'component' => 'alternative-component-', // Component prefix
            'field' => 'alternative-field-', // Field prefix
            'resource' => 'alternative-resource-', // Resource prefix
            'flex_group' => 'alternative-flex-group-', // Nova Flexible Content Layout Group prefix
            'panel' => 'alternative-panel-', // Component prefix
         ]
    ]

...

]
```

## License

Nova Theming Classes is open-sourced software licensed under the [MIT license](LICENSE.md).

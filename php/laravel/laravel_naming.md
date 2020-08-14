# Naming Rules in Laravel


## Pascal

- RouteServiceProvider.php
- UserController.php
    - Singular
- (middleware)
- php artisan make:model Flight
    - singular
    - corresponding table name is plural "flights"

## Snake

- php artisan make:seeder create_countries_table
    - Plural
    - Resulted Seeder class name will be Pascal (CreateCountriesTable)

-
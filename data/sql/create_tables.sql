CREATE TABLE IF NOT EXISTS employees(
    employee_id int PRIMARY KEY NOT NULL,
    first_name varchar(64) NOT NULL,
    last_name varchar(64) NOT NULL,
    employee_role varchar(32) NOT NULL,
    birth_date date NOT NULL,
    wage double precision NOT NULL,
    hire_date date NOT NULL,
    is_active boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    payment_method varchar(32) NOT NULL,
    order_date timestamp NOT NULL,
    -- Price is the sum of all menu_items's total_menuitem_price values
    price double precision NOT NULL,
    employee_id int NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE IF NOT EXISTS menu_items(
    menuitem_id SERIAL PRIMARY KEY,
    order_id int NOT NULL,
    menuitem_price double precision NOT NULL,
    meal_type varchar(32) NOT NULL,
    premium_multiplier int NOT NULL,
    total_menuitem_price double precision NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS options(
    option varchar(64) NOT NULL,
    additional_charge double precision NOT NULL,
    category varchar(32) NOT NULL,
    is_seasonal boolean NOT NULL,
    PRIMARY KEY (option)
);

-- TODO: Change menuitem_options_join to menuitems_options_join - gman
-- Join table for menu item and options
CREATE TABLE IF NOT EXISTS menuitem_options_join(
    menuitem_option_id SERIAL PRIMARY KEY,
    menuitem_id int NOT NULL,
    option varchar(64) NOT NULL,
    FOREIGN KEY (menuitem_id) REFERENCES menu_items(menuitem_id),
    FOREIGN KEY (option) REFERENCES options(option)
);

CREATE TABLE IF NOT EXISTS ingredients(
    ingredient varchar(64) PRIMARY KEY NOT NULL,
    vendor varchar(64) NOT NULL,
    ingredient_measure varchar(32) NOT NULL,
    storage_method varchar(32) NOT NULL,
    quantity_in_stock double precision NOT NULL
);

-- Join table for options and ingredients
CREATE TABLE IF NOT EXISTS options_ingredients_join(
    option varchar(64) NOT NULL,
    ingredient varchar(64) NOT NULL,
    FOREIGN KEY (option) REFERENCES options(option),
    FOREIGN KEY (ingredient) REFERENCES ingredients(ingredient),
    PRIMARY KEY (option, ingredient)
);


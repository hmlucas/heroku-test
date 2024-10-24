-- POPULATE options --------------------------------------------------
\copy options FROM './csv/options.csv' DELIMITER ',' CSV HEADER;
-- POPULATE ingredients --------------------------------------------------
\copy ingredients FROM './csv/ingredients.csv' DELIMITER ',' CSV HEADER;
-- POPULATE options_ingredients_join --------------------------------------------------
\copy options_ingredients_join FROM './csv/options_ingredients_join.csv' DELIMITER ',' CSV HEADER;
-- POPULATE employees --------------------------------------------------
\copy employees FROM './csv/employees.csv' DELIMITER ',' CSV HEADER;
-- POPULATE orders --------------------------------------------------
\copy orders FROM './csv/orders_2024-10-14.csv' DELIMITER ',' CSV HEADER;
SELECT setval(pg_get_serial_sequence('orders', 'order_id'), (SELECT MAX(order_id) FROM orders));
-- POPULATE menu_items --------------------------------------------------
\copy menu_items FROM './csv/menu_items_2024-10-14.csv' DELIMITER ',' CSV HEADER;
SELECT setval(pg_get_serial_sequence('menu_items', 'menuitem_id'), (SELECT MAX(menuitem_id) FROM menu_items));
-- POPULATE menuitem_options_join --------------------------------------------------
\copy menuitem_options_join FROM './csv/menuitem_options_join_2024-10-14.csv' DELIMITER ',' CSV HEADER;
SELECT setval(pg_get_serial_sequence('menuitem_options_join', 'menuitem_option_id'), (SELECT MAX(menuitem_option_id) FROM menuitem_options_join));
-- POPULATE z_report_date --------------------------------------------------
-- Use the oldest order as the date
INSERT INTO z_report_date (z_date) SELECT order_date FROM orders ORDER BY order_date LIMIT 1;
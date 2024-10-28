import random
import csv
import os
from datetime import datetime, timedelta, date
import uuid

# Initialize counters for ids
meal_id_counter = 1
order_id_counter = 1
meal_options_id_counter = 1

meals = {}
meal_options = {}
orders = {}

# Load all options from the options.csv instead of accessing the database
def load_options():
    options = []
    with open('./data/csv/options.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # All test data will not be seasonal items
            options.append({
                'option': row['option'],
                'additional_charge': float(row['additional_charge']),
                'category': row['category'],
                'is_seasonal' : row['is_seasonal']
            })
    return options

# Load all employees generated from the employees script
def load_employees():
    employee_ids = []
    with open('./data/csv/employees.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            employee_ids.append(int(row['employee_id']))
    return employee_ids

# Functions to get and increment the next meal id
def get_next_meal_id():
    global meal_id_counter
    meal_id = meal_id_counter
    meal_id_counter += 1
    return meal_id

def get_next_order_id():
    global order_id_counter
    order_id = order_id_counter
    order_id_counter += 1
    return order_id

def get_next_meal_options_id():
    global meal_options_id_counter
    meal_options_id = meal_options_id_counter
    meal_options_id_counter += 1
    return meal_options_id


# Calculate the price of a meal
def price_meal(meal_type, items, options):
    options_dict = {opt['option']: float(opt['additional_charge']) for opt in options}
    
    base_prices = {
        "bowl": 8.30,
        "plate": 9.80,
        "bigger plate": 11.30,
        "alacarte side m": 4.40,
        "alacarte side l": 5.40,
        "alacarte entree s": 5.20,
        "alacarte entree m": 8.50,
        "alacarte entree l": 11.20,
        "appetizer" : 0,
        "drink": 0
    }

    # Get base price
    base_price = base_prices.get(meal_type, 0)

    # Find the premium_multiplier based on alacarte entree type
    if meal_type == "alacarte entree m":
        premium_multiplier = 2
    elif meal_type == "alacarte entree l":
        premium_multiplier = 3
    else:
        premium_multiplier = 1

    total_meal_price = base_price

    # For every option, multiply its additional_charge by premium_multiplier and add to total_meal_price
    for item in items:
        option_name = item["option"]
        addl_cost = options_dict.get(option_name, 0)
        total_meal_price += addl_cost * premium_multiplier

    return round(base_price, 2), premium_multiplier, round(total_meal_price, 2)

def generate_meal(order_id, num_meals, options): 
    # Gather a list of sides, entrees, and drinks
    sides = [opt for opt in options if opt['category'] == 'side']
    entrees = [opt for opt in options if opt['category'] == 'entree']
    drinks = [opt for opt in options if opt['category'] == 'drink']
    appetizers = [opt for opt in options if opt['category'] == 'app']
    meal_types = [
        "bowl",
        "plate",
        "bigger plate",
        "alacarte side m",
        "alacarte side l",
        "alacarte entree s",
        "alacarte entree m",
        "alacarte entree l",
        "appetizer",
        "drink"
    ]
    
    # For num_meals times, generate a meal for the order
    for i in range(num_meals):
        # Generate a unique id for the meal
        meal_id = get_next_meal_id()

        # Pick a random meal type and select a random selection of sides and entrees
        meal_type = random.choice(meal_types)
        
        if meal_type == "bowl":
            items = [random.choice(sides), random.choice(entrees)]
        elif meal_type == "plate":
            items = [random.choice(sides), random.choice(entrees), random.choice(entrees)]
        elif meal_type == "bigger plate":
            items = [random.choice(sides), random.choice(entrees), random.choice(entrees), random.choice(entrees)]
        elif meal_type in ["alacarte side m", "alacarte side l"]:
            items = [random.choice(sides)]
        elif meal_type in ["alacarte entree s", "alacarte entree m", "alacarte entree l"]:
            items = [random.choice(entrees)]
        elif meal_type == "drink":
            items = [random.choice(drinks)]
        elif meal_type == "appetizer":
            items = [random.choice(appetizers)]
        else:
            items = []

        base_price, premium_multiplier, total_meal_price = price_meal(meal_type, items, options)
        
        for item in items:
            # Generate a unique id for the menuitem options join
            meal_options_id = get_next_meal_options_id()
            meal_options[meal_options_id] = {
                "menuitem_option_id": meal_options_id,
                "menuitem_id": meal_id,
                "option": item["option"]
            }
        meals[meal_id] = {
            "menuitem_id": meal_id,
            "order_id": order_id,
            "menuitem_price": base_price,
            "meal_type": meal_type,
            "premium_multiplier": premium_multiplier,
            "total_menuitem_price": total_meal_price
        }

def generate_order(options, employee_ids): 
    # Establish all possible payment types to randomly choose from
    payment_methods = ["cash", "credit", "debit", "stu_card"]
    payment_method = random.choice(payment_methods)

    # Establish dateframe for the order to randomly choose from
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2023, 12, 31)
    days_between = (end_date - start_date).days
    random_days = random.randint(0, days_between)
    date = start_date + timedelta(days=random_days)

    # Generate a random time of day that the order occurred
    random_hours = random.randint(10, 20)  
    random_minutes = random.randint(0, 59)  
    random_seconds = random.randint(0, 59)
    date = date.replace(hour=random_hours, minute=random_minutes, second=random_seconds)

    # Generate a unique id for the order
    order_id = get_next_order_id()

    # Choose a random employee that made the order from existing employees
    employee_id = random.choice(employee_ids)

    # Generate 1-10 meals (random) for the order
    num_meals = random.randint(1, 10)
    generate_meal(order_id, num_meals, options)
    total_price = round(sum([meal["total_menuitem_price"] for meal in meals.values() if meal["order_id"] == order_id]), 2)
    orders[order_id] = {
        "order_id": order_id,
        "payment_method": payment_method,
        "order_date": date.isoformat(),
        "price": total_price,
        "employee_id": employee_id,
    }
    return total_price

def process_orders(options, employee_ids):
    total_price = 0.0
    today = date.today()

    # Generate orders until one million dollars have been reached
    while total_price < 1_000_000:
        total_price += generate_order(options, employee_ids)
    with open(f"./data/csv/menu-items-{today}.csv", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["menuitem_id", "order_id", "menuitem_price", "meal_type", "premium_multiplier", "total_menuitem_price"])
        writer.writeheader()
        writer.writerows(meals.values())
    with open(f"./data/csv/menuitem-options-join-{today}.csv", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["menuitem_option_id", "menuitem_id", "option"])
        writer.writeheader()
        writer.writerows(meal_options.values())
    with open(f"./data/csv/orders-{today}.csv", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["order_id", "payment_method", "order_date", "price", "employee_id"])
        writer.writeheader()
        writer.writerows(orders.values())

def main():
    options = load_options()
    employee_ids = load_employees()
    try:
        process_orders(options, employee_ids)
    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    main()
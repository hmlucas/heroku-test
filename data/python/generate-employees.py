import names
import random
import csv

def getRole():
  if random.randint(1,100) < 80:
    return "Server"
  else:
    return "Manager"

def getAge(role):
  percent = random.randint(1,100)
  if role == "Manager":
    if percent <= 1:
      return random.randint(16,17)
    elif percent <= 16:
      return random.randint(18,24)
    elif percent <= 43:
      return random.randint(25,34)
    elif percent <= 67:
      return random.randint(35,44)
    elif percent <= 85:
      return random.randint(45,54)
    else:
      return random.randint(55,64)
  else:
    if percent <= 15:
      return random.randint(16,17)
    elif percent <= 59:
      return random.randint(18,24)
    elif percent <= 77:
      return random.randint(25,34)
    elif percent <= 87:
      return random.randint(35,44)
    elif percent <= 94:
      return random.randint(45,54)
    else:
      return random.randint(55,64)
  
def getBirthday(employee_role):
  days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  m = months[random.randint(1,12)-1]
  d = days[int(m)-1]
  return f"{2024-getAge(employee_role)}-{m}-{d}"

def getHireDate(role):
  days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  m = months[random.randint(1,12)-1]
  d = days[int(m)-1]
  if role == "Manager":
    return f"{2024-(random.randint(1,10)-1)}-{m}-{d}"
  else:
    return f"{2024-(random.randint(1,3)-1)}-{m}-{d}"
  
def getWage(role, hire_date):
  if role == "Manager":
    return 25.0 + ((2024-int(hire_date[0:4]))*12 + (10-int(hire_date[5:7]))) * 0.04
  else:
    return 12.0 + ((2024-int(hire_date[0:4]))*12 + (10-int(hire_date[5:7]))) * 0.04

# EMPLOYEE DATA
employees = []

# Default Values
employee_id = 0
first_name = ""
last_name = ""
employee_role = ""
birth_date = ""
wage = 0.0
hire_date = ""
is_active = True

# Generate entries
for i in range(64):
  # Assign random values
  employee_id += 1
  first_name = names.get_first_name()
  last_name = names.get_last_name()
  employee_role = getRole()
  birth_date = getBirthday(employee_role)
  hire_date = getHireDate(employee_role) # FIX
  wage = round(getWage(employee_role, hire_date), 2)
  if random.randint(1,100) < 20:
    is_active = False
  else:
    is_active = True

  employees.append(','.join([str(employee_id), first_name, last_name, employee_role, birth_date, str(wage), hire_date, str(is_active)]))

# Write to csv
with open('employees.csv', 'w') as csvfile:
  for employee in employees:
    csvfile.write(f"{employee}\n")
  # print(','.join([str(employee_id), first_name, last_name, employee_role, birth_date, hire_date, str(wage), str(is_active)]))
  # print(f"{employee_id} - {first_name} {last_name} - {employee_role} - Born: {birth_date} - Hired: {hire_date} - Wage: {wage} - Active: {is_active}")

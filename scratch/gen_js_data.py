import csv
import collections

input_file = '/Users/pablo/gaceview/horarios_corregidos.csv'

days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
blocks = [
    ('b1', 0, 4),
    ('b2', 4, 8),
    ('b3', 8, 12),
    ('b4', 12, 16),
    ('b5', 16, 20),
    ('b6', 20, 24)
]

matrix = {b[0]: {d: 0 for d in days} for b in blocks}

with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        d = row['Dia_ARG']
        h_str = row['Hora_ARG']
        if not h_str: continue
        h = int(h_str.split(':')[0])
        
        # Find block
        for b_id, start, end in blocks:
            if start <= h < end:
                matrix[b_id][d] += 1
                break

# Generate JS string for matrix
js_matrix = "const matrix = {\n"
for b_id in [b[0] for b in blocks]:
    js_matrix += f"            '{b_id}': {{ "
    js_matrix += ", ".join([f"'{d}': {matrix[b_id][d]}" for d in days])
    js_matrix += " },\n"
js_matrix += "        };"

print(js_matrix)
print("\n--- RAW DATA FOR BARS ---")
# Also generate raw data list for the other files if they use it differently
raw_data = []
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        raw_data.append([row['Dia_ARG'], row['Hora_ARG'], 1])

print(f"const rawData = {raw_data};")

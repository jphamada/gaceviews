import re
import csv

input_file = '/Users/pablo/gaceview/horarios-mundial.txt'
output_file = '/Users/pablo/gaceview/horarios_corregidos.csv'

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_date_str = ""
matches = []

# Days of the week map for normalization if needed
days_map = {
    "Lunes": "Lunes", "Martes": "Martes", "Miércoles": "Miércoles", "Jueves": "Jueves",
    "Viernes": "Viernes", "Sábado": "Sábado", "Domingo": "Domingo"
}

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Check if line is a date header (e.g., "Jueves, 11 de junio 2026")
    date_match = re.match(r'^(\w+),\s+\d+\s+de\s+\w+\s+\d{4}$', line)
    if date_match:
        current_date_str = date_match.group(1)
        continue
    
    # Check if line is a match entry (e.g., "15:00 - México v Sudáfrica – Grupo A - Estadio Ciudad de México")
    # Also handle lines without explicit group info if they have time
    match_data = re.match(r'^(\d{1,2}:\d{2})\s+-\s+(.+)$', line)
    if match_data and current_date_str:
        time_et = match_data.group(1)
        details = match_data.group(2)
        
        # Parse ET time
        h, m = map(int, time_et.split(':'))
        
        # Calculate ARG time (ET + 1)
        h_arg = h + 1
        day_offset = 0
        if h_arg >= 24:
            h_arg -= 24
            day_offset = 1
        
        time_arg = f"{h_arg:02d}:{m:02d}"
        
        # Handle day offset for Argentina time
        # (If ET was 23:00 Saturday, ARG is 00:00 Sunday)
        actual_day_arg = current_date_str
        if day_offset > 0:
            days_list = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
            try:
                idx = days_list.index(current_date_str)
                actual_day_arg = days_list[(idx + 1) % 7]
            except ValueError:
                pass
        
        matches.append({
            'Dia_Original': current_date_str,
            'Hora_ET': time_et,
            'Dia_ARG': actual_day_arg,
            'Hora_ARG': time_arg,
            'Detalles': details
        })

# Write to CSV
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['Dia_Original', 'Hora_ET', 'Dia_ARG', 'Hora_ARG', 'Detalles'])
    writer.writeheader()
    writer.writerows(matches)

print(f"Processed {len(matches)} matches.")

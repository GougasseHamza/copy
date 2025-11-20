#!/usr/bin/env python3
"""
Analyze medicine CSV data structure and quality
"""
import csv
import json
from collections import defaultdict

csv_file = 'assets/medicament_filtered_price_usage.csv'

# Statistics
total_rows = 0
columns_per_row = defaultdict(int)
missing_values = defaultdict(int)
price_stats = []
unique_drugs = set()

print("Analyzing CSV structure...\n")

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    headers = reader.fieldnames
    print(f"Headers found: {headers}\n")

    for row in reader:
        total_rows += 1

        # Track columns with data
        non_empty = sum(1 for v in row.values() if v and v.strip())
        columns_per_row[non_empty] += 1

        # Track missing values
        for key, value in row.items():
            if not value or not value.strip():
                missing_values[key] += 1

        # Collect drug names
        if row.get('Drug Name'):
            unique_drugs.add(row['Drug Name'].strip())

        # Collect price data
        if row.get('Price (Dhs)'):
            try:
                price = float(row['Price (Dhs)'])
                price_stats.append(price)
            except ValueError:
                pass

print(f"Total rows: {total_rows}")
print(f"Unique drugs: {len(unique_drugs)}")
print(f"\nColumns per row distribution:")
for num_cols, count in sorted(columns_per_row.items()):
    print(f"  {num_cols} columns: {count} rows")

print(f"\nMissing values by column:")
for col, count in missing_values.items():
    percentage = (count / total_rows) * 100
    print(f"  {col}: {count} ({percentage:.1f}%)")

if price_stats:
    print(f"\nPrice statistics (Dhs):")
    print(f"  Min: {min(price_stats):.2f}")
    print(f"  Max: {max(price_stats):.2f}")
    print(f"  Average: {sum(price_stats) / len(price_stats):.2f}")

# Sample duplicate names
print(f"\nChecking for potential duplicates...")
name_counts = defaultdict(int)
with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row.get('Drug Name'):
            name_counts[row['Drug Name'].strip()] += 1

duplicates = {name: count for name, count in name_counts.items() if count > 1}
if duplicates:
    print(f"Found {len(duplicates)} drugs with duplicate entries:")
    for name, count in list(duplicates.items())[:5]:
        print(f"  '{name}': {count} times")
else:
    print("No duplicate drug names found")

print("\n✓ Analysis complete!")

#!/usr/bin/env python3
"""
Clean and normalize medicine data for backend import
"""
import csv
import json
import re

def normalize_drug_name(name):
    """Normalize drug name for consistency"""
    if not name:
        return ""

    # Remove extra whitespace
    name = ' '.join(name.split())

    # Capitalize properly (keeping abbreviations uppercase)
    # This preserves things like "Mg" but capitalizes regular words
    return name.strip()

def clean_price(price_str):
    """Clean and validate price"""
    if not price_str:
        return None

    try:
        price = float(price_str)
        return round(price, 2) if price > 0 else None
    except ValueError:
        return None

def clean_usage(usage):
    """Clean usage text"""
    if not usage:
        return ""

    # Remove excessive whitespace and newlines
    usage = ' '.join(usage.split())

    # Remove leading/trailing punctuation artifacts
    usage = usage.strip(' ;-')

    return usage

def extract_dosage(drug_name):
    """Extract dosage information from drug name"""
    # Common patterns: "10 mg", "250mg", "1mgml", etc.
    dosage_patterns = [
        r'(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg|ug|%)',
        r'(\d+(?:\.\d+)?)(mg|g|ml|mcg|ug)',
    ]

    for pattern in dosage_patterns:
        match = re.search(pattern, drug_name, re.IGNORECASE)
        if match:
            return f"{match.group(1)} {match.group(2).lower()}"

    return None

def extract_form(drug_name):
    """Extract pharmaceutical form from drug name"""
    forms = [
        'comprime', 'gelule', 'capsule', 'solution', 'sirop', 'suspension',
        'injectable', 'pommade', 'creme', 'gel', 'goutte', 'spray',
        'suppositoire', 'ovule', 'patch', 'sachet', 'poudre'
    ]

    name_lower = drug_name.lower()
    for form in forms:
        if form in name_lower:
            return form.capitalize()

    return None

# Read and clean data
csv_file = 'assets/medicament_filtered_price_usage.csv'
output_file = 'assets/medicines_cleaned.json'

medicines = []
seen_names = {}
duplicates_removed = 0
invalid_entries = 0

print("Cleaning medicine data...\n")

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)

    for i, row in enumerate(reader, 1):
        drug_name = normalize_drug_name(row.get('Drug Name', ''))

        # Skip invalid entries
        if not drug_name or len(drug_name) < 2:
            invalid_entries += 1
            continue

        # Handle duplicates - keep first occurrence
        if drug_name in seen_names:
            duplicates_removed += 1
            continue

        seen_names[drug_name] = True

        # Clean price
        price = clean_price(row.get('Price (Dhs)', ''))
        if price is None:
            invalid_entries += 1
            continue

        # Clean usage
        usage = clean_usage(row.get('Usage', ''))

        # Extract additional metadata
        dosage = extract_dosage(drug_name)
        form = extract_form(drug_name)

        # Create cleaned medicine object
        medicine = {
            'id': i,
            'name': drug_name,
            'price': price,
            'usage': usage,
            'dosage': dosage,
            'form': form,
            # For fuzzy search - create searchable name (lowercase, no special chars)
            'searchName': re.sub(r'[^a-z0-9\s]', '', drug_name.lower()),
        }

        medicines.append(medicine)

# Sort by name
medicines.sort(key=lambda x: x['name'])

# Re-assign IDs after sorting
for i, med in enumerate(medicines, 1):
    med['id'] = i

# Save cleaned data
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(medicines, f, ensure_ascii=False, indent=2)

print(f"✓ Cleaned {len(medicines)} medicines")
print(f"  - Removed {duplicates_removed} duplicates")
print(f"  - Skipped {invalid_entries} invalid entries")
print(f"\n✓ Saved to: {output_file}")

# Create summary statistics
print(f"\nData Summary:")
print(f"  Total medicines: {len(medicines)}")
print(f"  With dosage info: {sum(1 for m in medicines if m['dosage'])}")
print(f"  With form info: {sum(1 for m in medicines if m['form'])}")
print(f"  Price range: {min(m['price'] for m in medicines):.2f} - {max(m['price'] for m in medicines):.2f} Dhs")

# Sample output
print(f"\nSample cleaned entries:")
for med in medicines[:3]:
    print(f"\n  {med['name']}")
    print(f"    Price: {med['price']} Dhs")
    if med['dosage']:
        print(f"    Dosage: {med['dosage']}")
    if med['form']:
        print(f"    Form: {med['form']}")
    print(f"    Usage: {med['usage'][:100]}...")

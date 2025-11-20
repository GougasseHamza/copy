#!/usr/bin/env python3
"""
Import cleaned medicine data to PostgreSQL database
Usage: python3 import_to_database.py [--host localhost] [--port 5432] [--database pharmacy] [--user postgres]
"""
import json
import psycopg2
from psycopg2.extras import execute_values
import argparse
import getpass

def import_medicines(connection_params, json_file='assets/medicines_cleaned.json'):
    """Import medicines from JSON to PostgreSQL"""

    # Load JSON data
    print(f"Loading data from {json_file}...")
    with open(json_file, 'r', encoding='utf-8') as f:
        medicines = json.load(f)

    print(f"Loaded {len(medicines)} medicines")

    # Connect to database
    print(f"\nConnecting to database...")
    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()

        # Check if table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'medicines'
            );
        """)
        table_exists = cursor.fetchone()[0]

        if not table_exists:
            print("ERROR: Table 'medicines' does not exist!")
            print("Please run 'create_medicines_table.sql' first")
            return

        # Prepare data for bulk insert
        print("\nPreparing data for import...")
        values = [
            (
                med['name'],
                med['searchName'],
                med['price'],
                med['usage'],
                med.get('dosage'),
                med.get('form')
            )
            for med in medicines
        ]

        # Bulk insert
        print(f"Importing {len(values)} medicines...")
        execute_values(
            cursor,
            """
            INSERT INTO medicines (name, search_name, price, usage, dosage, form)
            VALUES %s
            ON CONFLICT DO NOTHING
            """,
            values
        )

        # Commit transaction
        conn.commit()

        # Get statistics
        cursor.execute("SELECT COUNT(*) FROM medicines")
        total = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM medicines WHERE dosage IS NOT NULL")
        with_dosage = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM medicines WHERE form IS NOT NULL")
        with_form = cursor.fetchone()[0]

        cursor.execute("SELECT MIN(price), MAX(price), AVG(price) FROM medicines")
        min_price, max_price, avg_price = cursor.fetchone()

        # Close connection
        cursor.close()
        conn.close()

        # Print results
        print(f"\n✓ Successfully imported medicines!")
        print(f"\nDatabase Statistics:")
        print(f"  Total medicines: {total}")
        print(f"  With dosage: {with_dosage}")
        print(f"  With form: {with_form}")
        print(f"  Price range: {min_price:.2f} - {max_price:.2f} Dhs")
        print(f"  Average price: {avg_price:.2f} Dhs")

        # Test fuzzy search
        print(f"\n✓ Testing fuzzy search...")
        test_search(connection_params, 'atorva')

    except psycopg2.Error as e:
        print(f"Database error: {e}")
        if 'conn' in locals():
            conn.rollback()
    except Exception as e:
        print(f"Error: {e}")

def test_search(connection_params, query):
    """Test fuzzy search functionality"""
    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                name,
                price,
                similarity(search_name, %s) as score
            FROM medicines
            WHERE search_name %% %s
            ORDER BY score DESC
            LIMIT 5
        """, (query, query))

        results = cursor.fetchall()

        if results:
            print(f"\nFuzzy search results for '{query}':")
            for name, price, score in results:
                print(f"  - {name} ({price} Dhs) [score: {score:.2f}]")
        else:
            print(f"No results found for '{query}'")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"Search test failed: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Import medicines to PostgreSQL')
    parser.add_argument('--host', default='localhost', help='Database host')
    parser.add_argument('--port', default=5432, type=int, help='Database port')
    parser.add_argument('--database', default='pharmacy', help='Database name')
    parser.add_argument('--user', default='postgres', help='Database user')
    parser.add_argument('--json', default='assets/medicines_cleaned.json', help='JSON file to import')

    args = parser.parse_args()

    # Get password securely
    password = getpass.getpass(f"Password for {args.user}@{args.host}: ")

    connection_params = {
        'host': args.host,
        'port': args.port,
        'database': args.database,
        'user': args.user,
        'password': password
    }

    import_medicines(connection_params, args.json)

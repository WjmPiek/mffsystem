def generate_franchise_code(name: str, number: int) -> str:
    prefix = ''.join([c for c in name if c.isalpha()])[:3].upper()
    if len(prefix) < 3:
        prefix = (prefix + 'FRA')[:3]
    return f'{prefix}{number:03d}'

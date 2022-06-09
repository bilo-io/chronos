export const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value);
}
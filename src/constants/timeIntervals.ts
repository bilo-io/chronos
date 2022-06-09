export type IInterval = {
    label: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';
    value: '1' | '7' | '30' | '90' | '180' | '365' | 'max';
}

export const intervals: IInterval[] = [{
    label: '1D',
    value: '1',
}, {
    label: '1W',
    value: '7',
}, {
    label: '1M',
    value: '30',
}, {
    label: '3M',
    value: '90',
}, {
    label: '6M',
    value: '180',
}, {
    label: '1Y',
    value: '365',
}, {
    label: 'All',
    value: 'max',
}]